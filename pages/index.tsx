import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES_BY_CONTINENT } from "@/lib/countriesQueries";
import ContinentForm from "@/components/continentForm";
import CounterForm from "@/components/counterForm";


type Country = {
  alpha2Code: string;
  name: string;
  capital: string;
  population: number;
  flag: string;
};

const Home = () => {
  const [continent, setContinent] = useState<string>("");
  const [numCountries, setNumCountries] = useState<number>(2);
  const [countryDetails, setCountryDetails] = useState<Country[]>([]);

  const continentList = {
    AF: "Africa",
    AN: "Antarctica",
    AS: "Asia",
    EU: "Europe",
    NA: "North America",
    OC: "Oceania",
    SA: "South America",
  };

  const handleContinentChange = (value: string) => {
      setContinent(value)
  }
  const handleCounterChange = (value: number) => {
    setNumCountries(value)
}

  //Using the useQuery hook we get the needed data, passing continent as a parameter
  const { data } = useQuery(GET_COUNTRIES_BY_CONTINENT, {
    variables: { continent },
  });

  const handleRandomCountries = () => {
    if (data) {
      // This code handes the shuffling of the Data gained from the GRAPHQL
      const shuffledCountries = [...data.countries].sort(
        () => 0.5 - Math.random()
      );
      const countryCodes = shuffledCountries
        .slice(0, numCountries)
        .map((country) => country.code);


      //In this part of the code we get all of the specific countries    (Might refactor later for efficiency purposes)
      Promise.all(
        countryCodes.map((code) =>
          fetch(`https://restcountries.com/v2/alpha/${code}`)
        )
      )
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((countryDetails) => setCountryDetails(countryDetails));
    }
  };

  // Will be used in the future on the submit button of the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numCountriesInput = e.currentTarget.elements.namedItem("numCountries") as HTMLInputElement;
    if (numCountriesInput) {
      setNumCountries(Number(numCountriesInput.value));
    }
    handleRandomCountries();
  };

  return(
    <>
    
      <form onSubmit={handleSubmit}>
        <ContinentForm handleContinentChange={handleContinentChange} continentList={continentList} />
        <CounterForm handleCounterChange={handleCounterChange} />
        <button type="submit">Submit</button>
        
      </form>

    </>
  ) 
};

export default Home;
