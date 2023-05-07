import './App.css';
import { BrowserRouter, Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import Routemain from './todolist/Routemain';
import RoutePage1 from './todolist/RoutePage1';
// import Main from './todolist/Main';


function App() {
  return (
    <div className="App">
      {/* <Todolist/> */}
      {/* <Main/> */}
      <BrowserRouter>
        <Routemain />
      </BrowserRouter>
      {/* <BrowserRouter>
      <RoutePage1/>
      </BrowserRouter> */}
    </div>
  );
}

export default App;