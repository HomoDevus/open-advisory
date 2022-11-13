import React, { useEffect } from 'react';
import Chat from './pages/chat/Chat';
import Authorization from './pages/authorization/Authorization';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthorizationToken, selectIsAuthorized } from './features/chat/chatSlice';

function App() {
  const isAuthorized = useSelector(selectIsAuthorized)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthorizationToken())
  }, [dispatch])

  return (
    <div className="App">
      {isAuthorized ? <Chat /> : <Authorization />}
    </div>
  );
}

export default App;
