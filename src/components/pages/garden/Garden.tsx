import { Link } from 'react-router-dom';

const Garden = () => {
  return (
    <div>
      <h2>Your Garden</h2>
      <Link to={'details'}>details of plant</Link>
    </div>
  );
};

export default Garden;
