
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { AppHeader } from "./cmps/AppHeader";
export function App() {

  return (
    <Router>
      <header>
        <AppHeader />
      </header>
      <body>
        <Routes>
          <Route element={<Home />} path="/" />
        </Routes>
      </body>
    </Router>
  )

}


