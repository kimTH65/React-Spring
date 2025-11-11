import React, { useState,KeyboardEvent, useRef, ChangeEvent } from 'react'
import './style.css'
import InputBox from 'components/InputBox';
import { signInRequest, signUpRequest } from 'apis';
import { SignInRequestDto, SignUpRequestDto } from 'apis/request/auth';
import { SignInResponseDto, SignUpResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';
import { text } from 'stream/consumers';

export default function Authentication() {

    const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
    
    const [cookies, setCookie] = useCookies();

    const SignInCard = () => {
      const emailRef = useRef<HTMLInputElement | null>(null);

      const passwordRef = useRef<HTMLInputElement | null>(null);

      const navigator = useNavigate();
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

      const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) =>{
        if(!responseBody){
          alert('netwark error');
          return;
        }
        const {code} = responseBody;
        if (code === 'DBE') alert('DB Error');
        if (code === 'SF' || code === 'VF') setError(true);
        if (code !== 'SU') return;

        const {token,expirationTime} = responseBody as SignInResponseDto;
        const now = new Date().getTime();
        const expires = new Date(now + expirationTime * 1000);

        setCookie('accessToken', token , {expires, path: MAIN_PATH()});
        navigator(MAIN_PATH());
      }
      const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        const {value} = event.target;
        setEmail(value);
      }
      const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        const {value} = event.target;
        setPassword(value);
      }
      const onSignInButtonClickHandler = () => {
        const requestBody: SignInRequestDto = {email,password};
        signInRequest(requestBody).then(signInResponse);
      }

      const onSignUpLinkClickHandler = () => {
        setView('sign-up');
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
              <InputBox ref={emailRef} label='Email Address' type='text' placeholder='Please enter your email address.' error={error} value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler}/>
              <InputBox ref={passwordRef} label='Password' type={passwordType} placeholder='Please enter your password.' error={error} value={password} onChange={onPasswordChangeHandler} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
            </div>
            <div className='auth-card-bottom'>
              {error &&
              <div className='auth-sign-in-error-box'>
                <div className='auth-sign-in-error-message'>
                  {'The email address or password you entered is incorrect.\nPlease check your input and try again.'}
                </div>
              </div>
              }
              <div className='black-large-full-button' onClick={onSignInButtonClickHandler}>{'Login'}</div>
              <div className='auth-description-box'>
                <div className='auth-description'>{'New user? '}<span className='auth-description-link' onClick={onSignUpLinkClickHandler}>{' Sign up here'}</span></div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const SignUpCard = () => {
      const [page, setPage] = useState<1 | 2>(1);

      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [passwordCheck, setPasswordCheck] = useState('');
      const [nickname, setNickname] = useState('');
      const [telNumber, setTelNumber] = useState('');
      const [address, setAddress] = useState('');
      const [addressDetail, setAddressDetail] = useState('');
      const [agreedPersonal, setAgreedPersonal] = useState(false);
      const [error, setError] = useState('');

      const navigator = useNavigate();

      const onNextClick = () => {
        if (!email || !password || !passwordCheck || !nickname) {
          setError('Please fill all fields.');
          return;
        }
        if (password !== passwordCheck) {
          setError('Passwords do not match.');
          return;
        }
        setPage(2);
        setError('');
      };

      const onNextButtonClick = () => {
        if (!email || !password || !passwordCheck) {
          setError('Please fill all fields.');
          return;
        }
        if (password !== passwordCheck) {
          setError('Passwords do not match.');
          return;
        }
        setPage(2);
      };

    const onBackButtonClick = () => {
      setPage(1);
    };

    const onSignUpButtonClick = () => {
      if (!nickname) {
        setError('Please enter your nickname.');
        return;
      }

      const requestBody: SignUpRequestDto = {
        email,
        password,
        nickname,
        telNumber,
        address,
        addressDetail,
        agreedPersonal
      };
      signUpRequest(requestBody).then((responseBody: SignUpResponseDto | ResponseDto | null) => {
        if (!responseBody) {
          alert('Network error');
          return;
        }
        const { code } = responseBody;
        if (code === 'DBE') alert('DB Error');
        if (code === 'VF') setError('Invalid input.');
        if (code === 'DE') setError('Email already registered.');
        if (code !== 'SU') return;

        alert('Sign up completed! Please log in.');
        setView('sign-in');
      });
    };

    return (
      <div className='auth-card'>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'Sign Up'}</div>
              <div className='auth-card-page'>{page === 1 ? '1/2' : '2/2'}</div>
            </div>

            {page === 1 && (
              <>
                <InputBox type='text' label='Email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} error={false} />
                <InputBox type='password' label='Password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} error={false} />
                <InputBox type='password' label='Confirm Password' placeholder='Re-enter your password' value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} error={false} />
                
              </>
            )}

            {page === 2 && (
              <>
                <InputBox type='text' label='Nickname' placeholder='Enter your nickname' value={nickname} onChange={(e) => setNickname(e.target.value)} error={false} />
                <InputBox type='text' label='Phone Number' placeholder='Enter your phone number' value={telNumber} onChange={(e) => setTelNumber(e.target.value)} error={false} />
                <InputBox type='text' label='Address' placeholder='Enter your address' value={address} onChange={(e) => setAddress(e.target.value)} error={false} />
                <InputBox type='text' label='Address Detail' placeholder='Enter detail (optional)' value={addressDetail} onChange={(e) => setAddressDetail(e.target.value)} error={false} />

                <div className='auth-checkbox'>
                  <input
                    id='agree-personal'
                    type='checkbox'
                    checked={agreedPersonal}
                    onChange={(e) => setAgreedPersonal(e.target.checked)}
                  />
                  <label htmlFor='agree-personal'>{'Agree to policy'}</label>
                  <div className='more-link' >
                    {'See more'} {/* or 'See more' */}
                  </div>
                </div>
                
              </>
            )}
          </div>

          <div className='auth-card-bottom'>
            {error && (
              <div className='auth-sign-in-error-box'>
                <div className='auth-sign-in-error-message'>{error}</div>
              </div>
            )}

            {page === 1 && <div className='black-large-full-button' onClick={onNextButtonClick}>{'Next'}</div>}
            {page === 2 && (
              <div className='auth-sign-up-button-box'>
                <div className='black-small-full-button' onClick={onBackButtonClick}>{'Back'}</div>
                <div className='black-small-full-button' onClick={onSignUpButtonClick}>{'Sign Up'}</div>
              </div>
            )}

            <div className='auth-description-box'>
              <div className='auth-description'>
                {'Do you have an account? '}
                <span className='auth-description-link' onClick={() => setView('sign-in')}>
                  {'Sign in here'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
