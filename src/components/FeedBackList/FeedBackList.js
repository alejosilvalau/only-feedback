import { useSelector } from "react-redux";
import FeedBack from "../FeedBack/FeedBack";

export default function FeedBackList() {
    const data = useSelector(state => state.product.data);
    return <div className="feedback-list">
        {data.productRequests.map((item, index) => {
            return <FeedBack key={index} item={item} />
        })}
    </div>
}