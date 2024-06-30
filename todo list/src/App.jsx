
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { AppHeader } from "./cmps/AppHeader";
import { Provider } from 'react-redux';

import { store } from './store/store.js';

import './assets/style/main.scss'
import { TodoIndex } from './pages/TodoIndex.jsx';
export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section>
          <AppHeader />
        </section>
        <main>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<TodoIndex />} path="/todo" />
          </Routes>
        </main>
      </Router>
    </Provider>
  )

}


