
interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

  import React, { useState } from 'react';

// Define the confirmation modal component
export const ConfirmationModal = ({ isOpen, onClose, onConfirm }:ConfirmationModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div
          style={{
            padding: '20px',
          }}
        >
          <p>ยืนยันเซฟการแก้ไข</p>
          <button onClick={onConfirm}>ยืนยัน</button>
          <button onClick={onClose}>ยกเลิก</button>
        </div>
      </div>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
        onClick={onClose}
      ></div>
    </div>
  );
};