import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { AppContext, IApp } from "providers/AppProvider";
import { Box } from "@material-ui/core";
import { Student } from "utils/types";
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component";
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component";
import { filterStudentBasedOnState, getStudentList } from "utils";
import { useApi } from "shared/hooks/use-api";
import { Person } from "shared/models/person";

export const ActivityPage: React.FC = () => {
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-activities" })
  const { students  } = useContext(AppContext) as IApp;
  const [allStudents, setAllStudents] = useState<any>([]);
  
  useEffect(() => {
    void getStudents()
  }, [getStudents])

  useEffect(() => {
    setAllStudents(students);
  }, [])

  const makeData = () => {

  }
  const getAllData = () => {
    const formatedData: any = [];
    data?.activity.map((act: any) => {
      const obj: any = {};
      obj.id = act.entity.id;
      obj.first_name = act.entity.name.split(" ")[0];
      obj.last_name = act.entity.name.split(" ")[1];
      obj.state = act.entity.student_roll_states[0].roll_state;
      formatedData.push(obj);
    });
    return formatedData;
  }
  useEffect(() => {
    if (data?.activity) {
      setAllStudents(getAllData());
    }
  }, [data])
  const onItemClick = (type: string) => {
    if (type === "all") {
      setAllStudents(getAllData());
    } else {
      const filteredStudents = filterStudentBasedOnState(getAllData(), type);
      setAllStudents(filteredStudents);
    }
  }
  return (
    <S.Container>
      <S.TopHeader>
        <RollStateList
            stateList={[
              { type: "all", count: data?.activity?.length},
              { type: "present", count: getStudentList("present", getAllData())},
              { type: "late", count: getStudentList("late", getAllData())},
              { type: "absent", count: getStudentList("absent", getAllData()) },
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
