import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';
import ExportModal from '../ExportModal/ExportModal';
import TemplateModal from '../TemplateModal/TemplateModal';
import './Header.css';

const Header = ({ currentView, onViewChange }) => {
  const { formSettings, updateFormSettings, clearForm, exportFormAsJSON } = useForm();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleTitleChange = (e) => {
    updateFormSettings({ title: e.target.value });
  };

  const handleClearForm = () => {
    clearForm();
    setShowClearConfirm(false);
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleSaveForm = () => {
    const formData = exportFormAsJSON();
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formSettings.title.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#3b82f6"/>
                <path d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h12v2H8v-2z" fill="white"/>
              </svg>
              <span className="logo-text">QuickForm Builder</span>
            </div>
            
            <div className="form-title-input">
              <input
                type="text"
                value={formSettings.title}
                onChange={handleTitleChange}
                className="title-input"
                placeholder="Form Title"
              />
            </div>
          </div>

          <div className="header-center">
            <div className="view-tabs">
              <button
                className={`tab-button ${currentView === 'builder' ? 'active' : ''}`}
                onClick={() => onViewChange('builder')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 3h12v2H2V3zm0 4h12v2H2V7zm0 4h8v2H2v-2z"/>
                </svg>
                Builder
              </button>
              
              <button
                className={`tab-button ${currentView === 'preview' ? 'active' : ''}`}
                onClick={() => onViewChange('preview')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 2C4.5 2 1.5 4.5 0 8c1.5 3.5 4.5 6 8 6s6.5-2.5 8-6c-1.5-3.5-4.5-6-8-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
                Preview
              </button>
              
              <button
                className={`tab-button ${currentView === 'export' ? 'active' : ''}`}
                onClick={() => onViewChange('export')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1l3 3h-2v4H7V4H5l3-3zm-4 8v4h8v-4h2v6H2V9h2z"/>
                </svg>
                Export
              </button>
            </div>
          </div>

          <div className="header-right">
            <div className="header-actions">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setShowTemplateModal(true)}
                title="Use Template"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2h12v2H2V2zm0 4h12v2H2V6zm0 4h8v2H2v-2zm10 0h2v2h-2v-2z"/>
                </svg>
                Templates
              </button>
              
              <button
                className="btn btn-outline btn-sm"
                onClick={handleSaveForm}
                title="Save Form as JSON"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3 2v12h10V5l-3-3H3zm7 1.5L12.5 6H10V3.5zM4 3h5v4h4v8H4V3z"/>
                </svg>
                Save
              </button>
              
              <button
                className="btn btn-outline btn-sm"
                onClick={handleExport}
                title="Export Form Code"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1l3 3h-2v4H7V4H5l3-3zm-4 8v4h8v-4h2v6H2V9h2z"/>
                </svg>
                Export
              </button>
              
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setShowClearConfirm(true)}
                title="Clear Form"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M6.5 1h3l.5.5v1h4v2h-1v9.5l-.5.5h-9l-.5-.5V4.5H2v-2h4v-1l.5-.5zM4.5 4.5v9h7v-9h-7zM6 6h1v6H6V6zm3 0h1v6H9V6z"/>
                </svg>
                Clear
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Template Modal */}
      {showTemplateModal && (
        <TemplateModal onClose={() => setShowTemplateModal(false)} />
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal onClose={() => setShowExportModal(false)} />
      )}

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Clear Form</h3>
              <button
                className="modal-close"
                onClick={() => setShowClearConfirm(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to clear the entire form? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleClearForm}
              >
                Clear Form
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;