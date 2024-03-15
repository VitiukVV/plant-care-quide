import { Link } from 'react-router-dom';

type Rooms = string[];
const rooms: Rooms = ['first', 'second'];

const YourRooms = () => {
  return (
    <div>
      <h1>Your Romms</h1>
      <ul>
        {rooms.map(room => (
          <li key={room}>
            <Link to={`${room}`}>{room}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourRooms;
