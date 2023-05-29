import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
      }
    }
  }
`;

export const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      results {
        id
        name
      }
    }
  }
`;
