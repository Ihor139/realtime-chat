import socket from "../initSocket";
import React, {useState} from "react";
import axios from "axios";

export default function AuthorizeForm() {
  const [roomId, SetRoomId] = useState('')
  const [userName, setUserName] = useState('')

  const onEnter = (e) => {
    e.preventDefault()
    if (!roomId || !userName) {
      return alert('Enter data!')
    }

    axios.post('/rooms', {
      roomId,
      userName,
    })
  }
  return (
    <>
      <h1 className='text-center mb-5 mt-5'>React/Node.js/Socket.io lite chat</h1>
      <form className='mb-auto' onSubmit={onEnter}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Room
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   value={roomId} onChange={e => SetRoomId(e.target.value)}/>
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="name-1" className="form-label">Your name
            <input type="text" className="form-control"
                   value={userName} onChange={e => setUserName(e.target.value)}/>
          </label>
        </div>
        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </>
  );
}
