import React, { useState, useEffect } from 'react';
import './App.css';
import Stat from './components/stat';
import Countries from './components/countries';
import CSSselector from './components/cssselector';

function App() {

  const [url, setUrl] = useState('https://covid19.mathdro.id/api')
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(0)
  const [recovered, setRecovered] = useState(0)
  const [deaths, setDeaths] = useState(0)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [error, setError] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("MUNDIAL")
  
  useEffect(() => {
    import('./css/flat/flat-remix.css');
  }, []);

  useEffect(() => {
    loadData(url)
  }, [url]);

  useEffect(() => {
    setConfirmed(stats.confirmed ?? 0)
    setRecovered(stats.recovered ?? 0)
    setDeaths(stats.deaths ?? 0)
    setLastUpdate(stats.lastUpdate ?? 'no info')
  }, [stats])

  useEffect(() => {
    if (selectedCountry === "MUNDIAL") setUrl('https://covid19.mathdro.id/api')
    else setUrl(`https://covid19.mathdro.id/api/countries/${selectedCountry}`)
  }, [selectedCountry])

  function loadData(url) {
    async function fetchData() {
      setLoading(true);
      const data = await fetch(url)
        .then(res => res.json())
        .catch(err => {
          setError(err)
        });
      setStats(data);
      setLoading(false);
    }
    fetchData();
  }

  function formatDate(dateString) {
    if (dateString) {
      try {
        const d = new Date(dateString)
        const ye = new Intl.DateTimeFormat('es-ES', { year: 'numeric' }).format(d)
        const mo = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(d)
        const da = new Intl.DateTimeFormat('es-ES', { day: '2-digit' }).format(d)
        const hr = new Intl.DateTimeFormat('es-ES', { hour: 'numeric' }).format(d)
        const mn = new Intl.DateTimeFormat('es-ES', { minute: 'numeric' }).format(d)
        const sc = new Intl.DateTimeFormat('es-ES', { second: 'numeric' }).format(d)
        return `${da}-${mo}-${ye} a las ${hr}:${mn}:${sc}`
      } catch (error) {
        return 'No hay fecha'
      }
    } else {
      return 'No hay fecha'
    }
  }

  /**
   * Maneja el valor del país seleccionado
   *
   * @param {*} selectedCountry
   */
  function handleSelectCountry(selectedCountry) {
    setSelectedCountry(selectedCountry)
  }

  /**
   * Maneja el valor del tipo de hoja de estilo (CSS Stylesheet) seleccionada
   *
   * @param {*} selectedCSS
   */
  async function handleSelectCSS(selectedCSS) {
    switch (selectedCSS) {
      case "skeuos":
        await import('./css/skeuos/skeuos.css');
        break;
      default:
        await import('./css/flat/flat-remix.css');
        break;
    }
  }

  return (
    <div className="App">
      <CSSselector 
        handleSelectCSS={handleSelectCSS}
        selectedCSS="flat"
      />
      <h1>Seguimiento sobre el COVID-19 (Nuevo CORONAVIRUS)</h1>
      <Countries 
        selectedCountry={selectedCountry}
        handleSelectCountry={handleSelectCountry} 
      />
      <h3>A continuación mostramos las estadísticas sobre los casos...</h3>
      {loading === false && 
        <label>Última actualización: {formatDate(lastUpdate)}</label>
      }
      { loading === true && 
        <p>Cargando ...</p>
      }
      { loading ===false && 
        <div className="paper stats">
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
        <h4>Este código está disponible en <a href="https://github.com/vicmonmena/follow-covid19">GitHub</a>.</h4>
      </div>
    </div>
  );
}

export default App;
