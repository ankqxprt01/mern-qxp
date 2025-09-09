// simple and bycrypt
// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginStatus, setLoginStatus] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:5000/api/users/login', {
//         email,
//         password,
//       });

//       setLoginStatus(`Welcome, ${res.data.user.name}!`);
//       setError('');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//       setLoginStatus('');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {loginStatus && <p style={{ color: 'green' }}>{loginStatus}</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

// login with new old pass
// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginStatus, setLoginStatus] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:5000/api/users/login', {
//         email,
//         password,
//       });

//       // users name upon successful login
//       setLoginStatus(`Welcome, ${res.data.user.name}!`);
//       setError('');
//     } catch (err) {
//       // error message if login fails
//       setError(err.response?.data?.error || 'Login failed');
//       setLoginStatus('');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {loginStatus && <p style={{ color: 'green' }}>{loginStatus}</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

// login logout
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function Login({ onLoginSuccess }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const res = await axios.post('http://localhost:5000/api/users/login', {
//         email,
//         password
//       });

//       if (res.data && res.data.user) {
//         onLoginSuccess(res.data.user); // Pass user to App
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div>
//       <h3>Login</h3>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
//         <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
//          <p style={{ marginTop: '10px' }}>
//         <Link to="/forget-password">Forgot Password?</Link>
//       </p>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

// json web token
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function Login({ onLoginSuccess }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const res = await axios.post('https://mern-ef6b.onrender.com/api/users/login', {
//         email,
//         password
//       });

//       if (res.data && res.data.user && res.data.token) {
//         const userData = {
//           ...res.data.user,  // includes id, name, email, isAdmin
//           token: res.data.token,
//         };

//         //save user and token to localStorage
//         localStorage.setItem("user", JSON.stringify(userData));

//         // pass user + token to App
//         onLoginSuccess(userData);
//       } else {
//         setError("Login failed: Missing token or user");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div>
//       <h3>Login</h3>
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             type="email"
//             required
//           />
//         </div>

//         <div>
//           <label>Password:</label>
//           <input
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             type="password"
//             required
//           />
//         </div>

//         <button type="submit">Login</button>

//         <p style={{ marginTop: '10px' }}>
//           <Link to="/forget-password">Forgot Password?</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;

// baseurl
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // added loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // show loader

    const start = Date.now(); // start time

    try {
      // check the proxy in client packg.json
      //  runs on live
      const res = await axios.post(`${process.env.REACT_APP_API_BASE}/api/users/login`, {
        email,
        password
      });

      // localhost
      //   const res = await axios.post('http://localhost:5000/api/users/login', {
      //   email,
      //   password
      // });

      if (res.data && res.data.user && res.data.token) {
        const userData = {
          ...res.data.user,
          token: res.data.token,
        };

        localStorage.setItem("user", JSON.stringify(userData));

        // 2 seconds loading time
        setLoading(false);
        onLoginSuccess(userData);

      // redirect immediately after login
        window.location.href = "/";
      } else {
        throw new Error("Login failed: Missing token or user");
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="loader-wrapper">
          <div className="spinner"></div>
          <p className="loading-text">Logging in...</p>
        </div>
      )}

      <h3>Login</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
            disabled={loading} // disable input while loading
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
            disabled={loading} // disable input while loading
          />
        </div>

        <button type="submit" disabled={loading}>Login</button>

        <p style={{ marginTop: '10px' }}>
          <Link to="/forget-password">Forgot Password?</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;



