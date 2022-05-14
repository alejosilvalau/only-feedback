import { Link } from "react-router-dom";
import {BiChevronUp} from 'react-icons/bi';
import iconComment from "../../images/shared/icon-comments.svg";
import "./FeedBack.css";
import { useDispatch, useSelector } from "react-redux";
import { ProductAction } from "../../store/ProductSlice";

export default function FeedBack({item}) {
  const dispatch = useDispatch();
  const isUpvoted = useSelector(state => state.product.mainData.productRequests[item.id-1].is_upvoted)

  const upvote = (e, id) => {
    if(e.target.classList.contains('active')) {
      e.target.classList.replace('active', 'filter');
      dispatch(ProductAction.upvote({id, value: -1}));

    } else {
      e.target.classList.replace('filter', 'active')
      dispatch(ProductAction.upvote({id, value: 1}));
    }
    dispatch(ProductAction.loadData());
  }

  return (
    <div className="feedback">
      <button onClick={(e) => upvote(e,item.id)} className={`${isUpvoted ? 'active' : 'filter'}`}>
        <BiChevronUp className="arrow-up" />
        <p>{item.upvotes}</p>
      </button>
      <div className="feedback-details">
        <Link to={`/feedback/${item.id}`}>{item.title}</Link>
        <p>{item.description}</p>
        <h3>{item.category}</h3>
      </div>
      <div className="comment">
        <img src={iconComment} alt="" />{item.comments.length}
      </div>
    </div>
  );
}
