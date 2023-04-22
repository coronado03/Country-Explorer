import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function CountryCardGrid({ children }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
}

export default CountryCardGrid;