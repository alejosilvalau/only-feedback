import LeftSidebar from '../LeftSidebar/LeftSidebar';
import RightSidebar from '../RightSidebar/RightSidebar';
import './Home.css';

export default function Home() {
    return <div className="main-container">
        <LeftSidebar />
        <RightSidebar />
    </div>
}