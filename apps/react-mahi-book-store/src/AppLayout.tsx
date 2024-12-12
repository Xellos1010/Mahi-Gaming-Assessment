import React from "react";
import styles from './AppLayout.module.scss';
import { ToastProvider } from "./context/ToastContext";
import TabViewManager from "./app/components/Tabs/TabViewManager";
import { BooksProvider } from "./context/BooksContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import ToastContainer from "./app/components/Toast/ToastContainer";
import { UserProvider } from "./context/UserContext";

const AppLayout: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <Header title="Mahi Book Store" />

      <main className={styles.mainContent}>
        <ToastProvider>
          <BooksProvider>
            <UserProvider>
              <AuthProvider>
                <TabViewManager />
              </AuthProvider>
            </UserProvider>
          </BooksProvider>
          <ToastContainer />
        </ToastProvider>
      </main>

      <Footer copyright="© 2024 Mahi Book Store. All Rights Reserved." />
    </div>
  );
};

export default AppLayout;