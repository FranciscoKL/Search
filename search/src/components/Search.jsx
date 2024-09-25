import React, { useState } from "react";
import Qnojo from "../assets/transferir.png";
import axios from "axios";



const Search = () => {
  const [query, setQuery] = useState("");
  const [resposta, setResposta] = useState([]);
  const [erro, setErro] = useState("")
  
  const key = 
  "f53b93574ba6b8a224a31b6714ec63fcb9f7f5d76cc382b7053c8ae4f4bb9b0c"
  
  const handleSubmit = async(e) => {
    e.prevenDefault();
    
    const URL = 'https://serpapi.com/search.json'
    const res = await axios.get(URL, {
      params:{
        q: query,
        engine: "google",
        google_domain: "google.com.br",
        api_key: key,
        hl: "pt-br",
        gl: "br",
        num: 10,

      }
    })
    const data = await res.json();
    setResposta(data);
  };
  

  return (
    <div className="App">
      <div className="Logo">
        <h1>Noodle</h1>
        <img src={Qnojo} alt="Noodle" />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
          <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Search;
