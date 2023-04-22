import React from 'react';

type Props = {
  countryName: string;
  countryRegion: string;
  countryCapital: string;
  countryLanguages: string[];
  countryCurrencies: string[];
};

const CountryCard: React.FC<Props> = ({countryName, countryRegion, countryCapital, countryLanguages, countryCurrencies }) => {
  return (
      <div className='flex flex-col mt-5 border-4 border-[#21A179] shadow-md rounded-lg gap-5 w-full'>
        <div className='text-center mt-5'>
          <h1 className='text-5xl'>{countryName}</h1>
          <h5 className='text-xl'>{countryRegion}</h5>
        </div>
        <p><b>Capital: </b>{countryCapital}</p>
        <p><b>Language: </b>{countryLanguages}</p>
        <p className='mb-5'><b>Currencies: </b>{countryCurrencies}</p>
      </div>
  );
};

export default CountryCard;