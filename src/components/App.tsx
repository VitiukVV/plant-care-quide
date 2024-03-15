import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppBar from './appBar/AppBar';
import Home from './pages/home/Home';

const AddPlant = lazy(() => import('./pages/addPlant/AddPlant'));
const Schedule = lazy(() => import('./pages/schedule/Schedule'));
const YourRooms = lazy(() => import('./pages/yourRooms/YourRooms'));
const Room = lazy(() => import('./pages/room/Room'));
const Details = lazy(() => import('./pages/details/Details'));
const Garden = lazy(() => import('./pages/garden/Garden'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppBar />}>
        <Route index element={<Home />} />
        <Route path="rooms" element={<YourRooms />} />
        <Route path="rooms/:room" element={<Room />} />
        <Route path="rooms/:room/:details" element={<Details />} />
        <Route path="garden" element={<Garden />} />
        <Route path="garden/:details" element={<Details />} />
        <Route path="add" element={<AddPlant />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
