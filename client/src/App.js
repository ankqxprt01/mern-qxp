// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useState } from 'react';
// import './App.css';

// import ForgetPassword from './Components/Pages/ForgetPassword';
// import Login from './Components/Pages/Login';
// import Signup from './Components/Pages/Signup';
// import Home from './Components/Pages/Home';
// import Navbar from './Components/Pages/Navbar';
// import Admin from './Components/Pages/Admin';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   const handleLoginSuccess = (userData) => {
//     setIsLoggedIn(true);
//     setUser(userData);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUser(null);
//   };

//   return (
//     <Router>
//       {!isLoggedIn && <Navbar />}
//       <Routes>
//         <Route
//           path="/"
//           element={
//             isLoggedIn ? (
//               <Home user={user} onLogout={handleLogout} />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             isLoggedIn ? (
//               <Navigate to="/" />
//             ) : (
//               <Login onLoginSuccess={handleLoginSuccess} />
//             )
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             isLoggedIn ? (
//               <Navigate to="/" />
//             ) : (
//               <Signup onLoginSuccess={handleLoginSuccess} />
//             )
//           }
//         />
//         <Route path="/forget-password" element={<ForgetPassword />} />

//         <Route
//         path="/admin"
//         element={
//           isLoggedIn && user?.isAdmin ? (
//             <Admin user={user} />
//           ) : (
//             <Navigate to="/" />
//           )
//         }
//       />
       
//         <Route path="*" element={<h2>404 - Page Not Found</h2>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

import ForgetPassword from './Components/Pages/ForgetPassword';
import Login from './Components/Pages/Login';
import Signup from './Components/Pages/Signup';
import Home from './Components/Pages/Home';
import Navbar from './Components/Pages/Navbar';
import About from './Components/Pages/About';

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // clear from localStorage on logout
  };

  return (
    <Router>
      {!user && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Home user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

         <Route
          path="/about"
          element={
            user ? (
              <About user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <Signup onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;

