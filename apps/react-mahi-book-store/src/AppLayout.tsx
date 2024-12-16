// apps/react-mahi-book-store/src/AppLayout.tsx
import React, { useEffect } from "react";
import styles from './AppLayout.module.scss';
import { ToastProvider } from "./context/ToastContext";
import TabViewManager from "./app/components/Tabs/TabViewManager";
import { BooksProvider } from "./context/BooksContext";
import { useAuth } from "./context/AuthContext";
import Header from "./app/components/Layout/Header";
import Footer from "./app/components/Layout/Footer";
import { UserProvider } from "./context/UserContext";

const AppLayout: React.FC = () => {
  const { user } = useAuth();
  // UseEffect that runs once when the component mounts.
  useEffect(() => {
    // Set the overflow to hidden
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.margin = '0';

    // Cleanup function to revert the body style if necessary.
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.margin = '0';
    };
  }, []); // Empty dependency array to run only once on mount
  return (
    <div className={styles.appContainer}>

      <ToastProvider>
        <Header title="Mahi Book Store" />
        <main className={styles.mainContent}>
          <UserProvider
            dependencies={{
              // Provide a method to get current user ID
              getCurrentUserId: () => {
                console.log(user);
                return user?.id ?? null;
              },

              // Optional: Add custom unauthorized handling
              onUnauthorized: () => {
                // Example: Redirect to login page
                // router.push('/login');

                // Or open a login modal
                // openLoginModal();
              }
            }}
          >
            <BooksProvider>
              <TabViewManager />
            </BooksProvider>
          </UserProvider>
        </main>
      </ToastProvider>

      <Footer copyright="© 2024 Mahi Book Store. All Rights Reserved." />
    </div>
  );
};

export default AppLayout;