import React, { useState, useEffect } from 'react';
import './App.css';
import './flat-remix.css';
import Stat from './components/stat'

function App() {

  const [url, setUrl] = useState('https://covid19.mathdro.id/api');
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(0)
  const [recovered, setRecovered] = useState(0)
  const [deaths, setDeaths] = useState(0)
  const [error, setError] = useState("")
  useEffect(() => {
    console.log('Mounting or updating');
    async function fetchData() {
      setLoading(true);
      console.log('Fetching Data');
      const data = await fetch(url)
        .then(res => res.json())
        .catch(err => {
          setError(err)
        });
      setStats(data);
      setLoading(false);
    }
    fetchData();
  }, [url]);
  useEffect(() => {
    console.log('stats: ', stats)
    setConfirmed(stats.confirmed)
    setRecovered(stats.recovered)
    setDeaths(stats.deaths)
  }, [stats])

  return (
    <div className="App">
      <h1>Seguimiento sobre el COVID-19 (Nuevo CORONAVIRUS)</h1>
      <h3>A continuación mostramos las estadísticas sobre los siguientes caso:</h3>
      { loading === true && 
        <p>Loading ...</p>
      }
      { loading ===false && 
        <div class="paper stats">
          <Stat 
            title="Confirmados"
            value={confirmed.value}
          />
          <Stat 
            title="Recuperados"
            value={recovered.value}
          />
          <Stat 
            title="Fallecidos"
            value={deaths.value}
          />
        </div>
      }
      <div className="error">
        <h4>{error}</h4>
      </div>
      <div className="footer">
        <h4>This code is open source. Find it on <a href="#">GitHub</a>.</h4>
      </div>
    </div>
  );
}

export default App;
