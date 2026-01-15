import PaginationItem from '../../atom/web/paginationItem';
import React, { useState } from 'react';

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
    // const pages = [...Array(totalPages).keys()].map((page) => page + 1);
    
    const case12last = (currentPage === 1) || (currentPage === 2) || (currentPage === lastPage) 
    const case3 = lastPage === 3 
    const case2 = lastPage === 2
    const case1 = lastPage === 1
    const caselastCheck = case12last || (currentPage === (lastPage - 1))

    const onPageChangeTigger = (pageNumber) => {
        if (pageNumber === currentPage) {
            return
        }
        onPageChange(pageNumber)
    }

    let section2 = ''
    if (!case1) {
        if (case12last || case3 || case2) {
            section2 = (
                <PaginationItem condition={currentPage === 2} trigger={() => onPageChangeTigger(2)}>
                    2
                </PaginationItem>
            )
        } else {
            section2 = (
                <li className='page-elipses'>
                    <span className='elipses'>...</span>
                </li> 
            )
        }
    }
    let section3 = ''
    if (!case3 && !case2 && !case1) {
        if (case12last) {
            section3 = (
                <li className='page-elipses'>
                    <span className='elipses'>...</span>
                </li> 
            )
        } else {
            section3 = (
                <PaginationItem condition={true} trigger={() => onPageChangeTigger(currentPage)}>
                    {currentPage}
                </PaginationItem>
            )
        }
    }
    let section4 = ''
    if (!case2 && !case1) {
        if (caselastCheck || case3) {
            section4 = (
                <PaginationItem condition={currentPage === lastPage} trigger={() => onPageChangeTigger(lastPage)}>
                    {lastPage}
                </PaginationItem>
            )
        } else {
            section4 = (
                <li className='page-elipses'>
                    <span className='elipses'>...</span>
                </li>   
            )
        }
    }

  return (
    <nav>
        <ul className="pagination flex">
            {   ((!case1 && !case2 && !case3) && (currentPage !== 1)) ? 
                    (<PaginationItem condition={false} trigger={() => onPageChangeTigger(currentPage - 1)}>
                        Prev
                    </PaginationItem>) : ''
            }
            <PaginationItem condition={currentPage === 1} trigger={() => onPageChangeTigger(1)}>
                1
            </PaginationItem>
            {section2}
            {section3}
            {section4}
            {
                (!caselastCheck) ? (
                    <PaginationItem condition={currentPage === lastPage} trigger={() => onPageChangeTigger(lastPage)}>
                        {lastPage}
                    </PaginationItem>
                ) : ''
            }
            {   ((!case1 && !case2 && !case3) && (currentPage !== lastPage)) ?
                    (
                    <PaginationItem condition={false} trigger={() => onPageChangeTigger(currentPage + 1)}>
                        Next
                    </PaginationItem>
                    ) : ''
            }
        </ul>
    </nav>
  );
};

export default Pagination