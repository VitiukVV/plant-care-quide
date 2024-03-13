import { RootState } from '../store';

export const selectCouterValue = (state: RootState) => state.counter.value;
