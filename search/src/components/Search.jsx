import axios from "axios";
import { useState } from "react";
import Qnojo from "../assets/transferir.png";
import "../App.css";
// ssh: git@github.com:FranciscoKL/Search.git

const Search = () => {
  const [query, setQuery] = useState("");
  const [resposta, setResposta] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const key =
    "f53b93574ba6b8a224a31b6714ec63fcb9f7f5d76cc382b7053c8ae4f4bb9b0c";

  const handleSubmit = async (e) => {
    e.prevenDefault();
    if (!query) {
      return;
    }
    setLoading(true);

    const URL = "https://serpapi.com/search.json";
    try {
      const res = await axios.get(URL, {
        params: {
          q: query,
          engine: "google",
          google_domain: "google.com.br",
          api_key: key,
          hl: "pt-br",
          gl: "br",
          num: 10,
        },
      });
      const data = await res.json();
      setResposta(data);
    } catch (erro) {
      console.error(erro);
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
        <ul className="conteinerResultado">
          {erro ? (
            <h4>{erro}</h4>
          ) : loading ? (
            <h4>Loading</h4>
          ) : (
            resposta.map((r, indice) => {
              return (
                <li key={indice}>
                  <a href={r.link} target="_blank" rel="noopener noreferrer">
                    {r.title}
                  </a>
                  <p>{r.snippet}</p>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default Search;
