import React, { useState } from "react";
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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-4">
          {activeTab === "login" ? (
            <LoginComponent onTabChange={setActiveTab} />
          ) : (
            <RegisterComponent onTabChange={setActiveTab} />
          )}
          <div className="text-center">
            <button 
              onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")}
              className="text-blue-600 hover:underline"
            >
              {activeTab === "login" 
                ? "Need an account? Register" 
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button 
            onClick={() => setActiveTab("catalog")}
            className={`px-4 py-2 ${activeTab === "catalog" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Catalog
          </button>
          <button 
            onClick={() => setActiveTab("favorites")}
            className={`px-4 py-2 ${activeTab === "favorites" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Favorites
          </button>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex-grow">
        {activeTab === "catalog" ? <CatalogTab /> : <FavoritesTab />}
      </div>
    </div>
  );
};

export default TabViewManager;