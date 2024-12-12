import React, { useState } from "react";
import styles from './TabViewManager.module.scss';
import CatalogTab from "./CatalogTab";
import FavoritesTab from "./FavoritesTab";
import RegisterComponent from "../Auth/RegisterComponent";
import { useToast } from "@frontend/context/ToastContext";
import { useAuth } from "@frontend/context/AuthContext";
import LoginComponent from "../Auth/LoginComponent";

const TabViewManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"catalog" | "favorites" | "login" | "register">("catalog");
  const { isAuthenticated, logout } = useAuth();
  const { addToast } = useToast();

  const handleLogout = () => {
    logout();
    addToast("Successfully logged out", "success");
  };

  if (!isAuthenticated) {
    return (
      <div className={`${styles.unauthenticatedContainer}`}>
        <div className={`${styles.unauthenticatedContent}`}>
          {activeTab === "login" || activeTab === "catalog" ? (
            <LoginComponent onTabChange={setActiveTab} />
          ) : (
            <RegisterComponent onTabChange={setActiveTab} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.tabContainer} overflow-hidden`}>
      <div className={styles.tabHeader}>
        <div className={styles.tabButtons}>
          <button
            onClick={() => setActiveTab("catalog")}
            className={`${styles.tabButton} ${activeTab === "catalog" ? styles.active : styles.inactive}`}
          >
            Catalog
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`${styles.tabButton} ${activeTab === "favorites" ? styles.active : styles.inactive}`}
          >
            Favorites
          </button>
        </div>
        <button
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          Logout
        </button>
      </div>
      <div className={`${styles.tabContent} overflow-hidden`}>
        {activeTab === "catalog" ? <CatalogTab /> : <FavoritesTab />}
      </div>
    </div>
  );
};

export default TabViewManager;