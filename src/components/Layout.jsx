import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="app-container">
      <Header />
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
}
