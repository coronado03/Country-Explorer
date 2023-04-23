import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES_BY_CONTINENT } from "@/lib/countriesQueries";
import ContinentForm from "@/components/continentForm";
import CounterForm from "@/components/counterForm";
import CountryCard from "@/components/countryCard";
import CountryCardGrid from "@/components/countryCardGrid";
import FormLayout from "@/components/formLayout";

type Language = {
  name: string;
};

type Currency = {
  name: string;
};

type Country = {
  alpha2Code: string;
  name: string;
  capital: string;
  population: number;
  flag: string;
  subregion:string;
  region: string;
  languages?: Language[];
  currencies: Currency[];
};

const Home = () => {
  const [continent, setContinent] = useState<string>("AF");
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
    console.log(typeof countryDetails[1])
    e.preventDefault();
    const numCountriesInput = e.currentTarget.elements.namedItem("numCountries") as HTMLInputElement;
    if (numCountriesInput) {
      setNumCountries(Number(numCountriesInput.value));
    }
    handleRandomCountries();
  };

  return(
    <>
      <div className="my-6 text-center">
        <h1 className="text-5xl">Country Explorer</h1>
        <p className="text-xl">The app to get in touch with the world!</p>
      </div>
      <form className="flex flex-col text-center" onSubmit={handleSubmit}>
        <FormLayout>
          <p className="text-base">Choose a number between 2-10</p>
          <div className="text-2xl">
            <h2>HOW MANY</h2>
            <h2>COUNTRIES</h2>
          </div>
          <CounterForm handleCounterChange={handleCounterChange} />
        </FormLayout>

        <FormLayout>
          <p className="text-base">Choose a Continent</p>
          <div className="text-2xl"> 
            <h2>WHICH</h2>
            <h2>CONTINENT</h2>
          </div>
          <ContinentForm handleContinentChange={handleContinentChange} continentList={continentList} />
        </FormLayout>

        <button className="self-center text-4xl bg-transparent hover:bg-[#26B865] text-[#26B865] font-semibold hover:text-white py-2 px-4 border border-[#26B865] hover:border-transparent rounded w-2/3 sm:w-1/4 mt-9 transition-all" type="submit">Submit</button>       
        </form>
      <CountryCardGrid>
        {countryDetails.map((country) => (
          <CountryCard 
          key={country.alpha2Code}
          countryName={country.name}
          countryRegion={country.region}
          countrySubregion={country.subregion}
          countryPopulation={country.population}
          countryFlag={country.flag}
          countryCapital={country.capital ?? ['No Capital']}
          countryLanguages={country.languages?.map((language) => language.name) ?? ['No languages']}
          countryCurrencies={country.currencies?.map(currency => currency.name) ?? ['No currency']} />
        ))}
      </CountryCardGrid>
    </>
  ) 
};

export default Home;
