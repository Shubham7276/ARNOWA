import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './App.css';
import Login from './Components/Login';
import Home from './Components/Home';
import {Routes,Route,Navigate} from 'react-router-dom'

function App() {
  const user=localStorage.getItem("user")
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        {user && <Route path="/login" element={<Navigate replace to="/home" />} />}
        {user && <Route path="/*" element={<Navigate replace to="/home" />} />}
        {user && <Route path='/home' element={<Home/>}/>}
        <Route path='/login' element={<Login/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
