import React, { useState,KeyboardEvent, useRef } from 'react'
import './style.css'
import InputBox from 'components/InputBox';

export default function Authentication() {

    const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
    
    const SignInCard = () => {
      const emailRef = useRef<HTMLInputElement | null>(null);

      const passwordRef = useRef<HTMLInputElement | null>(null);
      // state: email
      const [email, setEmail] = useState<string>('');

      // state: password
      const [password, setPassword] = useState<string>('');

      // state: password input type
      const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');

      // state: error status
      const [error, setError] = useState<boolean>(false);
      
      // state: password button icon state
      const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');

      const onPasswordButtonClickHandler = () => {
        if (passwordType ==='text'){
          setPasswordType('password');
          setPasswordButtonIcon('eye-light-off-icon')
        }else{
          setPasswordType('text');
          setPasswordButtonIcon('eye-light-on-icon')
        }
      } 
      const onSignInButtonClickHandler = () => {

      }
      const onEmailKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
        if (event.key !=='Enter')return;
        if (!passwordRef.current)return;
        passwordRef.current.focus();
      } 
      const onPasswordKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
        if (event.key !=='Enter')return;
        onSignInButtonClickHandler();
      } 
      
      return (
        <div className='auth-card'>
          <div className='auth-card-box'>
            <div className='auth-card-top'>
              <div className='auth-card-title-box'>
                <div className='auth-card-title'>{'Login'}</div>
              </div>
              <InputBox ref={emailRef} label='Email Address' type='text' placeholder='Please enter your email address.' error={error} value={email} setValue={setEmail} onKeyDown={onEmailKeyDownHandler}/>
              <InputBox ref={passwordRef} label='Password' type={passwordType} placeholder='Please enter your password.' error={error} value={password} setValue={setPassword} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
            </div>
            <div className='auth-card-bottom'>
              <div className='auth-sign-in-error-box'>
                <div className='auth-sign-in-error-message'>
                  {'The email address or password you entered is incorrect.\nPlease check your input and try again.'}
                </div>
              </div>
              <div className='black-large-full-button' onClick={onSignInButtonClickHandler}>{'Login'}</div>
              <div className='auth-description-box'>
                <div className='auth-description'>{'New user?'}<span className='auth-description-link'>{'Sign up here'}</span></div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const SignUpCard = () => {
        return(
            <div className='auth-card'></div>
        );
    }

    return (
    <div id='auth-wrapper'>
      <div className='auth-container'>
        <div className='auth-jumbotron-box'>
          <div className='auth-jumbotron-contents'>
            <div className='auth-logo-icon'></div>
            <div className='auth-jumbotron-text-box'>
              <div className='auth-jumbotron-text'>{'Hello.'}</div>
              <div className='auth-jumbotron-text'>{'Kims Board '}</div>
            </div>
          </div>
        </div>
        {view === 'sign-in' && <SignInCard/>}
        {view === 'sign-up' && <SignUpCard/>}
      </div>
    </div>
  );
}
