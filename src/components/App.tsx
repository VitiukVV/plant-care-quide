import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppBar from './appBar/AppBar';
import Home from './pages/home/Home';

const Details = lazy(() => import('./pages/details/Details'));
const Garden = lazy(() => import('./pages/garden/Garden'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppBar />}>
        <Route index element={<Home />} />
        <Route path="garden" element={<Garden />} />
        <Route path="garden/:details" element={<Details />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
