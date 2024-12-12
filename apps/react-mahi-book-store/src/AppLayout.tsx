import React from "react";
import { ToastProvider } from "./context/ToastContext";
import AppWrapper from "./AppWrapper";
import TabViewManager from "./app/components/Tabs/TabViewManager";
import { BooksProvider } from "./context/BooksContext";
import { AuthProvider } from "./context/AuthContext";

const AppLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <header className="bg-blue-600 text-white p-4 text-center">
                <h1 className="text-2xl font-bold">Mahi Book Store</h1>
            </header>

            <main className="flex-grow flex flex-col p-4">
                <ToastProvider>
                    <BooksProvider>
                        <AuthProvider>

                            <main className="flex-grow flex flex-col p-4">
                                <TabViewManager />
                            </main>
                            {/* <AppWrapper /> */}
                        </AuthProvider>
                    </BooksProvider>
                </ToastProvider>
            </main>

            <footer className="bg-gray-200 p-4 text-center">
                <p>© 2024 Mahi Book Store. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default AppLayout;