// normal forget pass
// import React, { useState } from 'react';
// import axios from 'axios';

// function ForgetPassword() {
//   const [email, setEmail] = useState('');
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handlePasswordReset = async (e) => {
//     e.preventDefault();

//     if (!email || !oldPassword || !newPassword || !confirmPassword) {
//       setError('All fields are required');
//       setMessage('');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError('New passwords do not match');
//       setMessage('');
//       return;
//     }

//     try {
//       const res = await axios.post(`${process.env.REACT_APP_API_BASE}/api/users/forgetpass`, {
//         email,
//         oldPassword,
//         newPassword,
//       });

//       setMessage(res.data.message);
//       setError('');
//       setEmail('');
//       setOldPassword('');
//       setNewPassword('');
//       setConfirmPassword('');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Password update failed');
//       setMessage('');
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       {message && <p style={{ color: 'green' }}>{message}</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <form onSubmit={handlePasswordReset}>
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
//           <label>Old Password:</label>
//           <input
//             type="text"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>New Password:</label>
//           <input
//             type="text"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Confirm New Password:</label>
//           <input
//             type="text"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// }

// export default ForgetPassword;

// forget pass with old new pass
// forget pass with old new pass
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 👈 added for redirect

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState('old'); // 'old' or 'security'
  const [oldPassword, setOldPassword] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // 👈 hook for navigation

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!email || !newPassword || !confirmPassword) {
      setError('Email and new password fields are required');
      setMessage('');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      setMessage('');
      return;
    }

    try {
      const payload =
        method === 'old'
          ? { email, oldPassword, newPassword }
          : { email, securityAnswer, newPassword };

      const url =
        method === 'old'
          // ? 'http://localhost:5000/api/users/reset-with-oldpass'
          // : 'http://localhost:5000/api/users/recover-password';

          ? `${process.env.REACT_APP_API_BASE}/api/users/reset-with-oldpass`
          : `${process.env.REACT_APP_API_BASE}/api/users/recover-password`;

      const res = await axios.post(url, payload);

      setMessage(res.data.message);
      setError('');
      setEmail('');
      setOldPassword('');
      setSecurityAnswer('');
      setNewPassword('');
      setConfirmPassword('');

      // 👇 redirect to login after success
      setTimeout(() => {
        navigate("/login");
      }, 1500); // small delay so user can read success message
    } catch (err) {
      setError(err.response?.data?.error || 'Password reset failed');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <label>
        <input
          type="radio"
          name="method"
          value="old"
          checked={method === 'old'}
          onChange={() => setMethod('old')}
        />
        I remember my old password
      </label>
      <label style={{ marginLeft: '1rem' }}>
        <input
          type="radio"
          name="method"
          value="security"
          checked={method === 'security'}
          onChange={() => setMethod('security')}
        />
        I forgot my old password
      </label>

      <br />
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handlePasswordReset}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {method === 'old' && (
          <div>
            <label>Old Password:</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
        )}

        {method === 'security' && (
          <div>
            <label>What is your favorite food?</label>
            <input
              type="text"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ForgetPassword;