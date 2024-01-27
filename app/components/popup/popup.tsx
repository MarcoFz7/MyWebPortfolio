import React, { useState, useEffect } from 'react';
import './popup.css';
import { FaInfoCircle } from "react-icons/fa";

interface PopupProps {
    popupDisplay: string;
    popupType: string; //info, warning and error
    popupMessage: React.ReactNode;
    resetPopup: () => void;
}

export default function Popup({ popupDisplay, popupType, popupMessage, resetPopup}: PopupProps) {
    const [display, setDisplay] = useState(popupDisplay);

    useEffect(() => {
        setDisplay(popupDisplay);

        // Set timeout if the popup is displayed
        let timeoutId: NodeJS.Timeout | null = null;
        if (popupDisplay === 'flex') {
            timeoutId = setTimeout(() => {
                resetPopup();
            }, 3000);
        }

        return () => {
            // Clear timeout when the component unmounts
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [popupDisplay, resetPopup, popupMessage]);

    const handleClosePopup = () => {
        resetPopup();
    };

    return (
        <div className='popup-body' style={{display: display}}>
            {popupType === "info" && (
                <div className='popup-content'>
                    <div onClick={handleClosePopup}>
                        <FaInfoCircle/>
                    </div>
                    <span className='popup-message'>{popupMessage}</span>
                </div>
            )}

            {/* Add more conditions for other popup types as needed */}       
        </div>
    )
}