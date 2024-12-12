import React from "react";
import styles from './Footer.module.scss';

interface FooterProps {
  copyright: string;
}

const Footer: React.FC<FooterProps> = ({ copyright }) => {
  return (
    <footer className={styles.footer}>
      <p>{copyright}</p>
    </footer>
  );
};

export default Footer;