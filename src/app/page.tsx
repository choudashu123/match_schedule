'use client';

import axios from 'axios';
import { useState } from 'react';

type Match = {
  fixture: {
    date: string;
    venue: { city: string; name: string };
    status: { long: string };
  };
  goals: { away: number; home: number };
  league: { country: string; logo: string; name: string; season: string };
  teams: { away: { name: string }; home: { name: string } };
};

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([]);

  const fetchMatches = async () => {
    try {
      const res = await axios.get('/api/matches');
      setMatches(res.data.response);
    } catch (error) {
      console.error('Failed to load matches', error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-900">⚽ Upcoming Matches</h1>
        <button
          onClick={fetchMatches}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105"
        >
          🔄 Load Matches
        </button>
      </header>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match, idx) => (
          <li
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200"
          >
            <div className="mb-2 text-xl font-bold text-blue-900">
              {match.teams.home.name} vs {match.teams.away.name}
            </div>
            <div className="text-sm text-gray-600 mb-1">
              🏆 <span className="font-semibold">{match.league.name}</span> ({match.league.country})
            </div>
            <div className="text-sm text-gray-600 mb-1">
              📍 {match.fixture.venue.name}, {match.fixture.venue.city}
            </div>
            <div className="text-sm text-gray-600 mb-1">
              🕒 {new Date(match.fixture.date).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mb-1">
              ⏱️ Status: {match.fixture.status.long}
            </div>
            <div className="text-sm font-semibold text-gray-800">
              ⚽ Score: {match.goals.home} - {match.goals.away}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
