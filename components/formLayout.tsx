import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function FormLayout({ children }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {children}
    </div>
  );
}

export default FormLayout;