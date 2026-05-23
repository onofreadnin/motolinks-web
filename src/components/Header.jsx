import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Platform' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/data-deletion', label: 'Data Deletion' },
  { to: '/contact', label: 'Support / Contact' },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header__inner">
        <NavLink to="/" className="brand" aria-label="MotoLinks home">
          <img
            className="brand__mark"
            src="/brand/motolinks-icon.png"
            alt=""
            aria-hidden="true"
          />
          <span className="brand__text">MotoLinks</span>
        </NavLink>

        <nav className="nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'nav__link nav__link--active' : 'nav__link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a className="header__cta" href="mailto:support@motolinks.app">
          Partner with us
        </a>
      </div>
    </header>
  );
}
