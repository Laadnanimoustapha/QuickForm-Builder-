import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Initial state
const initialState = {
  formFields: [],
  selectedField: null,
  formSettings: {
    title: 'Untitled Form',
    description: '',
    submitButtonText: 'Submit',
    theme: {
      primaryColor: '#3b82f6',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      borderRadius: '6px',
      spacing: 'medium'
    }
  },
  draggedItem: null,
  isPreviewMode: false
};

// Action types
const ActionTypes = {
  ADD_FIELD: 'ADD_FIELD',
  REMOVE_FIELD: 'REMOVE_FIELD',
  UPDATE_FIELD: 'UPDATE_FIELD',
  REORDER_FIELDS: 'REORDER_FIELDS',
  SELECT_FIELD: 'SELECT_FIELD',
  DUPLICATE_FIELD: 'DUPLICATE_FIELD',
  UPDATE_FORM_SETTINGS: 'UPDATE_FORM_SETTINGS',
  SET_DRAGGED_ITEM: 'SET_DRAGGED_ITEM',
  SET_PREVIEW_MODE: 'SET_PREVIEW_MODE',
  CLEAR_FORM: 'CLEAR_FORM',
  LOAD_FORM: 'LOAD_FORM'
};

// Utility function to generate unique IDs
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Reducer function
const formReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FIELD: {
      const newField = {
        id: generateId(),
        type: action.payload.type,
        label: action.payload.label || `${action.payload.type} Field`,
        placeholder: action.payload.placeholder || '',
        required: false,
        validation: {},
        options: action.payload.options || [],
        ...action.payload.props
      };
      
      return {
        ...state,
        formFields: [...state.formFields, newField],
        selectedField: newField.id
      };
    }

    case ActionTypes.REMOVE_FIELD: {
      const filteredFields = state.formFields.filter(field => field.id !== action.payload.id);
      return {
        ...state,
        formFields: filteredFields,
        selectedField: state.selectedField === action.payload.id ? null : state.selectedField
      };
    }

    case ActionTypes.UPDATE_FIELD: {
      const updatedFields = state.formFields.map(field =>
        field.id === action.payload.id
          ? { ...field, ...action.payload.updates }
          : field
      );
      
      return {
        ...state,
        formFields: updatedFields
      };
    }

    case ActionTypes.REORDER_FIELDS: {
      const { sourceIndex, destinationIndex } = action.payload;
      const newFields = Array.from(state.formFields);
      const [reorderedField] = newFields.splice(sourceIndex, 1);
      newFields.splice(destinationIndex, 0, reorderedField);
      
      return {
        ...state,
        formFields: newFields
      };
    }

    case ActionTypes.SELECT_FIELD: {
      return {
        ...state,
        selectedField: action.payload.id
      };
    }

    case ActionTypes.DUPLICATE_FIELD: {
      const fieldToDuplicate = state.formFields.find(field => field.id === action.payload.id);
      if (!fieldToDuplicate) return state;
      
      const duplicatedField = {
        ...fieldToDuplicate,
        id: generateId(),
        label: `${fieldToDuplicate.label} (Copy)`
      };
      
      const fieldIndex = state.formFields.findIndex(field => field.id === action.payload.id);
      const newFields = [...state.formFields];
      newFields.splice(fieldIndex + 1, 0, duplicatedField);
      
      return {
        ...state,
        formFields: newFields,
        selectedField: duplicatedField.id
      };
    }

    case ActionTypes.UPDATE_FORM_SETTINGS: {
      return {
        ...state,
        formSettings: {
          ...state.formSettings,
          ...action.payload,
          theme: action.payload.theme ? {
            ...state.formSettings.theme,
            ...action.payload.theme
          } : state.formSettings.theme
        }
      };
    }

    case ActionTypes.SET_DRAGGED_ITEM: {
      return {
        ...state,
        draggedItem: action.payload
      };
    }

    case ActionTypes.SET_PREVIEW_MODE: {
      return {
        ...state,
        isPreviewMode: action.payload,
        selectedField: action.payload ? null : state.selectedField
      };
    }

    case ActionTypes.CLEAR_FORM: {
      return {
        ...initialState,
        formSettings: {
          ...initialState.formSettings,
          title: 'Untitled Form'
        }
      };
    }

    case ActionTypes.LOAD_FORM: {
      return {
        ...state,
        ...action.payload,
        selectedField: null
      };
    }

    default:
      return state;
  }
};

// Create context
const FormContext = createContext();

// Provider component
export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Action creators
  const addField = useCallback((fieldType, props = {}) => {
    dispatch({
      type: ActionTypes.ADD_FIELD,
      payload: { type: fieldType, ...props }
    });
  }, []);

  const removeField = useCallback((fieldId) => {
    dispatch({
      type: ActionTypes.REMOVE_FIELD,
      payload: { id: fieldId }
    });
  }, []);

  const updateField = useCallback((fieldId, updates) => {
    dispatch({
      type: ActionTypes.UPDATE_FIELD,
      payload: { id: fieldId, updates }
    });
  }, []);

  const reorderFields = useCallback((sourceIndex, destinationIndex) => {
    dispatch({
      type: ActionTypes.REORDER_FIELDS,
      payload: { sourceIndex, destinationIndex }
    });
  }, []);

  const selectField = useCallback((fieldId) => {
    dispatch({
      type: ActionTypes.SELECT_FIELD,
      payload: { id: fieldId }
    });
  }, []);

  const duplicateField = useCallback((fieldId) => {
    dispatch({
      type: ActionTypes.DUPLICATE_FIELD,
      payload: { id: fieldId }
    });
  }, []);

  const updateFormSettings = useCallback((settings) => {
    dispatch({
      type: ActionTypes.UPDATE_FORM_SETTINGS,
      payload: settings
    });
  }, []);

  const setDraggedItem = useCallback((item) => {
    dispatch({
      type: ActionTypes.SET_DRAGGED_ITEM,
      payload: item
    });
  }, []);

  const setPreviewMode = useCallback((isPreview) => {
    dispatch({
      type: ActionTypes.SET_PREVIEW_MODE,
      payload: isPreview
    });
  }, []);

  const clearForm = useCallback(() => {
    dispatch({
      type: ActionTypes.CLEAR_FORM
    });
  }, []);

  const loadForm = useCallback((formData) => {
    dispatch({
      type: ActionTypes.LOAD_FORM,
      payload: formData
    });
  }, []);

  // Helper functions
  const getSelectedField = useCallback(() => {
    return state.formFields.find(field => field.id === state.selectedField);
  }, [state.formFields, state.selectedField]);

  const getFieldById = useCallback((fieldId) => {
    return state.formFields.find(field => field.id === fieldId);
  }, [state.formFields]);

  const exportFormAsJSON = useCallback(() => {
    return {
      formSettings: state.formSettings,
      formFields: state.formFields,
      version: '1.0.0',
      exportedAt: new Date().toISOString()
    };
  }, [state.formSettings, state.formFields]);

  const value = {
    // State
    ...state,
    
    // Actions
    addField,
    removeField,
    updateField,
    reorderFields,
    selectField,
    duplicateField,
    updateFormSettings,
    setDraggedItem,
    setPreviewMode,
    clearForm,
    loadForm,
    
    // Helpers
    getSelectedField,
    getFieldById,
    exportFormAsJSON
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the form context
export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

export default FormContext;