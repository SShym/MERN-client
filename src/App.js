import './App.css';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate  } from 'react-router-dom';

import Auth from './Components/Auth/Auth';
import Error from './Components/Error/Error';
import Navbar from './Components/Navbar/Navbar';

import Settigns from './Components/Pages/Settings/Settings';
import Body from './Components/Pages/Body/Body';
import Map from './Components/Pages/Map/Map';
import Profile from './Components/Pages/Profile/Profile';

function App() { 
  const user = useSelector(state => state.userReducer.user); 
  const error = useSelector(state => state.appReducer.error); 

  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate('/auth')
  }, [user]) // eslint-disable-line

  return (
    <div className="app">
      <div className="app-wrap">
        {user && <Navbar />}
        <Routes>
          {user && <Route path='/settings' element={<Settigns />} />}
          {user &&<Route path='/profile' element={<Profile />} /> }
          {user && <Route path='/' element={<Body />} /> }
          {user && <Route path='/map' element={<Map />} /> }
          {!user && <Route path='/auth' element={<Auth />} />}
          <Route path='*' element={<Error />} />
        </Routes>
        {error && <Error />}
      </div>
    </div>
  );
}

export default App;
