import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCouterValue } from '../../../store/counter/selectors';
import { decrement, increment } from '../../../store/counter/slice';

const Home = () => {
  const count = useAppSelector(selectCouterValue);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Home;
