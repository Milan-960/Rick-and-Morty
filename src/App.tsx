import React from "react";
import { ApolloProvider } from "@apollo/client";

import "./App.css";
import SceneList from "./Components/SceneList";
import { client } from "./Graphql/Index";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Rick and Morty Episode Scenes</h1>
        <SceneList />
      </div>
    </ApolloProvider>
  );
};

export default App;
