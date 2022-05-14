import { useHistory } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { ProductAction } from "../../store/ProductSlice";
import "./AddFeedback.css";

export default function AddFeedback() {
  const history = useHistory();
  const dispatch = useDispatch();
  const title = useRef();
  const category = useRef();
  const detail = useRef();

  const submitData = e => {
      e.preventDefault();
      dispatch(ProductAction.addFeedback({
        title: title.current.value,
        category: category.current.value,
        detail: detail.current.value,
      }));
      history.push('/');
      dispatch(ProductAction.loadData());
  }

  return (
    <div className="new-feedback-container">
      <div className="container">
      <div className="new-feedback">
        <h1>Create New Feedback</h1>
        <form onSubmit={submitData}>
          <div className="title-input">
            <h2>Feedback Title</h2>
            <p>Add a short, descriptive headline</p>
            <input type="text" ref={title}/>
          </div>
          <div className="category-input">
            <h2>Category</h2>
            <p>Choose a category for your feedback</p>
            <select id="category" ref={category} >
              <option value="ui">UI</option>
              <option value="ux">UX</option>
              <option value="enhancement">Enhancement</option>
              <option value="bug">Bug</option>
              <option value="feature">Feature</option>
            </select>
          </div>
          <div className="detail-input">
            <h2>Feedback Detail</h2>
            <p>
              Include any specific comments on what should be improved, added,
              etc.
            </p>
            <textarea cols="30" rows="5" ref={detail}></textarea>
          </div>
          <div className="button-container">
            <button onClick={() => history.push("/")}>Cancel</button>
            <button type="submit">Add Feedback</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
