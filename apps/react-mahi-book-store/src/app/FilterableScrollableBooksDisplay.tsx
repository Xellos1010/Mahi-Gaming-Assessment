import React from 'react';
import BookRowData from './BookRowData';
import { BooksInfoProps } from './BookInfoInterfaces';

const FilterableScrollableBooksDisplay: React.FC<BooksInfoProps> = ({ books }) => {
    return (
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {books.length > 0 ? (
                books.map((book) => <BookRowData key={book.id} book={book} />)
            ) : (
                <div style={{ textAlign: 'center', padding: '10px', color: '#888' }}>
                    No Results Found
                </div>
            )}
        </div>
    );
};

export default FilterableScrollableBooksDisplay;