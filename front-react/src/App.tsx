import React,{useState} from 'react';
import './App.css';
import BoardItem from 'components/BoardItem';
import latestBoardListMock from 'mocks/latest-board-list.mock';
import top3BoardList from 'mocks/top-3-board-list.mock';
import top3BoardListMock from 'mocks/top-3-board-list.mock';
import Top3Item from 'components/Top3Item';
import CommentItem from 'components/CommentItem';
import commentListMock from 'mocks/comment-list.mock';
import favoriteListMock from 'mocks/favorite-list.mock';
import FavofiteItem from 'components/FavoriteItem';
import InputBox from 'components/InputBox';
import Footer from 'layouts/Footer';
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



function App() {
  //const [value,setValue]= useState<string>('');

  return (
    <Routes>
      <Route element={<Container/>}>
        <Route path={MAIN_PATH()} element={<Main/>}/>
        <Route path={AUTH_PATH()}  element={<Authentication/>}/>
        <Route path={SEARCH_PATH(':searchWord')}  element={<Search/>}/>
        <Route path={USER_PATH(':userEmail')}  element={<User/>}/>
        <Route path={BOARD_PATH()}  element={<Main/>}>
          <Route path={BOARD_DETAIL_PATH(':boardNumber')}  element={<BoardWrite/>}/>
          <Route path={BOARD_WRITE_PATH()}  element={<BaordDetail/>}/>
          <Route path={BOARD_UPDATE_PATH(':boardNumber')}  element={<BoardUpdate/>}/>
        </Route>
      </Route>
      <Route path='*' element={<h1>404 Not Found</h1>}/>
    </Routes>
  );
}

export default App;
