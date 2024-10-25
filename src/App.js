import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`main-container ${darkMode ? "dark" : ""}`}>
      <div className={`mode-section ${darkMode ? "dark" : ""}`}>
        <p className={`title ${darkMode ? "dark" : ""}`}>Where in the world?</p>
        <div className="btn-container">
          <button
            className={`darkmode-btn ${darkMode ? "dark" : ""}`}
            onClick={toggleDarkMode}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      <div className={`search-section ${darkMode ? "dark" : ""}`}>
        <div className="input-img">
          <input
            className={`search ${darkMode ? "dark" : ""}`}
            placeholder="Search for a country…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className={`filter ${darkMode ? "dark" : ""}`}
          onChange={(e) => setRegion(e.target.value)}
          value={region}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="countries">
        {countries
          .filter((country) =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((country) => region === "" || country.region === region)
          .map((country) => (
            <div
              className={`country-card ${darkMode ? "dark" : ""}`}
              key={country.cca3}
            >
              <img
                className="country-flag"
                src={country.flags.svg}
                alt={country.name.common}
              />
              <h3 className={`country-name ${darkMode ? "dark" : ""}`}>
                {country.name.common}
              </h3>
              <p className={`info-one ${darkMode ? "dark" : ""}`}>
                Population: {country.population.toLocaleString()}
              </p>
              <p className={`info ${darkMode ? "dark" : ""}`}>
                Region: {country.region}
              </p>
              <p className={`info ${darkMode ? "dark" : ""}`}>
                Capital: {country.capital ? country.capital[0] : "N/A"}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
