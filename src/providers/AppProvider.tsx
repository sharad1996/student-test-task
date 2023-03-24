import React, { useEffect, useState } from 'react';
import { Student } from 'utils/types';
export interface IApp {
  students: Array <Student>;
  updateStudentState: (studentID: number | string, state: string) => void;
  updateStudents: (students: Array <Student>) => void;
}

export const AppContext = React.createContext<IApp | null>(null);


// eslint-disable-next-line no-undef
export const AppProvider = ({ children, data }: { children: any, data: any }) => {
  const [students, setStudents] = useState<any>([]);

  useEffect(() => {
    if (data?.students) {
      setStudents(data.students);
    }
  }, [data.students])

  const updateStudents = (students: Array <Student>) => {
    setStudents(students);
  }

  const updateStudentState = (studentID: number | string, state: string) => {
    const updatedStudent = students.map((student: Student) => {
      if (student.id === studentID) {
        student["state"] = state;
      }
      return student;
    });

    setStudents(updatedStudent);
  }

  return (
    <AppContext.Provider
      value={{
        updateStudentState: updateStudentState,
        students,
        updateStudents,
      }}>
      {children}
      
    </AppContext.Provider>
  );
};

export default AppProvider;
