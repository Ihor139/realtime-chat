import './App.css';

import AuthorizeForm from "./components/AuthorizeForm";
import {useEffect, useReducer} from "react";
import reducer from "./redusers";
import socket from "./initSocket";
import Chat from "./components/Chat";
import axios from "axios";

const initialState = {
  joined: false,
  roomId: null,
  userName: null,
  users: [],
  messages: [],
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj
    })
    socket.emit('ROOM:JOIN', obj)
    const {data} = await axios.get(`/rooms/${obj.roomId}`)
    dispatch({
      type: 'SET_DATA',
      payload: data,
    })
  }

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    })
  }

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message
    })
  }


  useEffect(() => {
    socket.on('ROOM:JOINED', setUsers)
    socket.on('ROOM:SET_USERS', setUsers)
    socket.on('ROOM:NEW_MESSAGE', addMessage)
  }, [])
  return (
    <div className="container-fluid pt-4 pb-4 h-100">
      {!state.joined ? <AuthorizeForm onLogin={onLogin}/> : <Chat {...state} onAddMessage={addMessage}/>}
    </div>
  );
}

export default App;
