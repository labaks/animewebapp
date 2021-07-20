import React, { useState } from 'react';
import './App.css';

import SearchBar from './components/SearchBar';
import Card from './components/Card';
import { PieChart } from 'react-minimal-pie-chart';

export default function App() {

  const url = 'https://api.jikan.moe/v3/search/anime';
  const [results, setResults] = useState();
  const [statsOpen, setStatsOpen] = useState(false);
  const [stats, setStats] = useState();
  const [statsData, setStatsData] = useState();

  const _getData = async (search) => {
    let targetUrl = url + "?q=" + search;
    try {
      const response = await fetch(targetUrl)
      const json = await response.json();
      return json;
    } catch (error) {
      console.log("error:", error);
    }
  };

  const _setData = async (search) => {
    setResults(await _getData(search));
  };

  const _getStats = async (id) => {
    let url = 'https://api.jikan.moe/v3/anime/';
    let targetUrl = url + id + "/stats";
    try {
      const response = await fetch(targetUrl)
      const json = await response.json();
      return json;
    } catch (error) {
      console.log("error:", error);
    }
  };

  const closeStats = () => {
    setStatsOpen(false);
  };

  const openStats = async (id) => {
    let data = await _getStats(id);
    transformStats(data);
    setStatsOpen(true);
  };

  const transformStats = (data) => {
    console.log("data", data);
    let arr = [
      { title: 'Watching', value: parseInt(data.watching), color: "green" },
      { title: 'Completed', value: parseInt(data.completed), color: "red" },
      { title: 'Holded', value: parseInt(data.on_hold), color: "blue" },
      { title: 'Plan to watch', value: parseInt(data.plan_to_watch), color: "orange" },
    ]
    setStatsData(arr);
  };

  return (
    <div className="App">
      <span className="brand">Anime Searcher</span>
      <div className="searchBar">
        <SearchBar
          onClick={_setData}
        />
      </div>
      <div className="resultsWrapper">
        {results ?
          results.results.length ?
            results.results.map(elem => {
              return (
                <Card
                  elem={elem}
                  onOpenStats={openStats} />
              )
            })
            :
            <div><p>No results</p></div>
          :
          <div></div>
        }
        {statsOpen ?
          <div className="stats">
            <PieChart
              data={statsData}
              label={(statsData) => statsData.title} />
            <button
              className="closeStats"
              onClick={closeStats}>
            </button>
          </div>
          :
          <div></div>
        }
      </div>
    </div>
  );
}
