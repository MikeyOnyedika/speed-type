import React from 'react';
import './styles.css'

const Header = () => {
    return (
        <header>
            <div className="logo-container">
                <div className="logo">
                    <div className="fast-icon">
                        <div className='part fast-top'></div>
                        <div className='part fast-mid'></div>
                        <div className='part fast-bot'></div>
                    </div>
                    <span className='h1 logo-text'><i>Speed Type</i></span>
                </div>
            </div>
        </header>
    );
};

export default Header;
