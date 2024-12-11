// Uncomment this line to use CSS modules
// import styles from './app.module.scss';
import FilterableBooksCatalog from './FilterableBooksCatalog';
import useMockBooks from '../hooks/useMockBooks';

export function App() {
  const { books, isLoading } = useMockBooks();

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      {/* <NxWelcome title="react-mahi-book-store" /> */}
      <FilterableBooksCatalog books={books}/>
    </div>
  );
}

export default App;


