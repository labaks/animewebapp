import { useState } from 'react';
import './App.css';

import SearchBar from './components/SearchBar';

export default function App() {

  const url = 'https://api.jikan.moe/v3/search/anime';
  let resp = '';
  const [searchLine, setSearchLine] = useState('');

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
    resp = await _getData(search);
    console.log("resp", resp)
  };

  return (
    <div className="App">
      <SearchBar
        value={setSearchLine}
        onClick={_setData}
      />
      <p>{searchLine}</p>
    </div>
  );
}
