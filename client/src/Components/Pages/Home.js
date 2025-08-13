// import FetchUsers from '../FetchUsers';

// function Home({ user, onLogout }) {
//   return (
//     <div>
//       <h2>Welcome, {user?.name}</h2>
//       <button onClick={onLogout}>Logout</button>
//       <FetchUsers />
//     </div>
//   );
// }

// export default Home;

import { Link } from 'react-router-dom';
import Admin from './Admin';

function Home({ user, onLogout }) {
  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      {/* <button >Logout</button> */}

      {/* Only show Admin section if user is admin */}
      {user?.isAdmin && <Admin user={user} />}

       <div class="menu">
    <ul class="menu-bar">
      <li>
        <a href="#" class="active">
          <i class='bx bx-home'></i>
          <span>Home</span>
        </a>
      </li>
      <li>
        <Link to="/about">
          <i class='bx bxs-user-circle'></i>
          <span>About Me</span>
        </Link>
      </li>
      <li>
        
       <li>
      <a href="#" onClick={onLogout}>
        <i class='bx bx-log-out-circle'></i>
        <span>Logout</span>
      </a>
</li>
        
      </li>
    </ul>
  </div>
    </div>
  );
}

export default Home;

