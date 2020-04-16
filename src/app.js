const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs, likes} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes,
  }

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  // TODO

  const { title, url, techs } = request.body;
  const { id } = request.params;

  const indexRepository = repositories.findIndex(repository => repository.id === id);

  if (indexRepository < 0){
    return response.status(400).json({error: "Project not found"});
  }

  const likes = repositories[indexRepository].likes

  const repository = {
    id,
    title,
    url,
    techs,
    likes,
  }

  repositories[indexRepository] = repository;

  return response.json(repositories);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const indexRepository = repositories.findIndex(repository => repository.id === id);

  if(indexRepository < 0){
    return response.status(400).json({error: "Project not found"});
  }

  repositories.splice(indexRepository, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const indexRepository = repositories.findIndex(repository => repository.id === id);

  if(indexRepository < 0){
    return response.status(400).json({error: "Project not found"});
  }

  const likes = repositories[indexRepository].likes + 1

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }
  
  repositories[indexRepository] = repository;

  return response.json(repository);

});

module.exports = app;
