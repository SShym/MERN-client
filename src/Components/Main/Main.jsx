import './Main.css';
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Profile from "../Pages/Profile/Profile";
import Settigns from '../Pages/Settings/Settings';
import Body from '../Pages/Body/Body';
import Map from '../Pages/Map/Map';

const Main = () => {
    const page = useSelector(state => state.mainReducer.page);

    return(
        <div className='main-wrap'>
            <Navbar />
            {page === 'profile' && <Profile />}
            {page === 'settings' && <Settigns />}
            {page === 'map' && <Map />}
            {page === null && <Body />}
        </div>
    )
}

export default Main;