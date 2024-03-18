import { useContext } from 'react';
import { PlantsList } from '../App';
import PlantsListCard from '../plantsListCard/PlantsListCard';

const GardenList = () => {
  const plantsList = useContext(PlantsList);
  return (
    <ul>
      {plantsList.data.map((plant, index) => {
        return <PlantsListCard key={index} index={index} plantData={plant} />;
      })}
    </ul>
  );
};

export default GardenList;
