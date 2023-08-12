import React, { useEffect, useRef, useState } from 'react';
import './HamburgerMenu.css'; // You can style the menu in this CSS file
import { IssueItem } from '@/types';

export interface Option {
    name: string,
    callback: (issue: IssueItem) => void,
}
interface HamburgerMenuProps {
    options: Option[],
    issue: IssueItem,
}
const HamburgerMenu = ({ options, issue }: HamburgerMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null); // Create a ref for the menu container

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        // Add event listener to listen for clicks on the document
        const handleOutsideClick = (event: MouseEvent) => {
            if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} ref={menuRef}>
            <button className="menu-toggle" onClick={toggleMenu}>
                ...
            </button>
            {isOpen && (
                <div className="menu-options">
                    {options.map((option: Option) => (
                        <button className="menu-option" onClick={() => option.callback(issue)}>{option.name}</button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;
