import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Good Morning</h1>
      <Link to={'schedule'}>Today's tasks</Link>
      <br />
      <Link to={'rooms'}>Your Rooms</Link>
      <br />
      <Link to={'garden'}>Your Plants</Link>
    </div>
  );
};

export default Home;
