import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const workoutsEndpoint = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetchCollection(workoutsEndpoint)
      .then((items) => {
        setWorkouts(items);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section>
      <div className="section-header">
        <p className="eyebrow">Plans</p>
        <h2>Workouts</h2>
      </div>
      {status === 'loading' && <p className="muted">Loading workouts...</p>}
      {status === 'error' && <p className="alert alert-warning">Workouts are unavailable.</p>}
      <div className="data-grid">
        {workouts.map((workout) => (
          <article className="data-card" key={workout._id ?? workout.name}>
            <h3>{workout.name}</h3>
            <p>{workout.focusArea}</p>
            <span>
              {workout.difficulty} · {workout.durationMinutes} min
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Workouts;
