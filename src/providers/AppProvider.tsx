import React from 'react';

interface Student {
  id: number;
  first_name: string;
  last_name: string;
}
export interface IApp {
  students: Array <Student>;
  updateStudentState: (studentID: number | string, state: string) => void;
}

export const AppContext = React.createContext<IApp | null>(null);


// eslint-disable-next-line no-undef
export const AppProvider = ({ children, data }: { children: any, data: any }) => {
    return (
    <AppContext.Provider value={{ ...data }}>
      {children}
      
    </AppContext.Provider>
  );
};

export default AppProvider;
