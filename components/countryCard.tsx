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
    <>
    </>
  );
};

export default CountryCard;