import React, { useEffect, useState } from 'react';

//Welcome to my Continent Form Recruiters!
type Props = {
    handleContinentChange: (continent: string) => void;  // This prop will be callback function to give the selectedOption to the parent
    continentList: { [key: string]: string};  // The parent will hold the continents to avoid any react antipattern
    };

const ContinentForm: React.FC<Props> = ({ handleContinentChange, continentList }) => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(event.target.value);
    };

    useEffect(() => {
        console.log(`Selected option: ${selectedOption}`); //We'll also console.log the result!
        //handleContinentChange(selectedOption);     ~The handleContinent function will provide the Continent to the father component~
      }, [selectedOption, handleContinentChange]);

    return (
        <div>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value=""> ~Select a Continent~ </option>
          {Object.entries(continentList).map(([key, continentName]) => ( // IN this mapping we're getting each key and their values from the parent dict
            <option key={key} value={key}>
              {continentName}
            </option>
          ))}
        </select>
      </div>
      );
}

export default ContinentForm;