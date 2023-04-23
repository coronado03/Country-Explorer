import React from 'react';

type Props = {
  countryName: string;
  countrySubregion: string;
  countryPopulation: number;
  countryRegion: string;
  countryCapital: string;
  countryLanguages: string[];
  countryCurrencies: string[];
  countryFlag: string;
};

const CountryCard: React.FC<Props> = ({countryName, countryRegion, countrySubregion, countryPopulation, countryCapital, countryLanguages, countryCurrencies, countryFlag }) => {
 
 
 
  return (
      <div className='flex flex-col mt-5 border-4 border-black shadow-md rounded-lg gap-5 w-full'>
        <div className='flex flex-col text-center mt-5'>
          <h1 className='text-5xl'>{countryName}</h1>
          <div className='w-1/2 self-center mt-4 border border-black'>       
            <img className='w-fit' src={countryFlag} alt=''></img>
          </div>
          <h5 className='text-xl'>{countryRegion}, {countrySubregion}</h5>
        </div>
        <div className='mb-5 mx-auto'>   
          <p><b>Capital: </b>{countryCapital}</p>
          <p><b>Population: </b>{countryPopulation.toLocaleString()}</p> 
          <p><b>Language: </b>{countryLanguages.join(", ")}</p>
          <p><b>Currencies: </b>{countryCurrencies.join(", ")}</p>
        </div>

      </div>
  );
};

export default CountryCard;