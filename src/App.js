import './App.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate  } from 'react-router-dom';

import Main from './Components/Main/Main';
import Auth from './Components/Auth/Auth';
import Error from './Components/Error/Error';

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
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='*' element={<Error />} />
          </Routes>
          {error && <Error />}
      </div>
    </div>
  );
}

export default App;
