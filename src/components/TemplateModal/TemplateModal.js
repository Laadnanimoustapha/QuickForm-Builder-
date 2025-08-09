import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';
import './TemplateModal.css';

const TemplateModal = ({ onClose }) => {
  const { loadForm, clearForm } = useForm();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 'contact',
      name: 'Contact Form',
      description: 'Basic contact form with name, email, and message',
      icon: '📧',
      category: 'business',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Full Name',
          placeholder: 'Enter your full name',
          required: true
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email Address',
          placeholder: 'Enter your email',
          required: true
        },
        {
          id: 'phone',
          type: 'tel',
          label: 'Phone Number',
          placeholder: 'Enter your phone number',
          required: false
        },
        {
          id: 'subject',
          type: 'select',
          label: 'Subject',
          required: true,
          options: [
            { value: '', label: 'Select a subject' },
            { value: 'general', label: 'General Inquiry' },
            { value: 'support', label: 'Support Request' },
            { value: 'sales', label: 'Sales Question' }
          ]
        },
        {
          id: 'message',
          type: 'textarea',
          label: 'Message',
          placeholder: 'Enter your message here...',
          required: true,
          rows: 5
        }
      ],
      settings: {
        title: 'Contact Us',
        description: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
        submitButtonText: 'Send Message'
      }
    },
    {
      id: 'survey',
      name: 'Customer Survey',
      description: 'Customer satisfaction survey with ratings and feedback',
      icon: '📊',
      category: 'survey',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Your Name',
          placeholder: 'Enter your name',
          required: true
        },
        {
          id: 'satisfaction',
          type: 'radio',
          label: 'How satisfied are you with our service?',
          required: true,
          options: [
            { value: 'very-satisfied', label: 'Very Satisfied' },
            { value: 'satisfied', label: 'Satisfied' },
            { value: 'neutral', label: 'Neutral' },
            { value: 'dissatisfied', label: 'Dissatisfied' },
            { value: 'very-dissatisfied', label: 'Very Dissatisfied' }
          ]
        },
        {
          id: 'rating',
          type: 'rating',
          label: 'Rate your overall experience',
          required: true,
          max: 5
        },
        {
          id: 'recommend',
          type: 'radio',
          label: 'Would you recommend us to others?',
          required: true,
          options: [
            { value: 'yes', label: 'Yes, definitely' },
            { value: 'maybe', label: 'Maybe' },
            { value: 'no', label: 'No, probably not' }
          ]
        },
        {
          id: 'improvements',
          type: 'textarea',
          label: 'What could we improve?',
          placeholder: 'Share your suggestions...',
          required: false,
          rows: 4
        }
      ],
      settings: {
        title: 'Customer Satisfaction Survey',
        description: 'Help us improve by sharing your feedback',
        submitButtonText: 'Submit Survey'
      }
    },
    {
      id: 'registration',
      name: 'Event Registration',
      description: 'Event registration form with personal details and preferences',
      icon: '🎟️',
      category: 'event',
      fields: [
        {
          id: 'firstName',
          type: 'text',
          label: 'First Name',
          placeholder: 'Enter your first name',
          required: true
        },
        {
          id: 'lastName',
          type: 'text',
          label: 'Last Name',
          placeholder: 'Enter your last name',
          required: true
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email Address',
          placeholder: 'Enter your email',
          required: true
        },
        {
          id: 'phone',
          type: 'tel',
          label: 'Phone Number',
          placeholder: 'Enter your phone number',
          required: true
        },
        {
          id: 'company',
          type: 'text',
          label: 'Company/Organization',
          placeholder: 'Enter your company name',
          required: false
        },
        {
          id: 'dietaryRestrictions',
          type: 'multiselect',
          label: 'Dietary Restrictions',
          required: false,
          options: [
            { value: 'vegetarian', label: 'Vegetarian' },
            { value: 'vegan', label: 'Vegan' },
            { value: 'gluten-free', label: 'Gluten-free' },
            { value: 'dairy-free', label: 'Dairy-free' },
            { value: 'nut-allergy', label: 'Nut Allergy' }
          ]
        },
        {
          id: 'tshirtSize',
          type: 'select',
          label: 'T-Shirt Size',
          required: true,
          options: [
            { value: '', label: 'Select size' },
            { value: 'xs', label: 'XS' },
            { value: 's', label: 'S' },
            { value: 'm', label: 'M' },
            { value: 'l', label: 'L' },
            { value: 'xl', label: 'XL' },
            { value: 'xxl', label: 'XXL' }
          ]
        },
        {
          id: 'terms',
          type: 'checkbox',
          label: 'I agree to the terms and conditions',
          required: true
        }
      ],
      settings: {
        title: 'Event Registration',
        description: 'Register for our upcoming event',
        submitButtonText: 'Register Now'
      }
    },
    {
      id: 'job-application',
      name: 'Job Application',
      description: 'Comprehensive job application form',
      icon: '💼',
      category: 'business',
      fields: [
        {
          id: 'personalInfo',
          type: 'heading',
          label: 'Personal Information',
          level: 2,
          text: 'Personal Information'
        },
        {
          id: 'fullName',
          type: 'text',
          label: 'Full Name',
          placeholder: 'Enter your full name',
          required: true
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email Address',
          placeholder: 'Enter your email',
          required: true
        },
        {
          id: 'phone',
          type: 'tel',
          label: 'Phone Number',
          placeholder: 'Enter your phone number',
          required: true
        },
        {
          id: 'address',
          type: 'textarea',
          label: 'Address',
          placeholder: 'Enter your full address',
          required: true,
          rows: 3
        },
        {
          id: 'divider1',
          type: 'divider',
          label: 'Divider'
        },
        {
          id: 'jobInfo',
          type: 'heading',
          label: 'Job Information',
          level: 2,
          text: 'Job Information'
        },
        {
          id: 'position',
          type: 'select',
          label: 'Position Applied For',
          required: true,
          options: [
            { value: '', label: 'Select position' },
            { value: 'frontend', label: 'Frontend Developer' },
            { value: 'backend', label: 'Backend Developer' },
            { value: 'fullstack', label: 'Full Stack Developer' },
            { value: 'designer', label: 'UI/UX Designer' },
            { value: 'manager', label: 'Project Manager' }
          ]
        },
        {
          id: 'experience',
          type: 'radio',
          label: 'Years of Experience',
          required: true,
          options: [
            { value: '0-1', label: '0-1 years' },
            { value: '2-3', label: '2-3 years' },
            { value: '4-5', label: '4-5 years' },
            { value: '6-10', label: '6-10 years' },
            { value: '10+', label: '10+ years' }
          ]
        },
        {
          id: 'salary',
          type: 'range',
          label: 'Expected Salary (in thousands)',
          required: true,
          min: 30,
          max: 200,
          step: 5
        },
        {
          id: 'resume',
          type: 'file',
          label: 'Upload Resume',
          required: true,
          accept: '.pdf,.doc,.docx'
        },
        {
          id: 'coverLetter',
          type: 'textarea',
          label: 'Cover Letter',
          placeholder: 'Tell us why you\'re perfect for this role...',
          required: false,
          rows: 6
        }
      ],
      settings: {
        title: 'Job Application Form',
        description: 'Apply for exciting opportunities at our company',
        submitButtonText: 'Submit Application'
      }
    },
    {
      id: 'feedback',
      name: 'Product Feedback',
      description: 'Collect detailed product feedback and suggestions',
      icon: '💭',
      category: 'survey',
      fields: [
        {
          id: 'product',
          type: 'select',
          label: 'Which product are you reviewing?',
          required: true,
          options: [
            { value: '', label: 'Select product' },
            { value: 'product-a', label: 'Product A' },
            { value: 'product-b', label: 'Product B' },
            { value: 'product-c', label: 'Product C' }
          ]
        },
        {
          id: 'usage',
          type: 'radio',
          label: 'How long have you been using this product?',
          required: true,
          options: [
            { value: 'less-week', label: 'Less than a week' },
            { value: 'week-month', label: '1 week to 1 month' },
            { value: 'month-6months', label: '1-6 months' },
            { value: 'more-6months', label: 'More than 6 months' }
          ]
        },
        {
          id: 'features',
          type: 'multiselect',
          label: 'Which features do you use most?',
          required: false,
          options: [
            { value: 'feature1', label: 'Feature 1' },
            { value: 'feature2', label: 'Feature 2' },
            { value: 'feature3', label: 'Feature 3' },
            { value: 'feature4', label: 'Feature 4' }
          ]
        },
        {
          id: 'rating',
          type: 'rating',
          label: 'Overall Rating',
          required: true,
          max: 5
        },
        {
          id: 'improvements',
          type: 'textarea',
          label: 'What improvements would you suggest?',
          placeholder: 'Share your ideas for making this product better...',
          required: false,
          rows: 4
        },
        {
          id: 'recommend',
          type: 'checkbox',
          label: 'I would recommend this product to others',
          required: false
        }
      ],
      settings: {
        title: 'Product Feedback Form',
        description: 'Your feedback helps us improve our products',
        submitButtonText: 'Submit Feedback'
      }
    }
  ];

  const categories = [
    { id: 'all', label: 'All Templates', icon: '📋' },
    { id: 'business', label: 'Business', icon: '💼' },
    { id: 'survey', label: 'Survey', icon: '📊' },
    { id: 'event', label: 'Event', icon: '🎟️' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTemplates = templates.filter(template => 
    selectedCategory === 'all' || template.category === selectedCategory
  );

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      clearForm();
      loadForm({
        formFields: selectedTemplate.fields,
        formSettings: selectedTemplate.settings
      });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="template-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Choose a Template</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="template-categories">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-label">{category.label}</span>
              </button>
            ))}
          </div>

          <div className="templates-grid">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className={`template-card ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
                onClick={() => handleTemplateSelect(template)}
              >
                <div className="template-icon">{template.icon}</div>
                <div className="template-info">
                  <h4 className="template-name">{template.name}</h4>
                  <p className="template-description">{template.description}</p>
                  <div className="template-meta">
                    <span className="field-count">{template.fields.length} fields</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedTemplate && (
            <div className="template-preview">
              <h4>Preview: {selectedTemplate.name}</h4>
              <div className="preview-content">
                <div className="preview-header">
                  <h5>{selectedTemplate.settings.title}</h5>
                  <p>{selectedTemplate.settings.description}</p>
                </div>
                <div className="preview-fields">
                  {selectedTemplate.fields.slice(0, 5).map((field, index) => (
                    <div key={index} className="preview-field">
                      <span className="field-type">{field.type}</span>
                      <span className="field-label">{field.label}</span>
                    </div>
                  ))}
                  {selectedTemplate.fields.length > 5 && (
                    <div className="preview-field more">
                      +{selectedTemplate.fields.length - 5} more fields
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleUseTemplate}
            disabled={!selectedTemplate}
          >
            Use Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;