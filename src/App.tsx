import { Toaster } from "react-hot-toast"
import './App.css'

import AppRoutes from './routing/Routes'




function App() {
  return (

    <>
    
        <AppRoutes />
        <Toaster
          position="top-center"
          reverseOrder={false}
        />

    </>
  )
}

export default App
