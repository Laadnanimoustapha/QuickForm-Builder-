import React, { useState, useEffect } from 'react';
import { useForm } from '../../context/FormContext';
import './PropertiesPanel.css';

const PropertiesPanel = () => {
  const { 
    getSelectedField, 
    updateField, 
    formSettings, 
    updateFormSettings,
    selectedField 
  } = useForm();

  const [activeTab, setActiveTab] = useState('field');
  const field = getSelectedField();

  // Reset to form settings tab when no field is selected
  useEffect(() => {
    if (!selectedField) {
      setActiveTab('form');
    } else {
      setActiveTab('field');
    }
  }, [selectedField]);

  const handleFieldUpdate = (property, value) => {
    if (field) {
      updateField(field.id, { [property]: value });
    }
  };

  const handleValidationUpdate = (validationType, value) => {
    if (field) {
      const newValidation = { ...field.validation, [validationType]: value };
      updateField(field.id, { validation: newValidation });
    }
  };

  const handleOptionUpdate = (index, property, value) => {
    if (field && field.options) {
      const newOptions = [...field.options];
      newOptions[index] = { ...newOptions[index], [property]: value };
      updateField(field.id, { options: newOptions });
    }
  };

  const addOption = () => {
    if (field && field.options) {
      const newOptions = [...field.options, { value: '', label: 'New Option' }];
      updateField(field.id, { options: newOptions });
    }
  };

  const removeOption = (index) => {
    if (field && field.options && field.options.length > 1) {
      const newOptions = field.options.filter((_, i) => i !== index);
      updateField(field.id, { options: newOptions });
    }
  };

  const renderFieldProperties = () => {
    if (!field) {
      return (
        <div className="no-selection">
          <div className="no-selection-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor">
              <rect x="8" y="8" width="32" height="32" rx="4" strokeWidth="2"/>
              <path d="M16 20h16M16 24h12M16 28h8" strokeWidth="2"/>
            </svg>
          </div>
          <h3>No Field Selected</h3>
          <p>Select a field from the canvas to edit its properties</p>
        </div>
      );
    }

    return (
      <div className="field-properties">
        {/* Basic Properties */}
        <div className="property-section">
          <h4>Basic Properties</h4>
          
          <div className="property-group">
            <label className="property-label">Label</label>
            <input
              type="text"
              value={field.label || ''}
              onChange={(e) => handleFieldUpdate('label', e.target.value)}
              className="property-input"
              placeholder="Field label"
            />
          </div>

          {field.type !== 'checkbox' && (
            <div className="property-group">
              <label className="property-label">Placeholder</label>
              <input
                type="text"
                value={field.placeholder || ''}
                onChange={(e) => handleFieldUpdate('placeholder', e.target.value)}
                className="property-input"
                placeholder="Placeholder text"
              />
            </div>
          )}

          <div className="property-group">
            <label className="property-label">Help Text</label>
            <textarea
              value={field.helpText || ''}
              onChange={(e) => handleFieldUpdate('helpText', e.target.value)}
              className="property-input"
              placeholder="Help text for users"
              rows="2"
            />
          </div>

          <div className="property-group checkbox-group">
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={field.required || false}
                onChange={(e) => handleFieldUpdate('required', e.target.checked)}
              />
              <span>Required field</span>
            </label>
          </div>
        </div>

        {/* Field-specific Properties */}
        {(field.type === 'textarea') && (
          <div className="property-section">
            <h4>Textarea Properties</h4>
            <div className="property-group">
              <label className="property-label">Rows</label>
              <input
                type="number"
                value={field.rows || 4}
                onChange={(e) => handleFieldUpdate('rows', parseInt(e.target.value))}
                className="property-input"
                min="2"
                max="10"
              />
            </div>
          </div>
        )}

        {(field.type === 'number' || field.type === 'range') && (
          <div className="property-section">
            <h4>Number Properties</h4>
            <div className="property-row">
              <div className="property-group">
                <label className="property-label">Min</label>
                <input
                  type="number"
                  value={field.min || ''}
                  onChange={(e) => handleFieldUpdate('min', e.target.value)}
                  className="property-input"
                />
              </div>
              <div className="property-group">
                <label className="property-label">Max</label>
                <input
                  type="number"
                  value={field.max || ''}
                  onChange={(e) => handleFieldUpdate('max', e.target.value)}
                  className="property-input"
                />
              </div>
            </div>
            <div className="property-group">
              <label className="property-label">Step</label>
              <input
                type="number"
                value={field.step || 1}
                onChange={(e) => handleFieldUpdate('step', e.target.value)}
                className="property-input"
              />
            </div>
          </div>
        )}

        {field.type === 'file' && (
          <div className="property-section">
            <h4>File Properties</h4>
            <div className="property-group">
              <label className="property-label">Accept</label>
              <input
                type="text"
                value={field.accept || ''}
                onChange={(e) => handleFieldUpdate('accept', e.target.value)}
                className="property-input"
                placeholder="e.g., .jpg,.png,.pdf"
              />
            </div>
            <div className="property-group checkbox-group">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={field.multiple || false}
                  onChange={(e) => handleFieldUpdate('multiple', e.target.checked)}
                />
                <span>Allow multiple files</span>
              </label>
            </div>
          </div>
        )}

        {(field.type === 'radio' || field.type === 'select') && (
          <div className="property-section">
            <h4>Options</h4>
            <div className="options-list">
              {field.options?.map((option, index) => (
                <div key={index} className="option-item">
                  <div className="option-inputs">
                    <input
                      type="text"
                      value={option.label}
                      onChange={(e) => handleOptionUpdate(index, 'label', e.target.value)}
                      className="property-input"
                      placeholder="Option label"
                    />
                    <input
                      type="text"
                      value={option.value}
                      onChange={(e) => handleOptionUpdate(index, 'value', e.target.value)}
                      className="property-input"
                      placeholder="Option value"
                    />
                  </div>
                  <button
                    className="remove-option-btn"
                    onClick={() => removeOption(index)}
                    disabled={field.options.length <= 1}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button className="add-option-btn" onClick={addOption}>
              + Add Option
            </button>
          </div>
        )}

        {/* Validation Rules */}
        <div className="property-section">
          <h4>Validation</h4>
          
          {(field.type === 'text' || field.type === 'textarea') && (
            <>
              <div className="property-row">
                <div className="property-group">
                  <label className="property-label">Min Length</label>
                  <input
                    type="number"
                    value={field.validation?.minLength || ''}
                    onChange={(e) => handleValidationUpdate('minLength', e.target.value)}
                    className="property-input"
                    min="0"
                  />
                </div>
                <div className="property-group">
                  <label className="property-label">Max Length</label>
                  <input
                    type="number"
                    value={field.validation?.maxLength || ''}
                    onChange={(e) => handleValidationUpdate('maxLength', e.target.value)}
                    className="property-input"
                    min="0"
                  />
                </div>
              </div>
              <div className="property-group">
                <label className="property-label">Pattern (Regex)</label>
                <input
                  type="text"
                  value={field.validation?.pattern || ''}
                  onChange={(e) => handleValidationUpdate('pattern', e.target.value)}
                  className="property-input"
                  placeholder="e.g., ^[A-Za-z]+$"
                />
              </div>
            </>
          )}

          <div className="property-group">
            <label className="property-label">Custom Error Message</label>
            <input
              type="text"
              value={field.validation?.message || ''}
              onChange={(e) => handleValidationUpdate('message', e.target.value)}
              className="property-input"
              placeholder="Error message"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderFormSettings = () => (
    <div className="form-settings">
      <div className="property-section">
        <h4>Form Information</h4>
        
        <div className="property-group">
          <label className="property-label">Form Title</label>
          <input
            type="text"
            value={formSettings.title}
            onChange={(e) => updateFormSettings({ title: e.target.value })}
            className="property-input"
            placeholder="Form title"
          />
        </div>

        <div className="property-group">
          <label className="property-label">Description</label>
          <textarea
            value={formSettings.description}
            onChange={(e) => updateFormSettings({ description: e.target.value })}
            className="property-input"
            placeholder="Form description"
            rows="3"
          />
        </div>

        <div className="property-group">
          <label className="property-label">Submit Button Text</label>
          <input
            type="text"
            value={formSettings.submitButtonText}
            onChange={(e) => updateFormSettings({ submitButtonText: e.target.value })}
            className="property-input"
            placeholder="Submit"
          />
        </div>
      </div>

      <div className="property-section">
        <h4>Theme Settings</h4>
        
        <div className="property-group">
          <label className="property-label">Primary Color</label>
          <div className="color-input-wrapper">
            <input
              type="color"
              value={formSettings.theme.primaryColor}
              onChange={(e) => updateFormSettings({ 
                theme: { ...formSettings.theme, primaryColor: e.target.value }
              })}
              className="color-input"
            />
            <input
              type="text"
              value={formSettings.theme.primaryColor}
              onChange={(e) => updateFormSettings({ 
                theme: { ...formSettings.theme, primaryColor: e.target.value }
              })}
              className="property-input"
              placeholder="#3b82f6"
            />
          </div>
          <div className="color-presets">
            {[
              '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
              '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
            ].map(color => (
              <button
                key={color}
                className="color-preset"
                style={{ backgroundColor: color }}
                onClick={() => updateFormSettings({
                  theme: { ...formSettings.theme, primaryColor: color }
                })}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className="property-group">
          <label className="property-label">Background Color</label>
          <div className="color-input-wrapper">
            <input
              type="color"
              value={formSettings.theme.backgroundColor}
              onChange={(e) => updateFormSettings({ 
                theme: { ...formSettings.theme, backgroundColor: e.target.value }
              })}
              className="color-input"
            />
            <input
              type="text"
              value={formSettings.theme.backgroundColor}
              onChange={(e) => updateFormSettings({ 
                theme: { ...formSettings.theme, backgroundColor: e.target.value }
              })}
              className="property-input"
              placeholder="#ffffff"
            />
          </div>
        </div>

        <div className="property-group">
          <label className="property-label">Border Radius</label>
          <select
            value={formSettings.theme.borderRadius}
            onChange={(e) => updateFormSettings({ 
              theme: { ...formSettings.theme, borderRadius: e.target.value }
            })}
            className="property-input"
          >
            <option value="0px">None</option>
            <option value="4px">Small</option>
            <option value="6px">Medium</option>
            <option value="8px">Large</option>
            <option value="12px">Extra Large</option>
          </select>
        </div>

        <div className="property-group">
          <label className="property-label">Spacing</label>
          <select
            value={formSettings.theme.spacing}
            onChange={(e) => updateFormSettings({ 
              theme: { ...formSettings.theme, spacing: e.target.value }
            })}
            className="property-input"
          >
            <option value="compact">Compact</option>
            <option value="medium">Medium</option>
            <option value="spacious">Spacious</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="properties-panel">
      <div className="panel-header">
        <div className="panel-tabs">
          <button
            className={`tab-button ${activeTab === 'field' ? 'active' : ''}`}
            onClick={() => setActiveTab('field')}
            disabled={!selectedField}
          >
            Field
          </button>
          <button
            className={`tab-button ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            Form
          </button>
        </div>
      </div>

      <div className="panel-content">
        {activeTab === 'field' ? renderFieldProperties() : renderFormSettings()}
      </div>
    </div>
  );
};

export default PropertiesPanel;