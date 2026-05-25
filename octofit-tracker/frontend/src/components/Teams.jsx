import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const teamsEndpoint = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetchCollection(teamsEndpoint)
      .then((items) => {
        setTeams(items);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section>
      <div className="section-header">
        <p className="eyebrow">Groups</p>
        <h2>Teams</h2>
      </div>
      {status === 'loading' && <p className="muted">Loading teams...</p>}
      {status === 'error' && <p className="alert alert-warning">Teams are unavailable.</p>}
      <div className="data-grid">
        {teams.map((team) => (
          <article className="data-card" key={team._id ?? team.name}>
            <h3>{team.name}</h3>
            <p>{team.mascot}</p>
            <span>{team.memberCount ?? 0} members</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Teams;
