import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const activitiesEndpoint = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetchCollection(activitiesEndpoint)
      .then((items) => {
        setActivities(items);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section>
      <div className="section-header">
        <p className="eyebrow">Movement</p>
        <h2>Activities</h2>
      </div>
      {status === 'loading' && <p className="muted">Loading activities...</p>}
      {status === 'error' && (
        <p className="alert alert-warning">Activities are unavailable.</p>
      )}
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Activity</th>
              <th>User</th>
              <th>Duration</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.type}-${activity.completedAt}`}>
                <td>{activity.type}</td>
                <td>{activity.userId?.displayName ?? activity.userName ?? 'Unknown'}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Activities;
