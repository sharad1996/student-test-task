import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { Typography, Box, Paper, Backdrop, TextField , Dialog, DialogTitle, } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import AppProvider from "providers/AppProvider"
import RollStateModel from "./RollStateModal";
export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [students, setStudents] = useState<any>([]);
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  useEffect(() => {
    if (data?.students) {
      const studentWithInitialState = data?.students.map((student: any) => {
        student["state"] = "unmark"
        return student;
      }) 
      setStudents(studentWithInitialState);
    }
  }, [data])

  const onToolbarAction = (action: ToolbarAction) => {
    if (action === "roll") {
      setIsRollMode(true)
    }
  }

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
    }
  }
  
  const handleSearch = (searchText: string) => {
    console.log("Search ===",searchText)
  }

  const updateStudentState = (studentID, state) => {
    const updatedStudent = students.map(student => {
      if (student.id === studentID) {
        student["state"] = state;
      }
      return student;
    });
    debugger
    setStudents(updatedStudent);
  }

  return (
    <AppProvider data={{students, updateStudentState}}>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} handleSearch={handleSearch} />
        {/* <RollStateModel onSubmit={} open={} /> */}
        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && data?.students && (
          <>
            {data.students.map((s) => (
              <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
    </AppProvider>
  )
}

type ToolbarAction = "roll" | "sort"
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
  handleSearch: (searchText: string) => void;
}
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick, handleSearch } = props
  return (
    <S.ToolbarContainer>
      <div onClick={() => onItemClick("sort")}>First Name 1</div>
      <div>
      <TextField
        size="small"
        variant="standard"
        onChange={(e) => handleSearch(e.target.value)}
      />
      </div>
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}
