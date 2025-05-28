import React from 'react'
import './style.css'

export default function Footer() {

    const onInstaButtonClickHandler = () => {
        window.open('https://www.instagram.com');
    }

    const onINaverButtonClickHandler = () => {
        window.open('https://www.Naver.com');
    }

    return (
        <div id='footer'>
            <div className='footer-container'>
                <div className='footer-top'>
                    <div className='footer-logo-box'>
                        <div className='icon-box'>
                            <div className='icon logo-light-icon'></div>
                        </div>
                        <div className='footer-logo-text'>{'Kims Board'}</div>
                    </div>
                    <div className='footer-link-box'>
                        <div className='footer-email-link'>{'xogns6515@gmail.com'}</div>
                        <div className='icon-button' onClick={onInstaButtonClickHandler}>
                            <div className='icon insta-icon'></div>
                        </div>
                        <div className='icon-button' onClick={onINaverButtonClickHandler}>
                            <div className='icon naver-blog-icon'></div>
                        </div>
                    </div>
                </div>
                <div className='footer-botton'>
                    <div className='footer-copyright'>{'Copyright © 2025 KIMS. All rights reserved.'}</div>
                </div>
            </div>
        </div>
    )
}
