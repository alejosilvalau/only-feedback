import { useRef } from "react";
import { useDispatch } from "react-redux";
import { ProductAction } from "../../store/ProductSlice";
import "./ReplyBox.css";

export default function ReplyBox({ replyingTo, id, parentID, active }) {
  const reply = useRef();
  const dispatch = useDispatch();

  const addReply = e => {
      e.preventDefault();
      let {value} = reply.current;
      dispatch(ProductAction.addReply({parentID, id, reply:value, replyingTo}));
      dispatch(ProductAction.loadData());
      reply.current.value = '';
      active(false);
  }

  return (
    <div className="new-reply">
      {console.log(id, parentID)}
      <form onSubmit={addReply}>
        <textarea
          ref={reply}
          cols="30"
          rows="2"
          placeholder={`Type your reply to @${replyingTo}`}
        ></textarea>
        <button type="submit">Post Reply</button>
      </form>
    </div>
  );
}
