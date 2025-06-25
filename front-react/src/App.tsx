import React,{useState} from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from 'views/Main';
import Authentication from 'views/Authentication';
import Search from 'views/Search';
import User from 'views/User';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import BaordDetail from 'views/Board/Detail';
import Container from 'layouts/Container';
import { MAIN_PATH, AUTH_PATH, SEARCH_PATH, USER_PATH, BOARD_PATH, BOARD_DETAIL_PATH, BOARD_WRITE_PATH, BOARD_UPDATE_PATH } from 'constant';
import { CookiesProvider } from 'react-cookie';



function App() {
  //const [value,setValue]= useState<string>('');

  return (
    <CookiesProvider>
      <Routes>
        <Route element={<Container/>}>
          <Route path={MAIN_PATH()} element={<Main/>}/>
          <Route path={AUTH_PATH()} element={<Authentication/>}/>
          <Route path={SEARCH_PATH(':searchWord')}  element={<Search/>}/>
          <Route path={USER_PATH(':userEmail')}  element={<User/>}/>
          <Route path={BOARD_PATH()} >
            <Route path={BOARD_WRITE_PATH()}  element={<BoardWrite/>}/>
            <Route path={BOARD_DETAIL_PATH(':boardNumber')}  element={<BaordDetail/>}/>
            <Route path={BOARD_UPDATE_PATH(':boardNumber')}  element={<BoardUpdate/>}/>
          </Route>
        </Route>
        <Route path='*' element={<h1>404 Not Found</h1>}/>
      </Routes>
    </CookiesProvider>
  );
}

export default App;
