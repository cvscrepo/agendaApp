import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './components/Navbar/Navbar'
import CalendaScheduler from './components/CalendarSheduler/CalendaScheduler'
import { SnackbarProvider } from './utils/AlertSnackBar'
import { SchedulerProvider } from './components/CalendarSheduler/context'


function App() {

  return (

    <SnackbarProvider>
      <SchedulerProvider>
        <Navbar />
        <CalendaScheduler />
      </SchedulerProvider>
    </SnackbarProvider>
  )
}

export default App
