import { useQuery } from '@apollo/client';
import { GET_COUNTRIES_BY_CONTINENT } from '@/lib/countriesQueries';


export default function Home() {

  const { loading, error, data } = useQuery(GET_COUNTRIES_BY_CONTINENT, {
    variables: { continent },
  });

  const shuffledCountries = [...data.countries].sort(() => 0.5 - Math.random()); //Shuffles the countries from the continent
  const countries = shuffledCountries.slice(0, 5); //The number 5 will eventually be replaced by the number in the counterForm

  return (
    <>

    </>
  )
}
