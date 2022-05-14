import "./Replies.css";

export default function Replies({ replies, reply }) {

  return (
    <>
      <div className="replies">
        <img src={replies.user.image} alt="" />
        <div className="user-reply-container">
          <h2>{replies.user.name}</h2>
          <p className="username">@{replies.user.username}</p>
          <p className="user-reply">
            {" "}
            <span>@{replies.replyingTo}</span> {replies.content}
          </p>
        </div>
        <button className="reply-btn" onClick={() => reply(replies.user.username)}>Reply</button>
      </div>
      
    </>
  );
}
