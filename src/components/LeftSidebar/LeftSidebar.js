import { useSelector, useDispatch } from "react-redux";
import { ProductAction } from "../../store/ProductSlice";
import hamburger from '../../images/shared/mobile/icon-hamburger.svg';
import iconClose from '../../images/shared/mobile/icon-close.svg';
import "./LeftSidebar.css";
import { useState } from "react";

export default function LeftSidebar() {
  const isLoading = useSelector((state) => state.product.isLoading);
  const category = useSelector((state) => state.product.category);
  const status = useSelector((state) => state.product.status);
  const dispatch = useDispatch();
  const [navShowing, setIsNavShowing] = useState(false);

  const filter = type => {
    dispatch(ProductAction.filterItem({type: 'filter', value:'all'}));
    dispatch(ProductAction.filterItem({type: 'filter', value:type}));
  }

  const show = () => {
    setIsNavShowing(!navShowing);
  }

  if (isLoading) return <div></div>;

  return (
    <div className="left-sidebar">
      <img src={`${navShowing ? iconClose:hamburger}`} alt="" className='hamburger' onClick={show} />
      <div className="banner">
        <h1>Frontend Mentor</h1>
        <p>FeedBack Board</p>
      </div>
      <div className={`category ${navShowing ? 'show': ''}`}>
        <div className="category-temp"></div>
        {category.map((item, index) => {
          return <button key={index} onClick={() => filter(item)}>{item}</button>;
        })}
      </div>
      <div className={`roadmap ${navShowing ? 'show': ''}`}>
        <div className="roadmap-temp"></div>
        <div className="roadmap-header">
          <h2>Roadmap</h2>
          
        </div>
        <div className="roadmap-body">
          {Object.keys(status).map((item, index) => {
            if (item !== "suggestion") {
              return (
                <div key={index} className="roadmap-item">
                  <div className={`circle circle-${index}`}></div>
                  <p>{item}</p>
                  <h3>{status[item]}</h3>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
