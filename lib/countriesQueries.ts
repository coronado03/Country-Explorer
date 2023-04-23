import { gql } from '@apollo/client';

export const GET_COUNTRIES_BY_CONTINENT = gql`
  query GetCountriesByContinent($continent: String!) {
    countries(filter: { continent: { eq: $continent } }) {
      name
      capital
    }
  }
`;