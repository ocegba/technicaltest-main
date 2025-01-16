import Sites from '@pages/Sites';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <HashRouter>
        <Routes>
          <Route element={<Navigate to="/sites" />} path="/" />
          <Route element={<Sites />} path="/sites" />
        </Routes>
    </HashRouter>
  )
}

export default App
