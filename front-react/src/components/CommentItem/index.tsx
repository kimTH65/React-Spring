import React from 'react'
import './style.css';
import {CommentListItem}  from 'types/interface';
import defaultProfileImage from 'assets/image/default-profile-image.png'

interface Props {
    commentListItem : CommentListItem
}

export default function CommentItem({commentListItem}:Props)  {
    
    const {nickname,profileImage,content,writeDatetime} = commentListItem;
    
    return (
        <div className='board-list-item' >
            <div className='board-list-item-top'>
                <div className='board-list-item-profile-box'>
                    <div className='board-list-item-profile-image' style={{backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
                </div>
                <div className='board-list-item-nickname'>{nickname}</div>
                <div className='board-list-item-divider'>{'\|'}</div>
                <div className='board-list-item-time'>{writeDatetime}</div>
            </div>
            <div className='comment-list-item-main'>
                <div className='board-list-item-content'>{content}</div>
            </div>
        </div>
    )
}
