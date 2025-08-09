import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';
import './FormPreview.css';

const FormPreview = () => {
  const { formFields, formSettings } = useForm();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({
        ...prev,
        [fieldId]: null
      }));
    }
  };

  const validateField = (field) => {
    const value = formData[field.id];
    const validation = field.validation || {};

    // Required validation
    if (field.required && (!value || value.toString().trim() === '')) {
      return 'This field is required';
    }

    // Skip other validations if field is empty and not required
    if (!value || value.toString().trim() === '') {
      return null;
    }

    // Length validations
    if (validation.minLength && value.length < parseInt(validation.minLength)) {
      return `Minimum length is ${validation.minLength} characters`;
    }

    if (validation.maxLength && value.length > parseInt(validation.maxLength)) {
      return `Maximum length is ${validation.maxLength} characters`;
    }

    // Pattern validation
    if (validation.pattern) {
      try {
        const regex = new RegExp(validation.pattern);
        if (!regex.test(value)) {
          return validation.message || 'Invalid format';
        }
      } catch (e) {
        console.warn('Invalid regex pattern:', validation.pattern);
      }
    }

    // Email validation
    if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    // URL validation
    if (field.type === 'url') {
      try {
        new URL(value);
      } catch {
        return 'Please enter a valid URL';
      }
    }

    // Number validations
    if (field.type === 'number' || field.type === 'range') {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        return 'Please enter a valid number';
      }
      
      if (field.min !== undefined && numValue < parseFloat(field.min)) {
        return `Minimum value is ${field.min}`;
      }
      
      if (field.max !== undefined && numValue > parseFloat(field.max)) {
        return `Maximum value is ${field.max}`;
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    // Validate all fields
    const newErrors = {};
    formFields.forEach(field => {
      const error = validateField(field);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitResult({
        type: 'success',
        message: 'Form submitted successfully!'
      });
    } catch (error) {
      setSubmitResult({
        type: 'error',
        message: 'Failed to submit form. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field) => {
    const value = formData[field.id] || '';
    const error = errors[field.id];
    const hasError = !!error;

    const commonProps = {
      id: field.id,
      name: field.id,
      required: field.required,
      className: `preview-input ${hasError ? 'error' : ''}`,
      onChange: (e) => handleInputChange(field.id, e.target.value)
    };

    const renderInput = () => {
      switch (field.type) {
        case 'textarea':
          return (
            <textarea
              {...commonProps}
              value={value}
              placeholder={field.placeholder}
              rows={field.rows || 4}
            />
          );

        case 'checkbox':
          return (
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                {...commonProps}
                checked={value === true}
                onChange={(e) => handleInputChange(field.id, e.target.checked)}
                className="preview-checkbox"
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
                    checked={value === option.value}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="preview-radio"
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
            <select
              {...commonProps}
              value={value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className="preview-select"
            >
              {field.options?.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );

        case 'file':
          return (
            <input
              type="file"
              {...commonProps}
              accept={field.accept}
              multiple={field.multiple}
              onChange={(e) => handleInputChange(field.id, e.target.files)}
              className="preview-file"
            />
          );

        case 'range':
          return (
            <div className="range-wrapper">
              <input
                type="range"
                {...commonProps}
                value={value}
                min={field.min || 0}
                max={field.max || 100}
                step={field.step || 1}
                className="preview-range"
              />
              <div className="range-value">{value || field.min || 0}</div>
            </div>
          );

        default:
          return (
            <input
              type={field.type}
              {...commonProps}
              value={value}
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
              step={field.step}
            />
          );
      }
    };

    return (
      <div key={field.id} className="preview-field">
        {field.type !== 'checkbox' && (
          <label htmlFor={field.id} className={`preview-label ${field.required ? 'required' : ''}`}>
            {field.label}
          </label>
        )}
        
        <div className="field-input-wrapper">
          {renderInput()}
        </div>
        
        {error && (
          <div className="field-error">
            {error}
          </div>
        )}
        
        {field.helpText && !error && (
          <div className="field-help">
            {field.helpText}
          </div>
        )}
      </div>
    );
  };

  if (formFields.length === 0) {
    return (
      <div className="preview-container">
        <div className="preview-empty">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor">
              <rect x="8" y="16" width="48" height="32" rx="4" strokeWidth="2"/>
              <path d="M20 28h24M20 36h16" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="32" cy="8" r="4" fill="currentColor"/>
            </svg>
          </div>
          <h3>No Fields to Preview</h3>
          <p>Add some fields to your form to see the preview</p>
        </div>
      </div>
    );
  }

  // Apply theme styles
  const themeStyles = {
    '--primary-color': formSettings.theme.primaryColor,
    '--background-color': formSettings.theme.backgroundColor,
    '--text-color': formSettings.theme.textColor,
    '--border-radius': formSettings.theme.borderRadius,
    '--spacing': formSettings.theme.spacing === 'compact' ? '1rem' : 
                 formSettings.theme.spacing === 'spacious' ? '2rem' : '1.5rem'
  };

  return (
    <div className="preview-container" style={themeStyles}>
      <div className="preview-header">
        <h2>Form Preview</h2>
        <p>This is how your form will look to users</p>
      </div>

      <div className="preview-form-wrapper">
        <form className="preview-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h1 className="form-title">{formSettings.title}</h1>
            {formSettings.description && (
              <p className="form-description">{formSettings.description}</p>
            )}
          </div>

          <div className="form-fields">
            {formFields.map(renderField)}
          </div>

          <div className="form-footer">
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
              style={{
                backgroundColor: formSettings.theme.primaryColor,
                borderRadius: formSettings.theme.borderRadius
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Submitting...
                </>
              ) : (
                formSettings.submitButtonText
              )}
            </button>
          </div>

          {submitResult && (
            <div className={`submit-result ${submitResult.type}`}>
              <div className="result-icon">
                {submitResult.type === 'success' ? '✓' : '✗'}
              </div>
              <span>{submitResult.message}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormPreview;