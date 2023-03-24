import { ThemeProvider } from "@material-ui/core"
import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import "shared/helpers/load-icons"
import { useApi } from "shared/hooks/use-api"
import { Person } from "shared/models/person"
import { Header } from "staff-app/components/header/header.component"
import { HomeBoardPage } from "staff-app/daily-care/home-board.page"
import { ActivityPage } from "staff-app/platform/activity.page"
import theme from "theme/theme"
import AppProvider from "providers/AppProvider"

function App() {
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  
  useEffect(() => {
    void getStudents()
  }, [getStudents])
  return (
    <ThemeProvider theme={theme}>
        <Header />
        <AppProvider data={{students: data?.students}}>
          <Routes>
            <Route path="daily-care" element={<HomeBoardPage />} />
            <Route path="activity" element={<ActivityPage />} />
            <Route path="*" element={<div>No Match</div>} />
          </Routes>
        </AppProvider>
    </ThemeProvider>
  )
}

export default App
