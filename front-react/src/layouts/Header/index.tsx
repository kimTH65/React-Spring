import React, { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from 'react'
import './style.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { MAIN_PATH, SEARCH_PATH, USER_PATH, AUTH_PATH, BOARD_DETAIL_PATH, BOARD_WRITE_PATH, BOARD_PATH, BOARD_UPDATE_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useBoardStore, useLoginUserStore } from 'stores';
import BaordDetail from 'views/Board/Detail';

export default function Header() {

  const {loginUser,setLoginUser,resetLoginUser} = useLoginUserStore();
  const {pathname} = useLocation();
  const [cookies, setCookie] = useCookies();
  const [isLogin,setLogin] = useState<boolean>(false);
  const [isAuthPage,setAuthPage] = useState<boolean>(false);
  const [isMainPage,setMainPage] = useState<boolean>(false);
  const [isSearchPage,setSearchPage] = useState<boolean>(false);
  const [isBoardDetailPage,setBoardDetailPage] = useState<boolean>(false);
  const [isBoardWritePage,setBoardWritePage] = useState<boolean>(false);
  const [isBoardUpdatePage,setBoardUpdatePage] = useState<boolean>(false);
  const [isUserPage,setUserPage] = useState<boolean>(false);

  
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

  const MyPageButton = () =>{

    const{userEmail} = useParams();

    // MyPageButton
    const onMyPageButtonClickHandler = () => {
      if (!loginUser) return ;
      const {email} = loginUser;
      navigate(USER_PATH(''));
    };
    // LoginButton
    const onSignInButtonClickHandler = () => {
      navigate(AUTH_PATH());
    };

    // LogoutButton
    const onSignOutButtonClickHandler = () => {
      resetLoginUser();
      navigate(MAIN_PATH());
    };
    if (isLogin && userEmail === loginUser?.email){
      return <div className='black-button'>{'Logout'}</div>
    }
    if (isLogin) {
      return <div className='white-button'>{'MyPage'}</div>;
    }
    else{
      return <div className='black-button'>{'Login'}</div>
    }
  };

  const UploadButton = () => {
    const {title,content,boardImageFileList,resetBoard} = useBoardStore(); 
    const onSignInButtonClickHandler = () =>{

    };
    if(!title && content){
      return <div className='black-button' onClick={onSignInButtonClickHandler}>{'Upload'}</div>
    }
    return <div className='disable-button'>{'Upload'}</div>
  };
  
  useEffect(() =>{
    const isAuthPage = pathname.startsWith(AUTH_PATH());
    setAuthPage(isAuthPage);
    const isMainPage = pathname === MAIN_PATH();
    setMainPage(isMainPage);
    const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
    setSearchPage(isSearchPage);
    const isBoardDetailPage = pathname.startsWith(BOARD_PATH()+'/'+BOARD_DETAIL_PATH(''));
    setBoardDetailPage(isBoardDetailPage);
    const isBoardWritePage = pathname.startsWith(BOARD_PATH()+'/'+BOARD_WRITE_PATH());
    setBoardWritePage(isBoardWritePage);
    const isBoardUpdatePage = pathname.startsWith(BOARD_PATH()+'/'+BOARD_UPDATE_PATH(''));
    setBoardUpdatePage(isBoardUpdatePage);
    const isUserPage = pathname.startsWith(USER_PATH(''));
    setUserPage(isUserPage);
  },[pathname]);

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
          {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && <SearchButton/>} 
          {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && <MyPageButton/>}
          {(isBoardWritePage || isBoardUpdatePage) && <UploadButton/>}
        </div> 
      </div>
    </div>
  );
}

