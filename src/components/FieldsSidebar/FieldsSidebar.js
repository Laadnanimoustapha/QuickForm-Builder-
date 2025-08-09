import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';
import './FieldsSidebar.css';

const FieldsSidebar = () => {
  const { addField } = useForm();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fieldTypes = [
    // Basic Input Fields
    {
      type: 'text',
      label: 'Text Input',
      icon: '📝',
      description: 'Single line text input',
      category: 'basic'
    },
    {
      type: 'email',
      label: 'Email',
      icon: '📧',
      description: 'Email address input',
      category: 'basic'
    },
    {
      type: 'password',
      label: 'Password',
      icon: '🔒',
      description: 'Password input field',
      category: 'basic'
    },
    {
      type: 'textarea',
      label: 'Textarea',
      icon: '📄',
      description: 'Multi-line text input',
      category: 'basic'
    },
    {
      type: 'number',
      label: 'Number',
      icon: '🔢',
      description: 'Numeric input field',
      category: 'basic'
    },
    {
      type: 'tel',
      label: 'Phone',
      icon: '📞',
      description: 'Phone number input',
      category: 'basic'
    },
    {
      type: 'url',
      label: 'URL',
      icon: '🔗',
      description: 'Website URL input',
      category: 'basic'
    },
    
    // Date & Time Fields
    {
      type: 'date',
      label: 'Date',
      icon: '📅',
      description: 'Date picker',
      category: 'datetime'
    },
    {
      type: 'time',
      label: 'Time',
      icon: '⏰',
      description: 'Time picker',
      category: 'datetime'
    },
    {
      type: 'datetime-local',
      label: 'Date & Time',
      icon: '📆',
      description: 'Date and time picker',
      category: 'datetime'
    },
    {
      type: 'month',
      label: 'Month',
      icon: '🗓️',
      description: 'Month and year picker',
      category: 'datetime'
    },
    {
      type: 'week',
      label: 'Week',
      icon: '📊',
      description: 'Week picker',
      category: 'datetime'
    },
    
    // Selection Fields
    {
      type: 'checkbox',
      label: 'Checkbox',
      icon: '☑️',
      description: 'Single checkbox',
      category: 'selection'
    },
    {
      type: 'radio',
      label: 'Radio Buttons',
      icon: '🔘',
      description: 'Multiple choice (single select)',
      category: 'selection'
    },
    {
      type: 'select',
      label: 'Dropdown',
      icon: '📋',
      description: 'Dropdown selection',
      category: 'selection'
    },
    {
      type: 'multiselect',
      label: 'Multi-Select',
      icon: '📝',
      description: 'Multiple selection dropdown',
      category: 'selection'
    },
    
    // Advanced Fields
    {
      type: 'file',
      label: 'File Upload',
      icon: '📎',
      description: 'File upload input',
      category: 'advanced'
    },
    {
      type: 'range',
      label: 'Range Slider',
      icon: '🎚️',
      description: 'Range slider input',
      category: 'advanced'
    },
    {
      type: 'color',
      label: 'Color Picker',
      icon: '🎨',
      description: 'Color selection input',
      category: 'advanced'
    },
    {
      type: 'rating',
      label: 'Star Rating',
      icon: '⭐',
      description: 'Star rating component',
      category: 'advanced'
    },
    {
      type: 'signature',
      label: 'Signature',
      icon: '✍️',
      description: 'Digital signature pad',
      category: 'advanced'
    },
    
    // Layout & Content
    {
      type: 'heading',
      label: 'Heading',
      icon: '📰',
      description: 'Section heading',
      category: 'layout'
    },
    {
      type: 'paragraph',
      label: 'Paragraph',
      icon: '📃',
      description: 'Text paragraph',
      category: 'layout'
    },
    {
      type: 'divider',
      label: 'Divider',
      icon: '➖',
      description: 'Section divider',
      category: 'layout'
    },
    {
      type: 'spacer',
      label: 'Spacer',
      icon: '⬜',
      description: 'Empty space',
      category: 'layout'
    },
    {
      type: 'image',
      label: 'Image',
      icon: '🖼️',
      description: 'Display image',
      category: 'layout'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Fields', icon: '📋' },
    { id: 'basic', label: 'Basic', icon: '📝' },
    { id: 'datetime', label: 'Date & Time', icon: '📅' },
    { id: 'selection', label: 'Selection', icon: '☑️' },
    { id: 'advanced', label: 'Advanced', icon: '⚙️' },
    { id: 'layout', label: 'Layout', icon: '📐' }
  ];

  const filteredFields = fieldTypes.filter(field => {
    const matchesCategory = selectedCategory === 'all' || field.category === selectedCategory;
    const matchesSearch = field.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         field.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFieldClick = (fieldType) => {
    const defaultProps = getDefaultProps(fieldType);
    addField(fieldType, defaultProps);
  };

  const getDefaultProps = (fieldType) => {
    const defaults = {
      text: {
        label: 'Text Field',
        placeholder: 'Enter text...'
      },
      email: {
        label: 'Email Address',
        placeholder: 'Enter your email...'
      },
      password: {
        label: 'Password',
        placeholder: 'Enter password...'
      },
      textarea: {
        label: 'Message',
        placeholder: 'Enter your message...',
        rows: 4
      },
      number: {
        label: 'Number',
        placeholder: 'Enter number...'
      },
      tel: {
        label: 'Phone Number',
        placeholder: 'Enter phone number...'
      },
      url: {
        label: 'Website URL',
        placeholder: 'https://example.com'
      },
      date: {
        label: 'Date'
      },
      time: {
        label: 'Time'
      },
      'datetime-local': {
        label: 'Date & Time'
      },
      checkbox: {
        label: 'I agree to the terms and conditions'
      },
      radio: {
        label: 'Choose an option',
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ]
      },
      select: {
        label: 'Select an option',
        options: [
          { value: '', label: 'Choose...' },
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ]
      },
      file: {
        label: 'Upload File',
        accept: '*'
      },
      range: {
        label: 'Range',
        min: 0,
        max: 100,
        step: 1
      },
      color: {
        label: 'Choose Color'
      },
      month: {
        label: 'Month'
      },
      week: {
        label: 'Week'
      },
      multiselect: {
        label: 'Multi-Select',
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ]
      },
      rating: {
        label: 'Rate this',
        max: 5
      },
      signature: {
        label: 'Your Signature'
      },
      heading: {
        label: 'Section Heading',
        level: 2,
        text: 'Heading Text'
      },
      paragraph: {
        label: 'Paragraph',
        text: 'This is a paragraph of text that provides information to users.'
      },
      divider: {
        label: 'Divider',
        style: 'solid'
      },
      spacer: {
        label: 'Spacer',
        height: 20
      },
      image: {
        label: 'Image',
        src: '',
        alt: 'Image description',
        width: '100%'
      }
    };

    return defaults[fieldType] || {};
  };

  return (
    <div className="fields-sidebar">
      <div className="sidebar-header">
        <h3>Form Fields</h3>
        <p>Drag and drop fields to build your form</p>
        
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search fields..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="search-icon">🔍</div>
        </div>
        
        {/* Category Filters */}
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              title={category.label}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-label">{category.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="fields-list">
        {filteredFields.length > 0 ? (
          filteredFields.map((field) => (
            <div
              key={field.type}
              className="field-item"
              onClick={() => handleFieldClick(field.type)}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('fieldType', field.type);
                e.dataTransfer.effectAllowed = 'copy';
              }}
            >
              <div className="field-icon">{field.icon}</div>
              <div className="field-info">
                <div className="field-label">{field.label}</div>
                <div className="field-description">{field.description}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-fields-found">
            <div className="no-fields-icon">🔍</div>
            <p>No fields found</p>
            <small>Try adjusting your search or category filter</small>
          </div>
        )}
      </div>
      
      <div className="sidebar-footer">
        <div className="help-text">
          <strong>Quick Tips:</strong>
          <ul>
            <li>Click to add fields instantly</li>
            <li>Drag & drop for precise placement</li>
            <li>Select fields to customize properties</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FieldsSidebar;