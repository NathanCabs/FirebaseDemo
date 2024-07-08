import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Navigate, Routes, NavLink } from 'react-router-dom';

import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Article from './pages/Article';
import FormArticle from './pages/FormArticle';
import Login from './components/Login';
import SignUp from './components/SignUp';
import EditArticle from './components/EditArticle';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/config';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false); 
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        {loggedIn ? (
          <>
            <nav>
              <h1>My Articles</h1>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to="/new">New Article</NavLink>
              <button className='logout' onClick={handleLogout}>Logout</button> {/* Logout button */}
            </nav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/articles/:urlId" element={<Article />} />
              <Route path="/edit/:id" element={<EditArticle />} />
              <Route path="/new" element={<FormArticle />} />
              <Route path="/*" element={<Navigate to="/" />} /> 
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} /> 
            <Route path="/signup" element={<SignUp />} /> 
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
