import React from 'react';
import styles from './FilterableScrollableBooksDisplay.module.scss';
import BookRowData from '../Book/BookRowData';
import { BooksInfoProps } from '../Book/BookInfoInterfaces';

interface FilterableScrollableBooksDisplayProps extends BooksInfoProps {
    isEditing?: boolean;
    onRemoveFavorite?: (bookId: number) => void;
}

const FilterableScrollableBooksDisplay: React.FC<FilterableScrollableBooksDisplayProps> = ({ books, isEditing, onRemoveFavorite }) => {
    return (
        <div className={styles.booksContainer}>
            {books.length > 0 ? (
                books.map((book) => (
                    <div key={book.id} className={styles.bookItem}>
                        <BookRowData book={book} />
                        {isEditing && onRemoveFavorite && (
                            <button className={styles.removeButton} onClick={() => onRemoveFavorite(book.id)}>
                                Remove
                            </button>
                        )}
                    </div>
                ))
            ) : (
                <div className={styles.noResults}>No Results Found</div>
            )}
        </div>
    );
};

export default FilterableScrollableBooksDisplay;