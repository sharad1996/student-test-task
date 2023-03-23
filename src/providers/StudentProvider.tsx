import React, { RefObject, useContext, useEffect, useState } from "react";

export interface IStudent {}
export const StudentContext = React.createContext<IStudent | null>(null);

// eslint-disable-next-line no-undef
export const UserProvider = ({children}: {
  children: JSX.Element;
}) => {
  return (
    <StudentContext.Provider value={{ }}>
      {children}
    </StudentContext.Provider>
  );
};

export default UserProvider;
