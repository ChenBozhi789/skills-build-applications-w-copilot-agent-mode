import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const usersEndpoint = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function Users() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetchCollection(usersEndpoint)
      .then((items) => {
        setUsers(items);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section>
      <div className="section-header">
        <p className="eyebrow">Members</p>
        <h2>Users</h2>
      </div>
      {status === 'loading' && <p className="muted">Loading users...</p>}
      {status === 'error' && <p className="alert alert-warning">Users are unavailable.</p>}
      <div className="data-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id ?? user.username}>
            <h3>{user.displayName ?? user.username}</h3>
            <p>{user.email}</p>
            <span>{user.username}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Users;
