import React, { useState } from "react";
import styles from './FavoritesView.module.scss';
import FilterableFavoritesCatalog from "../Catalog/FilterableFavoritesCatalog";
import { useToast } from "../../../context/ToastContext";
import { useUser } from "../../../context/UserContext";
const FavoritesView: React.FC = () => {
  const { favoriteBooks, clearFavorites } = useUser();
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const handleClearFavorites = () => {
    clearFavorites();
    addToast("All favorites have been cleared", "warning");
    setIsEditing(false);
  };

  return (
    <div className={styles.favoritesViewContainer}>
      <div className={styles.favoritesHeader}>
        <h2 className={styles.pageTitle}>Your Favorite Books</h2>
        <div className={styles.actionButtons}>
          <button 
            className={`${styles.actionButton} ${styles.editButton}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Done" : "Edit"}
          </button>
          {isEditing && (
            <button 
              className={`${styles.actionButton} ${styles.clearButton}`}
              onClick={handleClearFavorites}
            >
              Clear All
            </button>
          )}
        </div>
      
      </div>
      {favoriteBooks.length === 0 ? (
        <div className={styles.emptyFavoritesMessage}>
          You haven't added any books to your favorites yet.
          Start exploring the catalog to add your first favorite!
        </div>
      ) : (
        <FilterableFavoritesCatalog isEditing={isEditing} />
      )}
    </div>
  );
};

export default FavoritesView;