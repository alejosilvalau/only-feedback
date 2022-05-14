import { createRef, useState } from "react";
import FeedBackList from "../FeedBackList/FeedBackList";
import "./RightSidebar.css";
import iconSuggestion from "../../images/suggestions/icon-suggestions.svg";
import { useDispatch, useSelector } from "react-redux";
import { ProductAction } from "../../store/ProductSlice";
import { Link } from "react-router-dom";

export default function RightSidebar() {
  const [isShowing, setIsShowing] = useState(false);
  const span = createRef();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.product.isLoading);
  const total = useSelector(state => state.product.mainData.productRequests.length);

  const showBox = () => {
    setIsShowing(!isShowing);
  };

  const changeSort = (e) => {
    span.current.innerText = e.target.innerText;
    setIsShowing(false);
    dispatch(ProductAction.sortItem(e.target.innerText));
  };

  if(isLoading) return <div></div>

  return (
    <div className="right-sidebar">
      <div className="right-sidebar-header">
        <img src={iconSuggestion} alt="" />
        <h1>{total} Suggestions</h1>
        <div className="sort">
          <p>
            Sort by:{" "}
            <span onClick={showBox} ref={span}>
              Random
            </span>
          </p>
          <div
            className="sort-box"
            style={{ maxHeight: isShowing ? "20rem" : "0" }}
          >
            <div
              className="sort-items"
              style={{ maxHeight: isShowing ? "20rem" : "0" }}
            >
              <p onClick={changeSort}>Random</p>
              <p onClick={changeSort}>Most Upvotes</p>
              <p onClick={changeSort}>Least Upvotes</p>
              <p onClick={changeSort}>Most Comments</p>
              <p onClick={changeSort}>Least Comments</p>
            </div>
          </div>
        </div>
        <Link to="/new">+ Add Feedback</Link>
      </div>
      <FeedBackList />
    </div>
  );
}
