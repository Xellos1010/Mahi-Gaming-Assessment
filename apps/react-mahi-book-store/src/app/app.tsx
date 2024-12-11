// Uncomment this line to use CSS modules
// import styles from './app.module.scss';
import FilterableBooksCatalog from './FilterableBooksCatalog';
import mockBooks from '../data/mockBooks'; //Temporary for Static Mock Prototype
// import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div>
      {/* <NxWelcome title="react-mahi-book-store" /> */}
      <FilterableBooksCatalog books={mockBooks}/>
    </div>
  );
}

export default App;


