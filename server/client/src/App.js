import './App.css';
import Home from './components/Home';
import {Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Add from "./components/Add";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import View from './components/View';
import Edit from './components/Edit';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>      
    </>
  );
}

export default App;
