import { useRef } from "react";
import { useDispatch } from "react-redux";
import { ProductAction } from "../../store/ProductSlice";
import Comment from "../Comment/Comment";
import "./CommentContainer.css";

export default function CommentContainer({ id, feedback }) {
  const { comments } = feedback;
  const commentBox = useRef();
  const dispatch = useDispatch();

  const addComment = (e) => {
    e.preventDefault();
    console.log(id);
    dispatch(
      ProductAction.addComment({ id, comment: commentBox.current.value })
    );
    dispatch(ProductAction.loadData());
    commentBox.current.value = '';
  };

  return (
    <>
      <div className="all-comments">
        <h1>{comments.length} Comment</h1>
        {comments.map((item, index) => {
          return <Comment item={item} key={index} parentID={id} />;
        })}
      </div>
      <div className="add-comment">
        <h1>Add Comment</h1>
        <form onSubmit={addComment}>
          <textarea
            cols="30"
            rows="4"
            placeholder="Type your comment here"
            ref={commentBox}
          ></textarea>
          <button type="submit">Post Comment</button>
        </form>
      </div>
    </>
  );
}
