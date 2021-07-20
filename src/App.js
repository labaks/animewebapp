import React, { useEffect, useState } from 'react';
import './App.css';

import SearchBar from './components/SearchBar';
import Card from './components/Card';

import { PieChart } from 'react-minimal-pie-chart';
import { FaTimes } from "react-icons/fa";

export default function App() {

  const url = 'https://api.jikan.moe/v3/search/anime';
  const [results, setResults] = useState();
  const [statsOpen, setStatsOpen] = useState(false);
  const [stats, setStats] = useState();
  const [statsData, setStatsData] = useState();
  const [currentAnime, setCurrentAnime] = useState();

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
    let res = results.results;
    transformStats(data);
    console.log("openStats");
    console.log("results", results);
    for (var i in res) {
      if (res[i].mal_id == id) {
        setCurrentAnime(results.results[i]);
        
      }
    }
    console.log("current", currentAnime);
    setStatsOpen(true);
  };

  const transformStats = (data) => {
    console.log("data", data);
    let arr = [
      { title: 'Watching', value: parseInt(data.watching), color: "#ee7752" },
      { title: 'Completed', value: parseInt(data.completed), color: "#e73c7e" },
      { title: 'Holded', value: parseInt(data.on_hold), color: "#23a6d5" },
      { title: 'Plan to watch', value: parseInt(data.plan_to_watch), color: "#23d5ab" },
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
            <div className="pieLine">
              <div className="pieLegend">
                {statsData.map(elem => {
                  return (
                    <div className="legendItem">
                      <p>{elem.title}</p>
                      <b
                        className="colorBlock"
                        style={{ background: elem.color }}></b>

                    </div>
                  )
                })}
              </div>
              <div className="pieHolder">
                <PieChart
                  style={{ height: '250px' }}
                  label={({ dataEntry }) => dataEntry.value}
                  labelStyle={{ fontSize: '8px', fill: 'white' }}
                  data={statsData} />
              </div>
            </div>
            <button
              className="closeStats"
              onClick={closeStats}>
              <FaTimes />
            </button>
          </div>
          :
          <div></div>
        }
      </div>
    </div>
  );
}
