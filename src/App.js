import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, fetchRepos } from './Components/githubSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.github.user);
  const repos = useSelector((state) => state.github.repos);
  const status = useSelector((state) => state.github.status);

  const handleSearch = () => {
    dispatch(fetchUser(username));
    dispatch(fetchRepos(username));
  };

  return (
    <div className="container mt-5">
      <h1>GitHub User Finder</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" onClick={handleSearch}>Search</button>
        </div>
      </div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'succeeded' && user ? (
        <div>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>{repo.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
}

export default App;