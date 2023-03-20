import React from 'react';

const PaginationItem = ({ condition, trigger, children }) => {

  return (
    <li className={`page-item ${condition ? 'disabled' : ''}`}>
          <a href='/' className={`page-link ${condition ? 'active': ''}`} onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              trigger()
          }}>
            {children}
          </a>
    </li>
  );
};

export default PaginationItem