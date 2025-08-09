import React, { useState, useRef } from 'react';
import { useForm } from '../../context/FormContext';
import FormField from '../FormField/FormField';
import './FormCanvas.css';

const FormCanvas = () => {
  const {
    formFields,
    formSettings,
    addField,
    reorderFields,
    selectField,
    selectedField
  } = useForm();

  const [dragOverIndex, setDragOverIndex] = useState(null);
  const canvasRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const fieldType = e.dataTransfer.getData('fieldType');
    
    if (fieldType) {
      // Add new field from sidebar
      addField(fieldType);
    }
    
    setDragOverIndex(null);
  };

  const handleFieldDragStart = (e, fieldId, index) => {
    e.dataTransfer.setData('fieldId', fieldId);
    e.dataTransfer.setData('sourceIndex', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleFieldDragOver = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverIndex(index);
  };

  const handleFieldDrop = (e, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();
    
    const fieldId = e.dataTransfer.getData('fieldId');
    const sourceIndex = parseInt(e.dataTransfer.getData('sourceIndex'));
    
    if (fieldId && !isNaN(sourceIndex) && sourceIndex !== dropIndex) {
      reorderFields(sourceIndex, dropIndex);
    }
    
    setDragOverIndex(null);
  };

  const handleCanvasClick = (e) => {
    // Deselect field if clicking on empty canvas area
    if (e.target === canvasRef.current || e.target.classList.contains('drop-zone')) {
      selectField(null);
    }
  };

  const renderEmptyState = () => (
    <div className="drop-zone-empty">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <rect x="8" y="16" width="48" height="32" rx="4" strokeWidth="2" strokeDasharray="4 4"/>
        <path d="M20 28h24M20 36h16" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="32" cy="8" r="4" fill="currentColor"/>
        <path d="M28 8h8" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <h3>Start Building Your Form</h3>
      <p>Drag fields from the sidebar or click on them to add to your form</p>
      <div className="quick-actions">
        <button 
          className="btn btn-outline btn-sm"
          onClick={() => addField('text')}
        >
          + Add Text Field
        </button>
        <button 
          className="btn btn-outline btn-sm"
          onClick={() => addField('email')}
        >
          + Add Email Field
        </button>
      </div>
    </div>
  );

  // Apply theme styles
  const themeStyles = {
    '--primary-color': formSettings.theme.primaryColor,
    '--background-color': formSettings.theme.backgroundColor,
    '--text-color': formSettings.theme.textColor,
    '--border-radius': formSettings.theme.borderRadius,
    '--spacing': formSettings.theme.spacing === 'compact' ? '0.75rem' : 
                 formSettings.theme.spacing === 'spacious' ? '2rem' : '1.5rem'
  };

  return (
    <div 
      className="form-canvas" 
      ref={canvasRef} 
      onClick={handleCanvasClick}
      style={themeStyles}
    >
      <div className="canvas-header">
        <div className="form-title-section">
          <h2>{formSettings.title}</h2>
          {formSettings.description && (
            <p className="form-description">{formSettings.description}</p>
          )}
        </div>
        <div className="canvas-stats">
          <span className="field-count">{formFields.length} fields</span>
        </div>
      </div>

      <div 
        className={`drop-zone ${dragOverIndex !== null ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {formFields.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="form-fields">
            {formFields.map((field, index) => (
              <div key={field.id} className="field-wrapper">
                {dragOverIndex === index && (
                  <div className="drop-indicator">
                    <div className="drop-line"></div>
                    <span className="drop-text">Drop here</span>
                  </div>
                )}
                
                <div
                  className={`form-field-container ${
                    selectedField === field.id ? 'selected' : ''
                  }`}
                  draggable
                  onDragStart={(e) => handleFieldDragStart(e, field.id, index)}
                  onDragOver={(e) => handleFieldDragOver(e, index)}
                  onDrop={(e) => handleFieldDrop(e, index)}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectField(field.id);
                  }}
                >
                  <FormField field={field} isSelected={selectedField === field.id} />
                </div>
                
                {dragOverIndex === formFields.length && index === formFields.length - 1 && (
                  <div className="drop-indicator">
                    <div className="drop-line"></div>
                    <span className="drop-text">Drop here</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {formFields.length > 0 && (
        <div className="canvas-footer">
          <button 
            className="btn btn-primary"
            type="button"
          >
            {formSettings.submitButtonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default FormCanvas;