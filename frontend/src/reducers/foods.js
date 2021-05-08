import { REQUEST_STATE } from '../constants';

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  foodsList: [],
};

export const foodsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
}

export const foodsReducer = (state, action) => {
  switch (action.type) {
    case foodsActionTypes.FETCHING:
      console.log(state)
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case foodsActionTypes.FETCH_SUCCESS:
      console.log(action.payload)
      return {
        fetchState: REQUEST_STATE.OK,
        foodsList: action.payload.foods,
      }
    default:
      throw new Error();
  }
}
