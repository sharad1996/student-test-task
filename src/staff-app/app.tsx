import { ThemeProvider } from "@material-ui/core"
import React from "react"
import { Routes, Route } from "react-router-dom"
import "shared/helpers/load-icons"
import { Header } from "staff-app/components/header/header.component"
import { HomeBoardPage } from "staff-app/daily-care/home-board.page"
import { ActivityPage } from "staff-app/platform/activity.page"
import theme from "theme/theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Routes>
        <Route path="daily-care" element={<HomeBoardPage />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="*" element={<div>No Match</div>} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
