import React, { useState } from 'react';

const App = () => {
  const [spieler, setSpieler] = useState(['']);
  const [teams, setTeams] = useState([]);

  const handleNameChange = (index, value) => {
    const updatedSpieler = [...spieler];
    updatedSpieler[index] = value;
    setSpieler(updatedSpieler);
  };

  const addSpieler = () => {
    setSpieler([...spieler, '']);
  };

  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const generateTeams = () => {
    const cleanedPlayers = spieler.map(s => s.trim()).filter(s => s !== '');
    const shuffled = shuffleArray(cleanedPlayers);
    const newTeams = [];
    for (let i = 0; i < shuffled.length; i += 4) {
      newTeams.push(shuffled.slice(i, i + 4));
    }
    setTeams(newTeams);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 600, margin: 'auto' }}>
      <h2>Tischtennis Doppel Generator</h2>
      {spieler.map((name, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Spieler ${index + 1}`}
          value={name}
          onChange={(e) => handleNameChange(index, e.target.value)}
          style={{ display: 'block', marginBottom: 10, width: '100%', padding: 8 }}
        />
      ))}
      <button onClick={addSpieler} style={{ marginBottom: 10 }}>+ Spieler hinzufügen</button>
      <br />
      <button onClick={generateTeams} style={{ padding: 10 }}>Teams generieren</button>
      {teams.map((team, i) => (
        <div key={i} style={{ marginTop: 20 }}>
          <h4>Platte {i + 1}</h4>
          {team.map((spieler, j) => (
            <div key={j}>{spieler}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;