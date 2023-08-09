import React, { useState } from 'react';
import './HamburgerMenu.css'; // You can style the menu in this CSS file

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
      <button className="menu-toggle" onClick={toggleMenu}>
        ...
      </button>
      {isOpen && (
        <div className="menu-options">
          <button className="menu-option">Option 1</button>
          <button className="menu-option">Option 2</button>
          <button className="menu-option">Option 3</button>
          <button className="menu-option">Option 4</button>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
