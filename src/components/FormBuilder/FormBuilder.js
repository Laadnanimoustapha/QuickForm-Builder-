import React from 'react';
import FieldsSidebar from '../FieldsSidebar/FieldsSidebar';
import FormCanvas from '../FormCanvas/FormCanvas';
import PropertiesPanel from '../PropertiesPanel/PropertiesPanel';
import FormPreview from '../FormPreview/FormPreview';
import ExportView from '../ExportView/ExportView';
import { useForm } from '../../context/FormContext';
import './FormBuilder.css';

const FormBuilder = ({ currentView }) => {
  const { setPreviewMode } = useForm();

  // Set preview mode based on current view
  React.useEffect(() => {
    setPreviewMode(currentView === 'preview');
  }, [currentView, setPreviewMode]);

  const renderView = () => {
    switch (currentView) {
      case 'preview':
        return <FormPreview />;
      case 'export':
        return <ExportView />;
      default:
        return (
          <div className="form-builder">
            <FieldsSidebar />
            <div className="canvas-area">
              <FormCanvas />
              <PropertiesPanel />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="form-builder-container">
      {renderView()}
    </div>
  );
};

export default FormBuilder;