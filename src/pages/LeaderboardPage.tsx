import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
  type Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

interface ScoreDoc {
  id: string;
  winnerUid: string;
  winnerName: string;
  result: string;
  createdAt: Timestamp;
}

interface LeaderboardEntry {
  rank: number;
  uid: string;
  name: string;
  wins: number;
}

export function LeaderboardPage() {
  const [scores, setScores] = useState<ScoreDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(db, 'scores'),
      orderBy('createdAt', 'desc'),
      limit(100),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ScoreDoc[];
      setScores(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const userWins = new Map<string, { name: string; wins: number }>();
  for (const s of scores) {
    if (s.result === 'win') {
      const existing = userWins.get(s.winnerUid) ?? {
        name: s.winnerName,
        wins: 0,
      };
      existing.wins++;
      userWins.set(s.winnerUid, existing);
    }
  }

  const leaderboard: LeaderboardEntry[] = Array.from(userWins.entries())
    .sort((a, b) => b[1].wins - a[1].wins)
    .map(([uid, data], i) => ({ rank: i + 1, uid, ...data }));

  return (
    <div className="page">
      <h1 className="title">Leaderboard</h1>
      {loading ? (
        <p>Loading scores...</p>
      ) : leaderboard.length === 0 ? (
        <p>No scores yet. Play a game to appear here!</p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr
                key={entry.uid}
                className={
                  entry.uid === user?.uid ? 'leaderboard-highlight' : ''
                }
              >
                <td>{entry.rank}</td>
                <td>{entry.name}</td>
                <td>{entry.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Button variant="secondary" onClick={() => navigate('/game')}>
        Back to Game
      </Button>
    </div>
  );
}
