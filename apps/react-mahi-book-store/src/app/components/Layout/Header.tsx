import React from "react";
import styles from './Header.module.scss';
import ToastContainer from '../Toast/ToastContainer';
interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>{title}</h1>
      <ToastContainer /> {/* I want notifications to persist in the header. For now we do not have a header tab navigation bar, this may be changed in future implementations.12/12/24 @ 8:00pm*/}
    </header>
  );
};

export default Header;