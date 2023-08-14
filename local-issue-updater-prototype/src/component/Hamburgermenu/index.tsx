import React, { useEffect, useRef, useState } from 'react';
import './Hamburgermenu.css'; // You can style the menu in this CSS file
import { IssueItem } from '@/types';

export interface Option {
    name: string,
    callback: (issue: IssueItem) => void,
}
interface HamburgerMenuProps {
    options: Option[],
    issue: IssueItem,
    onClose: () => void,
}
const HamburgerMenu = ({ options, issue, onClose }: HamburgerMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null); // Create a ref for the menu container

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        if (!isOpen) {
            onClose();
        }
    }, [isOpen])

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
                <svg xmlns="http://www.w3.org/2000/svg" width="3" height="12" viewBox="0 0 3 12" fill="none">
                    <ellipse cx="1.45914" cy="1.38462" rx="1.45914" ry="1.38462" fill="#4F4F4F" />
                    <ellipse cx="1.45914" cy="6.00009" rx="1.45914" ry="1.38462" fill="#4F4F4F" />
                    <ellipse cx="1.45914" cy="10.6153" rx="1.45914" ry="1.38462" fill="#4F4F4F" />
                </svg>
            </button>
            {isOpen && (
                <div className="menu-options">
                    {options.map((option: Option, idx: number) => (
                        <button key={idx} className="menu-option" onClick={() => option.callback(issue)}>{option.name}</button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;
