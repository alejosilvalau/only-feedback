import { useState } from "react";
import Replies from "../Replies/Replies";
import ReplyBox from "../ReplyBox/ReplyBox";


export default function Comment({ item, parentID }) {
  const [isReplyActive, setIsReplyActive] = useState(false);
  const [replyingTo, setReplyingTo] = useState('');

  const reply = (name) => {
    setIsReplyActive(true);
    setReplyingTo(name);
  };

  return (
    <>
      <div className="comments">
        <img src={item.user.image} alt="" />
        <div className="user-comment-container">
          <h2>{item.user.name}</h2>
          <p className="username">@{item.user.username}</p>
          <p className="user-comment">{item.content}</p>
        </div>
        <button className="reply-btn" onClick={() => reply(item.user.username)}>
          Reply
        </button>
      </div>
      {item.replies.map((item, index) => {
          return <div className="all-replies" key={index}>
              <Replies replies={item} reply={reply} />
          </div>
      })}
      {isReplyActive && <ReplyBox active={setIsReplyActive} replyingTo={replyingTo} id={item.id} parentID={parentID} />}
    </>
  );
}
