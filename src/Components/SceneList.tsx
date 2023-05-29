import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_CHARACTERS, GET_LOCATIONS } from "../Graphql/Index";
import { Character, SceneData } from "../Types/Index";

const SceneList = () => {
  // Fetching data using Apollo useQuery hook
  const { data: charactersData } = useQuery(GET_CHARACTERS);
  const { data: locationsData } = useQuery(GET_LOCATIONS);

  const [scenes, setScenes] = useState<SceneData[]>(() => {
    const localData = localStorage.getItem("scenes");
    return localData ? JSON.parse(localData) : [];
  });
  const [newSceneDescription, setNewSceneDescription] = useState("");
  const [newSceneLocation, setNewSceneLocation] = useState("");
  const [newSceneCharacters, setNewSceneCharacters] = useState<Character[]>([]);

  // Add a new scene
  const handleAddScene = () => {
    const newScene: SceneData = {
      id: String(scenes.length + 1),
      description: newSceneDescription,
      location: newSceneLocation,
      characters: newSceneCharacters,
    };
    // Add the new scene to the scenes array in state
    setScenes((prevScenes) => [...prevScenes, newScene]);
    // Reset form
    setNewSceneDescription("");
    setNewSceneLocation("");
    setNewSceneCharacters([]);
  };

  // Remove a scene
  const handleRemoveScene = (sceneId: string) => {
    setScenes((prevScenes) =>
      prevScenes.filter((scene) => scene.id !== sceneId)
    );
  };

  // Remove a character from a scene
  const handleRemoveCharacter = (sceneId: string, characterId: string) => {
    setScenes((prevScenes) =>
      prevScenes.map((scene) => {
        if (scene.id === sceneId) {
          // Removing character with the specified ID from the characters array
          const updatedCharacters = scene.characters.filter(
            (character) => character.id !== characterId
          );
          return { ...scene, characters: updatedCharacters };
        }
        return scene;
      })
    );
  };

  // Handle character selection
  const handleCharacterSelection = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCharacterIds = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    ); // Get selected character IDs from the multiple select element
    const selectedCharacters = charactersData.characters.results.filter(
      (character: Character) => selectedCharacterIds.includes(character.id)
    );
    setNewSceneCharacters(selectedCharacters);
  };

  // Set default location and character when data is fetched
  useEffect(() => {
    if (charactersData && locationsData) {
      const defaultLocation = locationsData.locations.results[0].name;
      const defaultCharacter = charactersData.characters.results[0];
      setNewSceneLocation(defaultLocation);
      setNewSceneCharacters([defaultCharacter]);
    }
  }, [charactersData, locationsData]);

  // Save scenes to Local Storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("scenes", JSON.stringify(scenes));
    } catch (error) {
      console.error("Error saving scene data to local storage", error);
    }
  }, [scenes]);

  // RenderScenes function
  const renderScenes = () => (
    <div className="scenes-list">
      {scenes.map((scene) => (
        <div key={scene.id} className="scene">
          <h3>Scene {scene.id}</h3>
          <p>Description: {scene.description}</p>
          <p>Location: {scene.location}</p>
          <p>
            Characters:{" "}
            {scene.characters.map((character) => (
              <span key={character.id}>
                {character.name}
                <button
                  onClick={() => handleRemoveCharacter(scene.id, character.id)}
                >
                  Remove
                </button>
              </span>
            ))}
          </p>
          <button onClick={() => handleRemoveScene(scene.id)}>
            Remove Scene
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="scene-list">
      <div className="scene-list-header">
        <h2>Add Scenes</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddScene();
          }}
          className="scene-form"
        >
          <input
            type="text"
            value={newSceneDescription}
            onChange={(e) => setNewSceneDescription(e.target.value)}
            placeholder="Scene description"
          />

          <select
            value={newSceneLocation}
            onChange={(e) => setNewSceneLocation(e.target.value)}
          >
            {locationsData &&
              locationsData.locations.results.map((location: any) => (
                <option key={location.name} value={location.name}>
                  {location.name}
                </option>
              ))}
          </select>

          <select
            value={
              newSceneCharacters.length > 0 ? newSceneCharacters[0].id : ""
            }
            onChange={handleCharacterSelection}
          >
            {charactersData &&
              charactersData.characters.results.map((character: any) => (
                <option key={character.id} value={character.id}>
                  {character.name}
                </option>
              ))}
          </select>

          <button type="submit">Add Scene</button>
        </form>
      </div>

      {renderScenes()}
    </div>
  );
};

export default SceneList;
