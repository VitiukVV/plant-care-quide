import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppBar from './appBar/AppBar';
import Home from './pages/home/Home';

const AddPlant = lazy(() => import('./pages/addPlant/AddPlant'));
const Schedule = lazy(() => import('./pages/schedule/Schedule'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppBar />}>
        <Route index element={<Home />} />
        <Route path="/add" element={<AddPlant />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
