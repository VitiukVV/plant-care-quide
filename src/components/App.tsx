import { ThemeProvider } from '@mui/material';
import { createContext, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DataItem, PlantsListType, Task } from '../interface/interface';
import { customColors } from '../theme/theme';
import AppBar from './appBar/AppBar';
import Home from './pages/home/Home';

const Details = lazy(() => import('./pages/details/Details'));
const Garden = lazy(() => import('./pages/garden/Garden'));
const Identification = lazy(
  () => import('./pages/identification/Identification')
);
const TodoList = lazy(() => import('./pages/todo/TodoList'));

export const PlantsList = createContext<PlantsListType>({
  data: [],
  tasks: [],
  addPlant: () => {},
  removePlant: () => {},
  addTask: () => {},
});

const App = () => {
  const [data, setData] = useState<DataItem[]>(() => {
    const savedData = localStorage.getItem('plantsData');
    return savedData ? JSON.parse(savedData) : [];
  });
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('plantsData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addPlant = (newData: DataItem[]) => {
    setData(prevData => [...prevData, ...newData]);
  };

  const addTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const removePlant = (plantIndex: number) => {
    setData(prevData => {
      const newData = [...prevData];
      newData.splice(plantIndex, 1);
      return newData;
    });
  };

  return (
    <ThemeProvider theme={customColors}>
      <PlantsList.Provider
        value={{ data, tasks, addPlant, removePlant, addTask }}
      >
        <Routes>
          <Route path="/" element={<AppBar />}>
            <Route index element={<Home />} />
            <Route path="garden" element={<Garden />} />
            <Route path="garden/details/:plantID" element={<Details />} />
            <Route path="identification" element={<Identification />} />
            <Route path="todo" element={<TodoList />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </PlantsList.Provider>
    </ThemeProvider>
  );
};

export default App;
