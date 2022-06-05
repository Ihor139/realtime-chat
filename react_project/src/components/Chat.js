import socket from "../initSocket";
import {useEffect, useRef, useState} from "react";

export default function Chat({users, messages, userName, roomId, onAddMessage}) {
  const [messageValue, setMessageValue] = useState('')
  const messagesRef = useRef(null)

  const addNewMessage = (e) => {
    e.preventDefault()
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomId,
      text: messageValue
    })
    onAddMessage({userName, text: messageValue})
    // setMessageValue('')
  }
  useEffect(() => {
    messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight)
  }, [messages])

  return (
    <div className="container h-100">
      <div className="row chat h-100 overflow-hidden">
        <div className="chat-user col-4 h-100 bg-light pt-3 pb-3">
          <b>Room: {roomId}</b>
          <b>Online ({users.length})</b>
          <ul className='h-100'>
            {Array.from(users).map((name, ind) =>
              <li key={name + ind}>{name}</li>
            )}
          </ul>
        </div>
        <div className="chat-message h-100 col-8 pt-3 pb-3 d-flex flex-column">
          <div ref={messagesRef} className="message-list">
            {Array.from(messages).map((message, ind) => (
              <div key={ind} className="message">
                <p>{message.text}</p>
                <p className='user-name'>{message.userName}</p>
              </div>
            ))}
          </div>
          <div className="form-wrapper">
            <form className="form d-flex flex-column"
                  onSubmit={(e) => {
                    e.preventDefault()
                  }}>
              <div className="form-floating mb-3">
                <textarea onChange={(e) => {
                  setMessageValue(e.target.value)
                }} className="form-control" id="floatingTextarea2"/>
                <label htmlFor="floatingTextarea2">Message</label>
              </div>
              <button onClick={addNewMessage}
                      type="submit"
                      className="btn btn-primary ml-auto pl-4 pr-4">Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}