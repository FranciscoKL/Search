
import axios from "axios";
import { useState } from "react";
import Qnojo from "../assets/transferir.png";
import "../App.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [resposta, setResposta] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) {
      return;
    }
    setErro("");
    setLoading(true);
    try {
      const URL = 'http://localhost:4000/search'
       
       const res = await axios.get(URL, {
        params: {
          query: query
        }
      });
      setResposta(res.data.organic_results || []);
    }
    catch (err) {
      console.error(err);
      setErro("Houve um erro ao fazer a busca.");
    } finally {
      setLoading(false);
    }
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
      <div>
        {erro ? (
          <h4>{erro}</h4>
        ) : loading ? (
          <h4>Loading</h4>
        ) : (
          <ul className="conteinerResultado">
            {resposta.map((r, indice) => {
              return (
                <li key={indice}>
                  <a href={r.link} target="_blank" rel="noopener noreferrer">
                    {r.title}
                  </a>
                  <p>{r.snippet}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
