import React, { useEffect, useState } from "react";

//Welcome to my Counter Form Recruiters!
type Props = {
  handleCounterChange: (options: number) => void; // This prop will be callback function to give the selectedOption to the parent
};

const CounterForm: React.FC<Props> = ({ handleCounterChange }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const options = [2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    console.log(`Selected option: ${selectedOption}`); //We'll also console.log the result! The same way we did on the continentForm compoent
    //handleCounterChange(selectedOption);     ~The handleCOunter function will provide the Continent to the father component~
  }, [selectedOption, handleCounterChange]);

  return (
    <div>
      <select value={selectedOption} onChange={handleSelectChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CounterForm;
