import React from 'react';
import { useForm } from '../../context/FormContext';
import './FormField.css';

const FormField = ({ field, isSelected }) => {
  const { removeField, duplicateField } = useForm();

  const handleDelete = (e) => {
    e.stopPropagation();
    removeField(field.id);
  };

  const handleDuplicate = (e) => {
    e.stopPropagation();
    duplicateField(field.id);
  };

  const renderFieldInput = () => {
    const commonProps = {
      id: field.id,
      name: field.id,
      placeholder: field.placeholder,
      required: field.required,
      disabled: true, // Disabled in builder mode
      className: 'form-input'
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'tel':
      case 'url':
      case 'number':
        return <input type={field.type} {...commonProps} />;

      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={field.rows || 4}
          />
        );

      case 'date':
      case 'time':
      case 'datetime-local':
      case 'month':
      case 'week':
      case 'color':
        return <input type={field.type} {...commonProps} />;

      case 'checkbox':
        return (
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              {...commonProps}
              className="form-checkbox"
            />
            <label htmlFor={field.id} className="checkbox-label">
              {field.label}
            </label>
          </div>
        );

      case 'radio':
        return (
          <div className="radio-group">
            {field.options?.map((option, index) => (
              <div key={index} className="radio-wrapper">
                <input
                  type="radio"
                  id={`${field.id}_${index}`}
                  name={field.id}
                  value={option.value}
                  disabled
                  className="form-radio"
                />
                <label htmlFor={`${field.id}_${index}`} className="radio-label">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      case 'select':
        return (
          <select {...commonProps} className="form-select">
            {field.options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'file':
        return (
          <div className="file-input-wrapper">
            <input
              type="file"
              {...commonProps}
              accept={field.accept}
              multiple={field.multiple}
              className="form-file"
            />
            <div className="file-input-display">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 3a2 2 0 00-2 2v1.586l8 8 8-8V5a2 2 0 00-2-2H4zM2 7.414V15a2 2 0 002 2h12a2 2 0 002-2V7.414l-8 8-8-8z"/>
              </svg>
              <span>Choose file...</span>
            </div>
          </div>
        );

      case 'range':
        return (
          <div className="range-wrapper">
            <input
              type="range"
              {...commonProps}
              min={field.min || 0}
              max={field.max || 100}
              step={field.step || 1}
              className="form-range"
            />
            <div className="range-values">
              <span>{field.min || 0}</span>
              <span>{field.max || 100}</span>
            </div>
          </div>
        );

      case 'multiselect':
        return (
          <select
            {...commonProps}
            multiple
            className="form-select multiselect"
          >
            {field.options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'rating':
        return (
          <div className="rating-wrapper">
            {[...Array(field.max || 5)].map((_, index) => (
              <span key={index} className="rating-star">
                ⭐
              </span>
            ))}
          </div>
        );

      case 'signature':
        return (
          <div className="signature-wrapper">
            <div className="signature-pad">
              <span>Signature area (click to sign)</span>
            </div>
          </div>
        );

      case 'heading':
        const HeadingTag = `h${field.level || 2}`;
        return (
          <div className="heading-wrapper">
            {React.createElement(HeadingTag, { className: "form-heading" }, field.text || field.label)}
          </div>
        );

      case 'paragraph':
        return (
          <div className="paragraph-wrapper">
            <p className="form-paragraph">
              {field.text || 'This is a paragraph of text.'}
            </p>
          </div>
        );

      case 'divider':
        return (
          <div className="divider-wrapper">
            <hr className={`form-divider ${field.style || 'solid'}`} />
          </div>
        );

      case 'spacer':
        return (
          <div 
            className="spacer-wrapper"
            style={{ height: `${field.height || 20}px` }}
          >
            <div className="spacer-indicator">
              Spacer ({field.height || 20}px)
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="image-wrapper">
            {field.src ? (
              <img
                src={field.src}
                alt={field.alt || 'Form image'}
                className="form-image"
                style={{ width: field.width || '100%' }}
              />
            ) : (
              <div className="image-placeholder">
                <span>🖼️</span>
                <p>Image placeholder</p>
                <small>Set image URL in properties</small>
              </div>
            )}
          </div>
        );

      default:
        return <input type="text" {...commonProps} />;
    }
  };

  const shouldShowLabel = !['checkbox', 'heading', 'paragraph', 'divider', 'spacer', 'image'].includes(field.type);

  return (
    <div className={`form-field ${isSelected ? 'selected' : ''}`}>
      {/* Field Controls */}
      <div className="field-controls">
        <button
          className="field-control-btn duplicate"
          onClick={handleDuplicate}
          title="Duplicate field"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M2 2v6h6V2H2zM1 1h8v8H1V1zm3 3v6h6V4h-1v5H4V4H3z"/>
          </svg>
        </button>
        <button
          className="field-control-btn delete"
          onClick={handleDelete}
          title="Delete field"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Field Label */}
      {shouldShowLabel && (
        <label htmlFor={field.id} className={`form-label ${field.required ? 'required' : ''}`}>
          {field.label}
        </label>
      )}

      {/* Field Input */}
      <div className="field-input-wrapper">
        {renderFieldInput()}
      </div>

      {/* Field Validation Messages */}
      {field.validation?.message && (
        <div className="field-validation">
          <span className="validation-message">{field.validation.message}</span>
        </div>
      )}

      {/* Field Help Text */}
      {field.helpText && (
        <div className="field-help">
          <span className="help-text">{field.helpText}</span>
        </div>
      )}
    </div>
  );
};

export default FormField;