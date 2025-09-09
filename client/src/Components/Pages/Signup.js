// import React, { useState } from 'react';
// import axios from 'axios';

// function Signup() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [msg, setMsg] = useState('');

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     try {
//        await axios.post('http://localhost:5000/api/users/signup', {
//       // await axios.post(`${process.env.REACT_APP_API_BASE}/api/users/signup`, {
//         name,
//         email,
//         password,
//       });
//       setMsg('User registered successfully');
//     } catch (err) {
//       setMsg(err.response?.data?.message || 'Signup failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       <p>{msg}</p>
//       <form onSubmit={handleSignup}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Signup;

// security questions
import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [msg, setMsg] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
       await axios.post(`${process.env.REACT_APP_API_BASE}/api/users/register`, {
      // await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
        securityAnswer,
      });
      setMsg('User registered successfully');
      // clear form
      setName('');
      setEmail('');
      setPassword('');
      setSecurityAnswer('');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <p>{msg}</p>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="What is your favorite food?"
          value={securityAnswer}
          onChange={(e) => setSecurityAnswer(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Signup;

