import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router";
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { Box, TextField } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { AppContext, IApp } from "providers/AppProvider"
import { dynamicAscendingSort, dynamicDescendingSort } from "utils";
import { Student } from 'utils/types';
import useStyles from "./Style";

export const HomeBoardPage: React.FC = () => {
  const history = useNavigate();
  const [isRollMode, setIsRollMode] = useState(false)
  const [sorting, setSorting] = useState<any>({
    firstName: { isAccending: true, name:  'first_name'},
    lastName: { isAccending: true, name: 'last_name'}
  })
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const [saveStudents, saveData] = useApi<{ students: Person[] }>({ url: "save-roll" })
  const { students, updateStudents  } = useContext(AppContext) as IApp;

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  useEffect(() => {
    if (data?.students) {
      const studentWithInitialState = data?.students.map((student: any) => {
        student["state"] = "unmark"
        return student;
      }) 
      updateStudents(studentWithInitialState);
    }
  }, [data])

  useEffect(() => {
    if (saveData?.success) {
      history("/staff/activity")
    }
  }, [saveData])

  const getAscendingOrder = (sortFieldName: string) => {
    return students.sort(dynamicAscendingSort(sorting[sortFieldName].name));
  }

  const getDescendingOrder = (sortFieldName: string) => {
    return students.sort(dynamicDescendingSort(sorting[sortFieldName].name));
  }

  const onToolbarAction = (action: ToolbarAction, sortFieldName: string = "") => {

    if (action === "roll") {
      setIsRollMode(true)
    }
    if (action === "sort") {
      if (sortFieldName && sorting[sortFieldName].isAccending) {
        const sortedData = getDescendingOrder(sortFieldName);
        updateStudents(sortedData)
        const updateSorting = {...sorting, [sortFieldName]: {...sorting[sortFieldName], isAccending: false} };
        setSorting(updateSorting);
      } else {
        const sortedData = getAscendingOrder(sortFieldName || "");
        updateStudents(sortedData);
        const updateSorting = {...sorting, [sortFieldName]: {...sorting[sortFieldName], isAccending: true} };
        setSorting(updateSorting);
      }
    }
  }

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
    }
    if (action === "complete") {
      const updateStudents = JSON.parse(JSON.stringify(students)).map((student: Student) => {
        student["student_id"] = student.id;
        student["roll_state"] = student.state;

        delete student.id;
        delete student.state;
        return student;
      });
      void saveStudents({ student_roll_states: updateStudents })
    }
  }
  
  const handleSearch = (searchText: string) => {
    const filteredStudents = students.filter((student: Student) => {
      if (student.first_name.toLocaleLowerCase().includes(searchText) || student.last_name.toLocaleLowerCase().includes(searchText)) {
        return student;
      }
    })
    if (searchText === "") {
      updateStudents(data?.students)
    } else {
      updateStudents(filteredStudents);
    }
  }
  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} handleSearch={handleSearch} />
        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && students && (
          <>
            {students.map((s: Student) => (
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
    </>
  )
}

type ToolbarAction = "roll" | "sort"
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
  handleSearch: (searchText: string) => void;
}
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick, handleSearch } = props
  const styles = useStyles();

  return (
    <S.ToolbarContainer>
      <Box onClick={() => onItemClick("sort", "firstName")}  className={styles.sorting}>
        <Box component="span">First Name</Box>
        <Box
          component="img"
          src="https://www.pngkit.com/png/full/456-4560379_sort-up-and-down-arrows-couple-comments-sort.png"
          className={styles.sortingImg}
        />
      </Box>
      <Box onClick={() => onItemClick("sort", "lastName")}  className={styles.sorting}>
        <Box component="span">Last Name</Box>
        <Box
          component="img"
          src="https://www.pngkit.com/png/full/456-4560379_sort-up-and-down-arrows-couple-comments-sort.png"
          className={styles.sortingImg}
        />
      </Box>
      <Box>
        <TextField
          size="small"
          variant="outlined"
          onChange={(e) => handleSearch(e.target.value)}
          className={styles.searchInput}
          placeholder="Search..."
          InputProps={{
            className: styles.inputField,
          }}
        />
      </Box>
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
