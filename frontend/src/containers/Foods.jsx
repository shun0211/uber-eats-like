import React, { Fragment, useEffect, useReducer } from 'react';

// api
import { fetchFoods } from '../apis/foods';

// reducers
import { initialState as foodsInitailState, foodsActionTypes, foodsReducer } from '../reducers/foods';

// constants
import { REQUEST_STATE } from '../constants';

export const Foods = ({match}) => {
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitailState)

  useEffect(() => {
    dispatch({ type: foodsActionTypes.FETCHING })

    fetchFoods(match.params.restaurantsId).then((data) => {
      dispatch({
        type: foodsActionTypes.FETCH_SUCCESS,
        payload: data
      })
    })
  }, [])

  return (
    <Fragment>
      {
        foodsState.fetchState === REQUEST_STATE.LOADING ?
          <Fragment>
            <p>
              ロード中
            </p>
          </Fragment>
        :
          foodsState.foodsList.map((food) =>
            <div key={food.id}>
              {food.name}
            </div>
          )
      }
    </Fragment>
  )
}
