import './App.css';

import AuthorizeForm from "./components/AuthorizeForm";
import {useReducer} from "react";

const initialState = {
  isAuth: false
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="container-fluid h-100 d-flex justify-content-center flex-column align-items-center">
      <AuthorizeForm/>
    </div>
  );
}

export default App;
