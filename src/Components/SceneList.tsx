import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS, GET_LOCATIONS } from "../Graphql/Index";

interface SceneData {
  id: string;
  description: string;
  location: string;
  characters: string;
}

const SceneList = () => {
  // Fetching data using Apollo useQuery hook
  const { data: charactersData } = useQuery(GET_CHARACTERS);
  const { data: locationsData } = useQuery(GET_LOCATIONS);

  console.log("this is locationsData", locationsData);
  console.log("this is charactersData", charactersData);

  const [scenes, setScenes] = useState<SceneData[]>([]);

  console.log("this is scenes", scenes);

  return (
    <div>
      <h1> SceneList </h1>
    </div>
  );
};

export default SceneList;
