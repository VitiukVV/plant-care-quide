import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataItem, PlantsList } from '../App';

type PlantsListCardProps = {
  plantData: DataItem;
  index: number;
};

const PlantsListCard = ({ plantData, index }: PlantsListCardProps) => {
  const plantsList = useContext(PlantsList);

  return (
    <li>
      <h3>{plantData.commonName}</h3>
      <p>{plantData.botanicName}</p>
      <p>in {plantData.room}</p>
      <button type="button" onClick={() => plantsList.removePlant(index)}>
        Delete
      </button>
      <Link to={`${plantData.botanicName}`}>Details about plant</Link>
    </li>
  );
};

export default PlantsListCard;
