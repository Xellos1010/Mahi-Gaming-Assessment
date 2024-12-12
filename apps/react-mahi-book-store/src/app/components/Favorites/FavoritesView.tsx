import React, { useState } from "react";
import FilterableFavoritesCatalog from "./FilterableFavoritesCatalog";

const FavoritesView: React.FC = () => {
  return (
    <div>
      <h2>Your Favorite Books</h2>
      <FilterableFavoritesCatalog />
    </div>
  );
};

export default FavoritesView;