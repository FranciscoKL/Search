import  express  from "express";
import cors from "cors";
import axios from "axios";
const PORT = 4000;

const app = express();

app.use(cors());

app.get("/search", async (req , res) => {
    const {query} = req.query;
    const key =
    "f53b93574ba6b8a224a31b6714ec63fcb9f7f5d76cc382b7053c8ae4f4bb9b0c";
    const URL = "https://serpapi.com/search.json";
    try {
      const respo = await axios.get(URL, {
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
      
      res.json(respo.data);
    } catch (err) {
        res.status(500).json({erro: "Ocorreu um erro ao fazer a requisição á API"});

    }

    

});

app.listen(PORT, () => {
    console.log('O proxy esta rodando na porta', PORT);
});