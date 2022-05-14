import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { BiChevronLeft, BiChevronUp } from "react-icons/bi";
import iconComment from "../../images/shared/icon-comments.svg";
import "./Details.css";
import { ProductAction } from "../../store/ProductSlice";
import CommentContainer from "../CommentContainer/CommentContainer";

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [feedback] = useSelector((state) =>
    state.product.mainData.productRequests.filter((item) => item.id == id)
  );

  const upvote = (e, id) => {
    if(e.target.classList.contains('active')) {
      e.target.classList.replace('active', 'filter');
      dispatch(ProductAction.upvote({id: parseInt(id), value: -1}));

    } else {
      e.target.classList.replace('filter', 'active')
      dispatch(ProductAction.upvote({id: parseInt(id), value: 1}));
    }
    dispatch(ProductAction.loadData());
  }

  return (
    <div className="detail-page" >
      <Link to="/" style={{fontWeight: 700}}>
        <BiChevronLeft />
        Go Back
      </Link>
      
      <div className="detail-container">
        <button className={`${feedback.is_upvoted ? 'active':'filter'}`} onClick={(e) => upvote(e,id)}>
          <BiChevronUp /> {feedback.upvotes}
        </button>
        <div className="details">
          <h1>{feedback.title}</h1>
          <p>{feedback.description}</p>
          <button>{feedback.category}</button>
        </div>
        <div className="comment-container">
          <img src={iconComment} alt="" />
          {feedback.comments.length}
        </div>
      </div>
      <CommentContainer id={id} feedback={feedback} />
    </div>
  );
}
