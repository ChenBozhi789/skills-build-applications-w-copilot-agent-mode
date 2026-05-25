import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const leaderboardEndpoint = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetchCollection(leaderboardEndpoint)
      .then((items) => {
        setLeaderboard(items);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section>
      <div className="section-header">
        <p className="eyebrow">Standings</p>
        <h2>Leaderboard</h2>
      </div>
      {status === 'loading' && <p className="muted">Loading leaderboard...</p>}
      {status === 'error' && (
        <p className="alert alert-warning">Leaderboard is unavailable.</p>
      )}
      <div className="leaderboard-list">
        {leaderboard.map((entry, index) => (
          <article className="leaderboard-row" key={entry._id ?? entry.userId?._id ?? index}>
            <strong>#{entry.rank ?? index + 1}</strong>
            <span>{entry.userId?.displayName ?? entry.username ?? entry._id}</span>
            <span>{entry.totalPoints} pts</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;
