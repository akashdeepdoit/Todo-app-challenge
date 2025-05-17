import * as React from 'react';
import './checkbox.scss';

export const Checkbox = ({
  onChange, checked, onDelete, label, onKeyUp,
}) => (
  <div className="checkbox">
    <div
      tabIndex="0"
      role="checkbox"
      aria-checked={checked}
      className="checkbox-content"
      onKeyUp={onKeyUp}
    >
      <input
        tabIndex="-1"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className={checked ? 'checkbox-checked' : ''}>{label}</span>
    </div>
    <button type="button" className="delete-button" onClick={onDelete}>
      Delete
    </button>
  </div>
);
