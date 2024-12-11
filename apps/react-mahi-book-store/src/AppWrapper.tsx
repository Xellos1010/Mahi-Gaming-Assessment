import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { BooksProvider } from "./context/BooksContext";
import App from "./app/app";


const ProtectedApp: React.FC = () => {
  const { isAuthenticated, login } = useAuth();

  if (!isAuthenticated) {
    return (
      <div>
        <h2>Please Login to Continue</h2>
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <BooksProvider>
      <App />
    </BooksProvider>
  );
};

const AppWrapper: React.FC = () => (
  <AuthProvider>
    <ProtectedApp />
  </AuthProvider>
);

export default AppWrapper;
