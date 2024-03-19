import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { plantBotanicNames } from '../../data/plantBotanicNames';
import { rooms } from '../../data/rooms';
import sprite from '../../icons/symbol-defs.svg';
import { PlantsList } from '../App';

interface Props {
  onClose: () => void;
}

const AddPlant: React.FC<Props> = ({ onClose }) => {
  const [selectedCommonName, setSelectedCommonName] = useState<string>('');
  const [selectedBotanicName, setSelectedBotanicName] = useState<string>(
    plantBotanicNames[0]
  );
  const [selectedRoom, setSelectedRoom] = useState<string>(rooms[0]);

  const plantsListData = useContext(PlantsList);

  const handleSelect = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ): void => {
    const { name } = e.target;
    switch (name) {
      case 'commonName':
        setSelectedCommonName(e.target.value);
        break;
      case 'botanicName':
        setSelectedBotanicName(e.target.value);
        break;
      case 'room':
        setSelectedRoom(e.target.value);
        break;
      default:
        console.error(`Unhandled input name: ${name}`);
        break;
    }
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    plantsListData.addPlant([
      {
        commonName: selectedCommonName,
        botanicName: selectedBotanicName,
        room: selectedRoom,
      },
    ]);
    onClose();
  };

  return (
    <div
      style={{
        position: 'relative',
        padding: '40px',
        background: '#fff',
        borderRadius: '24px',
        width: '540px',
      }}
    >
      <button
        style={{
          width: '24px',
          height: '24px',
          position: 'absolute',
          right: '16px',
          top: '16px',
          padding: 0,
          margin: 0,
          backgroundColor: 'transparent',
          border: 'none',
        }}
        type="button"
        onClick={onClose}
      >
        <svg style={{ stroke: 'black', width: '24px', height: '24px' }}>
          <use href={`${sprite}#icon-close`} />
        </svg>
      </button>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>
          Whats the name of your plant?
          <input
            name="commonName"
            onChange={handleSelect}
            type="text"
            required
          />
        </label>
        <br />
        <label>
          Botanical Name
          <select
            name="botanicName"
            value={selectedBotanicName}
            onChange={handleSelect}
            required
          >
            {plantBotanicNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Room
          <select
            name="room"
            value={selectedRoom}
            onChange={handleSelect}
            required
          >
            {rooms.map((room, index) => (
              <option key={index} value={room}>
                {room}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button>Add to my Garden</button>
      </form>
    </div>
  );
};

export default AddPlant;
