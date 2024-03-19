import { createContext, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppBar from './appBar/AppBar';
import Home from './pages/home/Home';

const Details = lazy(() => import('./pages/details/Details'));
const Garden = lazy(() => import('./pages/garden/Garden'));

export interface DataItem {
  commonName: string;
  botanicName: string;
  room: string;
}

interface PlantsListType {
  data: DataItem[];
  addPlant: (newData: DataItem[]) => void;
  removePlant: (plantIndex: number) => void;
}

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
    <PlantsList.Provider value={{ data, addPlant, removePlant }}>
      <Routes>
        <Route path="/" element={<AppBar />}>
          <Route index element={<Home />} />
          <Route path="garden" element={<Garden />} />
          <Route path="garden/:details" element={<Details />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </PlantsList.Provider>
  );
};

export default App;
