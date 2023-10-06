import './App.css';
import Home from './components/Home';
import Detail from './components/Detail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Detail/:id' element={<Detail/>}></Route>
      </Routes>
    </Router>
      </header>
    </div>
  );
}

export default App;
