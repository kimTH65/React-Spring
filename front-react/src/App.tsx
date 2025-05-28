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

function App() {
  //const [value,setValue]= useState<string>('');

  return (
    <>
    <Footer/>
    </>
  );
}

export default App;
