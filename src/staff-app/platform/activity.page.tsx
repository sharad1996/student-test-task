import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { AppContext, IApp } from "providers/AppProvider";
import { Box } from "@material-ui/core";
import { Student } from "utils/types";
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component";
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component";
import { filterStudentBasedOnState, getStudentList } from "utils";

export const ActivityPage: React.FC = () => {
  const { students  } = useContext(AppContext) as IApp;
  const [allStudents, setAllStudents] = useState<any>([]);
  useEffect(() => {
    setAllStudents(students);
  }, [])

  const onItemClick = (type: string) => {
    if (type === "all") {
      setAllStudents(students);
    } else {
      const filteredStudents = filterStudentBasedOnState(students, type);
      
      setAllStudents(filteredStudents);
    }
  }

  return (
    <S.Container>
      <S.TopHeader>
        <RollStateList
            stateList={[
              { type: "all", count: getStudentList("all", students)},
              { type: "present", count: getStudentList("present", students)},
              { type: "late", count: getStudentList("late", students)},
              { type: "absent", count: getStudentList("absent", students) },
            ]}
            onItemClick={onItemClick}
          />
      </S.TopHeader>
      <Box>
        {allStudents.map((s: Student) => (
          <StudentListTile key={s.id} isRollMode={true} student={s} onlyList />
        ))}
        {allStudents.length === 0 && (
          <S.NoRecord>
            No list found !!!
          </S.NoRecord>
        )}
      </Box>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 0;
  `,
  TopHeader: styled.div`
    margin-bottom: 30px;
  `,
  NoRecord: styled.div`
  background: #fff;
  padding: 30px;
  text-align: center;
  font-weight: bold;
  margin-top: 30px;
  `
}
