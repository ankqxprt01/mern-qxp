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

import Admin from './Admin';

function Home({ user, onLogout }) {
  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <button onClick={onLogout}>Logout</button>

      {/* Only show Admin section if user is admin */}
      {user?.isAdmin && <Admin user={user} />}
    </div>
  );
}

export default Home;

