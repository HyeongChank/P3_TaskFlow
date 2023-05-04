import './App.css';
import { BrowserRouter, Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import Routemain from './todolist/Routemain';
// import Main from './todolist/Main';


function App() {
  return (
    <div className="App">
      {/* <Todolist/> */}
      {/* <Main/> */}
      <BrowserRouter>
        <Routemain />
      </BrowserRouter>
    </div>
  );
}

export default App;