import './App.css';
import Home from './components/Home';
import Detail from './components/Detail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { GoogleOAuthProvider } from "@react-oauth/google";

import { Provider } from "react-redux";
import store from "./redux/store";


function App() {
  return (
    <Provider store={store}>
    <GoogleOAuthProvider clientId={`643146615220-tll24n6run2aq0t3s8a48gqsvke2li1q.apps.googleusercontent.com`}>
    <div className="App">
      <header className="App-header">
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Detail/:id' element={<Detail/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
      </Routes>
    </Router>
      </header>
    </div>
    </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
