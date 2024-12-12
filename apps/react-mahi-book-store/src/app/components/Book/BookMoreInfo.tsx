import { BookInfoProps } from "./BookInfoInterfaces";

const BookMoreInfo: React.FC<BookInfoProps> = ({ book }) => {
    return (
        <div style={{ padding: '10px', border: '1px solid #ccc', marginTop: '5px' }}>
            {book.imageId ? (
                <img src={book.imageId} alt={`${book.title} cover`} style={{ maxWidth: '100px', marginBottom: '10px' }} />
            ) : (
                <div style={{ width: '100px', height: '150px', backgroundColor: '#eee', marginBottom: '10px' }} />
            )}
            <p>{book.description || 'No description available.'}</p>
        </div>
    );
};

export default BookMoreInfo;