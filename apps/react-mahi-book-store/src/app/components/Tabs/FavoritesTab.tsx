import React from "react";
import styles from './FavoritesTab.module.scss';
import FavoritesView from "../Favorites-Catalog-View/FavoritesView";

const FavoritesTab: React.FC = () => {
  return (
    <div className={styles.catalogContainer}>
      <FavoritesView />
    </div>
  );
};

export default FavoritesTab;