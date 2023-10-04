import React from 'react';
import './paginator.css';

export const Paginator = ({itemPerPage, totalItems, paginate, previousPage, nextPage, currentPage}) => {
    const pageNumbers: number[] = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container">
            <ul className="pagination">
                <li onClick={previousPage} className="page-number">
                    Prev
                </li>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        onClick={() => paginate(number)}
                        className={currentPage === number ? 'page-number active' : 'page-number'}
                    >
                        {number}
                    </li>
                ))}
                <li onClick={nextPage} className="page-number">
                    Next
                </li>
            </ul>

        </div>

    );
};
