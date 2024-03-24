import { ThemeProvider } from '@mui/material';
import { createContext, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DataItem, PlantsListType } from '../interface/interface';
import { customColors } from '../theme/theme';
import AppBar from './appBar/AppBar';
import Home from './pages/home/Home';

const Details = lazy(() => import('./pages/details/Details'));
const Garden = lazy(() => import('./pages/garden/Garden'));
const Identification = lazy(
  () => import('./pages/identification/Identification')
);

export const PlantsList = createContext<PlantsListType>({
  data: [],
  addPlant: () => {},
  removePlant: () => {},
});

const App = () => {
  const [data, setData] = useState<DataItem[]>(() => {
    const savedData = localStorage.getItem('plantsData');
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem('plantsData', JSON.stringify(data));
  }, [data]);

  const addPlant = (newData: DataItem[]) => {
    setData(prevData => [...prevData, ...newData]);
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
      <PlantsList.Provider value={{ data, addPlant, removePlant }}>
        <Routes>
          <Route path="/" element={<AppBar />}>
            <Route index element={<Home />} />
            <Route path="garden" element={<Garden />} />
            <Route path="garden/:details" element={<Details />} />
            <Route path="identification" element={<Identification />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </PlantsList.Provider>
    </ThemeProvider>
  );
};

export default App;
