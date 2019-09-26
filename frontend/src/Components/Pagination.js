import React from 'react'

export const Pagination = props => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.count / props.Pagesize); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => props.handlePagination(number)} href='#' className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
