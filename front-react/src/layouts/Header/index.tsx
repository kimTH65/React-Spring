import React, { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from 'react'
import './style.css'
import { useNavigate, useParams } from 'react-router-dom'
import { MAIN_PATH, SEARCH_PATH, USER_PATH, AUTH_PATH } from 'constant';
import { useCookies } from 'react-cookie';

export default function Header() {
  const [cookies, setCookie] = useCookies();
  const [isLogin,setLogin] = useState<boolean>(false);
  const navigate = useNavigate();


  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  }
 
  const SearchButton = () => {
    const searchButtonRef = useRef<HTMLDivElement | null>(null);
    const [status, setStatus] = useState<boolean>(false);
    const [word, setWord] = useState<string>('');
    const {searchWord} = useParams();

    useEffect(() => {
      if(searchWord){
        setWord(searchWord);
        setStatus(true);
      }
    }
    , [searchWord]);
    
    const onSearchButtonClickHandler = () => {
      if(!status){
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
    };

    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setWord(value);
    };

    const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
      if (event.key !== 'Enter') return;
      if (!searchButtonRef) return;
      searchButtonRef.current?.click();
    };

    if (!status) 
    return(
      <div className='icon-button' onClick={onSearchButtonClickHandler}>
        <div className='icon search-light-icon'></div>
      </div>
    );
    return(
      <div className='header-search-input-box'>
        <input className='header-search-input' type='text' placeholder='search' value={word} onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeyDownHandler}/>
        <div ref={searchButtonRef} className='icon-button' onClick={onSearchButtonClickHandler}>
          <div className='icon search-light-icon'></div>
        </div>
      </div>
    );
  };

  const LoginMyPageButton = () =>{
    // MyPageButton
    const onMyPageButtonClickHandler = () => {
      navigate(USER_PATH(''));
    };
    // LoginButton
    const onSignInButtonClickHandler = () => {
      navigate(AUTH_PATH());
    };

    if (isLogin) {
      return <div className='white-button'>{'MyPage'}</div>;
    }
    else{
      return <div className='black-button'>{'Login'}</div>
    }
  };

  return(
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-dark-icon'></div>
          </div>
          <div className='header-logo'>{'test board'}</div> 
        </div>
        <div className='header-right-box'>
          <SearchButton/>  
          <LoginMyPageButton/>
        </div> 
      </div>
    </div>
  );
}
