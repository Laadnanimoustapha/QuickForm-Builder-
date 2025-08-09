import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';
import './ExportView.css';

const ExportView = () => {
  const { exportFormAsJSON, formFields, formSettings } = useForm();
  const [exportType, setExportType] = useState('json');
  const [copied, setCopied] = useState(false);

  const generateReactComponent = () => {
    const componentName = formSettings.title.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '') || 'CustomForm';
    
    const fieldComponents = formFields.map(field => {
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

  const generateHTML = () => {
    const fieldComponents = formFields.map(field => {
      switch (field.type) {
        case 'textarea':
          return `    <div class="form-field">
      <label for="${field.id}" class="${field.required ? 'required' : ''}">${field.label}</label>
      <textarea
        id="${field.id}"
        name="${field.id}"
        ${field.required ? 'required' : ''}
        placeholder="${field.placeholder || ''}"
        rows="${field.rows || 4}"
        class="form-input"
      ></textarea>
      ${field.helpText ? `<div class="help-text">${field.helpText}</div>` : ''}
    </div>`;

        case 'checkbox':
          return `    <div class="form-field">
      <div class="checkbox-wrapper">
        <input
          type="checkbox"
          id="${field.id}"
          name="${field.id}"
          ${field.required ? 'required' : ''}
          class="form-checkbox"
        />
        <label for="${field.id}">${field.label}</label>
      </div>
      ${field.helpText ? `<div class="help-text">${field.helpText}</div>` : ''}
    </div>`;

        case 'radio':
          const radioOptions = field.options?.map((option, index) => 
            `        <div class="radio-wrapper">
          <input
            type="radio"
            id="${field.id}_${index}"
            name="${field.id}"
            value="${option.value}"
            ${field.required ? 'required' : ''}
            class="form-radio"
          />
          <label for="${field.id}_${index}">${option.label}</label>
        </div>`
          ).join('\n') || '';
          
          return `    <div class="form-field">
      <label class="${field.required ? 'required' : ''}">${field.label}</label>
      <div class="radio-group">
${radioOptions}
      </div>
      ${field.helpText ? `<div class="help-text">${field.helpText}</div>` : ''}
    </div>`;

        case 'select':
          const selectOptions = field.options?.map(option => 
            `        <option value="${option.value}">${option.label}</option>`
          ).join('\n') || '';
          
          return `    <div class="form-field">
      <label for="${field.id}" class="${field.required ? 'required' : ''}">${field.label}</label>
      <select
        id="${field.id}"
        name="${field.id}"
        ${field.required ? 'required' : ''}
        class="form-select"
      >
${selectOptions}
      </select>
      ${field.helpText ? `<div class="help-text">${field.helpText}</div>` : ''}
    </div>`;

        default:
          return `    <div class="form-field">
      <label for="${field.id}" class="${field.required ? 'required' : ''}">${field.label}</label>
      <input
        type="${field.type}"
        id="${field.id}"
        name="${field.id}"
        ${field.required ? 'required' : ''}
        placeholder="${field.placeholder || ''}"
        ${field.min ? `min="${field.min}"` : ''}
        ${field.max ? `max="${field.max}"` : ''}
        class="form-input"
      />
      ${field.helpText ? `<div class="help-text">${field.helpText}</div>` : ''}
    </div>`;
      }
    }).join('\n\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formSettings.title}</title>
  <link rel="stylesheet" href="form-styles.css">
</head>
<body>
  <form class="custom-form" id="customForm">
    <div class="form-header">
      <h1 class="form-title">${formSettings.title}</h1>
      ${formSettings.description ? `<p class="form-description">${formSettings.description}</p>` : ''}
    </div>

    <div class="form-fields">
${fieldComponents}
    </div>

    <div class="form-footer">
      <button type="submit" class="submit-button">
        ${formSettings.submitButtonText}
      </button>
    </div>
  </form>

  <script>
    document.getElementById('customForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = {};
      
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      
      console.log('Form submitted:', data);
      alert('Form submitted successfully!');
    });
  </script>
</body>
</html>`;
  };

  const generateCSS = () => {
    return `.custom-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: ${formSettings.theme.backgroundColor};
  border-radius: ${formSettings.theme.borderRadius};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
  box-sizing: border-box;
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
  .custom-form {
    padding: 1.5rem;
    margin: 1rem;
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
      case 'html':
        return generateHTML();
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
    const extensions = {
      json: 'json',
      react: 'jsx',
      html: 'html',
      css: 'css'
    };
    const filename = `${formSettings.title.replace(/\s+/g, '-').toLowerCase()}.${extensions[exportType]}`;
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

  if (formFields.length === 0) {
    return (
      <div className="export-view">
        <div className="export-empty">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor">
              <rect x="8" y="16" width="48" height="32" rx="4" strokeWidth="2"/>
              <path d="M20 28h24M20 36h16" strokeWidth="2" strokeLinecap="round"/>
              <path d="M32 8l4 4-4 4M28 8l-4 4 4 4" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h3>No Form to Export</h3>
          <p>Create a form with some fields to export it</p>
        </div>
      </div>
    );
  }

  return (
    <div className="export-view">
      <div className="export-header">
        <h2>Export Your Form</h2>
        <p>Choose your preferred format and download or copy the code</p>
      </div>

      <div className="export-content">
        <div className="export-sidebar">
          <div className="export-options">
            <h3>Export Format</h3>
            
            <label className={`export-option ${exportType === 'json' ? 'active' : ''}`}>
              <input
                type="radio"
                name="exportType"
                value="json"
                checked={exportType === 'json'}
                onChange={(e) => setExportType(e.target.value)}
              />
              <div className="option-content">
                <div className="option-title">JSON Schema</div>
                <div className="option-description">Form configuration data</div>
              </div>
            </label>

            <label className={`export-option ${exportType === 'react' ? 'active' : ''}`}>
              <input
                type="radio"
                name="exportType"
                value="react"
                checked={exportType === 'react'}
                onChange={(e) => setExportType(e.target.value)}
              />
              <div className="option-content">
                <div className="option-title">React Component</div>
                <div className="option-description">Ready-to-use JSX component</div>
              </div>
            </label>

            <label className={`export-option ${exportType === 'html' ? 'active' : ''}`}>
              <input
                type="radio"
                name="exportType"
                value="html"
                checked={exportType === 'html'}
                onChange={(e) => setExportType(e.target.value)}
              />
              <div className="option-content">
                <div className="option-title">HTML Form</div>
                <div className="option-description">Complete HTML document</div>
              </div>
            </label>

            <label className={`export-option ${exportType === 'css' ? 'active' : ''}`}>
              <input
                type="radio"
                name="exportType"
                value="css"
                checked={exportType === 'css'}
                onChange={(e) => setExportType(e.target.value)}
              />
              <div className="option-content">
                <div className="option-title">CSS Styles</div>
                <div className="option-description">Form styling rules</div>
              </div>
            </label>
          </div>

          <div className="export-actions">
            <button
              className="btn btn-outline"
              onClick={handleCopy}
            >
              {copied ? '✓ Copied!' : 'Copy Code'}
            </button>
            <button
              className="btn btn-primary"
              onClick={handleDownload}
            >
              Download File
            </button>
          </div>
        </div>

        <div className="code-preview">
          <div className="code-header">
            <span className="code-language">
              {exportType.toUpperCase()}
            </span>
            <span className="code-size">
              {getExportContent().length} characters
            </span>
          </div>
          <pre className="code-content">
            <code>{getExportContent()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ExportView;