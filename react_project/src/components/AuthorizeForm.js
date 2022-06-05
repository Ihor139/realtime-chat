import React, {useState} from "react";
import axios from "axios";

export default function AuthorizeForm({onLogin}) {
  const [roomId, SetRoomId] = useState('')
  const [userName, setUserName] = useState('')
  const [isLoading, setLoading] = useState(false)

  const onEnter = async (e) => {
    e.preventDefault()
    if (!roomId || !userName) {
      return alert('Enter data!')
    }

    setLoading(true)

    const obj ={
      roomId,
      userName
    }
    await axios.post('/rooms', obj)
    onLogin(obj)
  }

  return (
    <>
      <h1 className='text-center mb-5 mt-5'>React/Node.js/Socket.io lite chat</h1>
      <form className='mb-auto' onSubmit={onEnter}>
        <div className="mb-3 d-flex justify-content-center">
          <label htmlFor="exampleInputEmail1" className="form-label">Room
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   value={roomId} onChange={e => SetRoomId(e.target.value)}/>
          </label>
        </div>
        <div className="mb-3 d-flex justify-content-center">
          <label htmlFor="name-1" className="form-label">Your name
            <input type="text" className="form-control"
                   value={userName} onChange={e => setUserName(e.target.value)}/>
          </label>
        </div>
        <button disabled={isLoading} type="submit"
                className="btn btn-primary d-flex justify-content-center ml-auto mr-auto pl-4 pr-4">{isLoading ? 'Loading...' : 'Submit'}</button>
      </form>
    </>
  );
}
