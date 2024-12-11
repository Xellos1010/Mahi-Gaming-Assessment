import React, { useState } from 'react';
import BookMoreInfo from './BookMoreInfo';
import { BookInfoProps } from './BookInfoInterfaces';

const BookRowData: React.FC<BookInfoProps> = ({ book }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div onClick={() => setIsExpanded(!isExpanded)} style={{ cursor: 'pointer', margin: '10px 0' }}>
      <div>
        <strong>{book.title}</strong> by {book.author}
      </div>
      {isExpanded && <BookMoreInfo book={book} />}
    </div>
  );
};

export default BookRowData;