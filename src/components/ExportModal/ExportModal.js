import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';
import './ExportModal.css';

const ExportModal = ({ onClose }) => {
  const { exportFormAsJSON, formFields, formSettings } = useForm();
  const [exportType, setExportType] = useState('json');
  const [copied, setCopied] = useState(false);

  const generateReactComponent = () => {
    const componentName = formSettings.title.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '') || 'CustomForm';
    
    const fieldComponents = formFields.map(field => {
      const fieldProps = {
        id: field.id,
        name: field.id,
        required: field.required,
        placeholder: field.placeholder
      };

      switch (field.type) {
        case 'textarea':
          return `        <div className="form-field">
          <label htmlFor="${field.id}" className="${field.required ? 'required' : ''}">${field.label}</label>
          <textarea
            id="${field.id}"
            name="${field.id}"
            ${field.required ? 'required' : ''}
            placeholder="${field.placeholder || ''}"
            rows={${field.rows || 4}}
            className="form-input"
          />
          ${field.helpText ? `<div className="help-text">${field.helpText}</div>` : ''}
        </div>`;

        case 'checkbox':
          return `        <div className="form-field">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="${field.id}"
              name="${field.id}"
              ${field.required ? 'required' : ''}
              className="form-checkbox"
            />
            <label htmlFor="${field.id}">${field.label}</label>
          </div>
          ${field.helpText ? `<div className="help-text">${field.helpText}</div>` : ''}
        </div>`;

        case 'radio':
          const radioOptions = field.options?.map((option, index) => 
            `            <div className="radio-wrapper">
              <input
                type="radio"
                id="${field.id}_${index}"
                name="${field.id}"
                value="${option.value}"
                ${field.required ? 'required' : ''}
                className="form-radio"
              />
              <label htmlFor="${field.id}_${index}">${option.label}</label>
            </div>`
          ).join('\n') || '';
          
          return `        <div className="form-field">
          <label className="${field.required ? 'required' : ''}">${field.label}</label>
          <div className="radio-group">
${radioOptions}
          </div>
          ${field.helpText ? `<div className="help-text">${field.helpText}</div>` : ''}
        </div>`;

        case 'select':
          const selectOptions = field.options?.map(option => 
            `            <option value="${option.value}">${option.label}</option>`
          ).join('\n') || '';
          
          return `        <div className="form-field">
          <label htmlFor="${field.id}" className="${field.required ? 'required' : ''}">${field.label}</label>
          <select
            id="${field.id}"
            name="${field.id}"
            ${field.required ? 'required' : ''}
            className="form-select"
          >
${selectOptions}
          </select>
          ${field.helpText ? `<div className="help-text">${field.helpText}</div>` : ''}
        </div>`;

        case 'file':
          return `        <div className="form-field">
          <label htmlFor="${field.id}" className="${field.required ? 'required' : ''}">${field.label}</label>
          <input
            type="file"
            id="${field.id}"
            name="${field.id}"
            ${field.required ? 'required' : ''}
            ${field.accept ? `accept="${field.accept}"` : ''}
            ${field.multiple ? 'multiple' : ''}
            className="form-file"
          />
          ${field.helpText ? `<div className="help-text">${field.helpText}</div>` : ''}
        </div>`;

        case 'range':
          return `        <div className="form-field">
          <label htmlFor="${field.id}" className="${field.required ? 'required' : ''}">${field.label}</label>
          <input
            type="range"
            id="${field.id}"
            name="${field.id}"
            ${field.required ? 'required' : ''}
            min={${field.min || 0}}
            max={${field.max || 100}}
            step={${field.step || 1}}
            className="form-range"
          />
          ${field.helpText ? `<div className="help-text">${field.helpText}</div>` : ''}
        </div>`;

        default:
          return `        <div className="form-field">
          <label htmlFor="${field.id}" className="${field.required ? 'required' : ''}">${field.label}</label>
          <input
            type="${field.type}"
            id="${field.id}"
            name="${field.id}"
            ${field.required ? 'required' : ''}
            placeholder="${field.placeholder || ''}"
            ${field.min ? `min="${field.min}"` : ''}
            ${field.max ? `max="${field.max}"` : ''}
            ${field.step ? `step="${field.step}"` : ''}
            className="form-input"
          />
          ${field.helpText ? `<div className="help-text">${field.helpText}</div>` : ''}
        </div>`;
      }
    }).join('\n\n');

    return `import React, { useState } from 'react';
import './${componentName}.css';

const ${componentName} = ({ onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="${componentName.toLowerCase()}-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h1 className="form-title">${formSettings.title}</h1>
        ${formSettings.description ? `<p className="form-description">${formSettings.description}</p>` : ''}
      </div>

      <div className="form-fields" onChange={handleInputChange}>
${fieldComponents}
      </div>

      <div className="form-footer">
        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : '${formSettings.submitButtonText}'}
        </button>
      </div>
    </form>
  );
};

export default ${componentName};`;
  };

  const generateCSS = () => {
    const componentName = formSettings.title.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '') || 'CustomForm';
    
    return `.${componentName.toLowerCase()}-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: ${formSettings.theme.backgroundColor};
  border-radius: ${formSettings.theme.borderRadius};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-header {
  margin-bottom: 2rem;
  text-align: center;
}

.form-title {
  margin: 0 0 1rem 0;
  font-size: 1.875rem;
  font-weight: 700;
  color: ${formSettings.theme.textColor};
}

.form-description {
  margin: 0;
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.5;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: ${formSettings.theme.spacing === 'compact' ? '1rem' : formSettings.theme.spacing === 'spacious' ? '2rem' : '1.5rem'};
  margin-bottom: 2rem;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${formSettings.theme.textColor};
  font-size: 0.875rem;
}

.form-field label.required::after {
  content: ' *';
  color: #ef4444;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: ${formSettings.theme.borderRadius};
  font-size: 1rem;
  background: white;
  transition: all 0.2s ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: ${formSettings.theme.primaryColor};
  box-shadow: 0 0 0 3px ${formSettings.theme.primaryColor}1a;
}

textarea.form-input {
  resize: vertical;
  min-height: 100px;
}

.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.form-checkbox {
  width: 1.25rem;
  height: 1.25rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.form-checkbox:checked {
  background-color: ${formSettings.theme.primaryColor};
  border-color: ${formSettings.theme.primaryColor};
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.radio-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.form-radio {
  width: 1.25rem;
  height: 1.25rem;
  border: 1px solid #d1d5db;
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
}

.form-radio:checked {
  background-color: ${formSettings.theme.primaryColor};
  border-color: ${formSettings.theme.primaryColor};
}

.form-file {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: ${formSettings.theme.borderRadius};
  font-size: 1rem;
  background: white;
  cursor: pointer;
}

.form-range {
  width: 100%;
  height: 0.5rem;
  border-radius: 0.25rem;
  background: #e5e7eb;
  outline: none;
  cursor: pointer;
}

.help-text {
  margin-top: 0.375rem;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.4;
}

.form-footer {
  display: flex;
  justify-content: center;
}

.submit-button {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: ${formSettings.theme.borderRadius};
  background: ${formSettings.theme.primaryColor};
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-button:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .${componentName.toLowerCase()}-form {
    padding: 1.5rem;
  }
  
  .form-title {
    font-size: 1.5rem;
  }
  
  .form-input,
  .form-select {
    padding: 0.625rem;
    font-size: 0.875rem;
  }
  
  .submit-button {
    width: 100%;
  }
}`;
  };

  const getExportContent = () => {
    switch (exportType) {
      case 'json':
        return JSON.stringify(exportFormAsJSON(), null, 2);
      case 'react':
        return generateReactComponent();
      case 'css':
        return generateCSS();
      default:
        return '';
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getExportContent());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const content = getExportContent();
    const filename = `${formSettings.title.replace(/\s+/g, '-').toLowerCase()}.${exportType === 'json' ? 'json' : exportType === 'react' ? 'jsx' : 'css'}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="export-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Export Form</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="export-options">
            <div className="export-type-selector">
              <label className="export-option">
                <input
                  type="radio"
                  name="exportType"
                  value="json"
                  checked={exportType === 'json'}
                  onChange={(e) => setExportType(e.target.value)}
                />
                <div className="option-content">
                  <div className="option-title">JSON Schema</div>
                  <div className="option-description">Export form configuration as JSON</div>
                </div>
              </label>

              <label className="export-option">
                <input
                  type="radio"
                  name="exportType"
                  value="react"
                  checked={exportType === 'react'}
                  onChange={(e) => setExportType(e.target.value)}
                />
                <div className="option-content">
                  <div className="option-title">React Component</div>
                  <div className="option-description">Generate ready-to-use React component</div>
                </div>
              </label>

              <label className="export-option">
                <input
                  type="radio"
                  name="exportType"
                  value="css"
                  checked={exportType === 'css'}
                  onChange={(e) => setExportType(e.target.value)}
                />
                <div className="option-content">
                  <div className="option-title">CSS Styles</div>
                  <div className="option-description">Export form styles as CSS</div>
                </div>
              </label>
            </div>

            <div className="code-preview">
              <div className="code-header">
                <span className="code-language">
                  {exportType === 'json' ? 'JSON' : exportType === 'react' ? 'JSX' : 'CSS'}
                </span>
                <div className="code-actions">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={handleCopy}
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                </div>
              </div>
              <pre className="code-content">
                <code>{getExportContent()}</code>
              </pre>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;