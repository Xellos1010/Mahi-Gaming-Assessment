import React from "react";
import styles from './FavoritesTab.module.scss';
import FilterableFavoritesCatalog from "../Catalog/FilterableFavoritesCatalog";

const FavoritesTab: React.FC = () => {
  return (
    <div className={styles.favoritesContainer}>
      <h2 className={styles.favoritesHeader}>Your Favorite Books</h2>
      <FilterableFavoritesCatalog />
    </div>
  );
};

export default FavoritesTab;