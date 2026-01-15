import React from 'react';
const Pagination = ({ postsPerPage, totalPosts, paginate,meta }) => {
  const pageNumbers = [];
  for (let i = 1; i <= meta.lastPage; i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className='pagination flex items-center space-x-3'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item cursor-pointer'>
            <a onClick={() => paginate(number)}   className={meta.page===number ? 'bg-blue-400 text-white py-2 px-4 rounded-full':'text-bleck'}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Pagination;