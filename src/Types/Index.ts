export interface Character {
  id: string;
  name: string;
}

export interface SceneData {
  id: string;
  description: string;
  location: string;
  characters: Character[];
}
