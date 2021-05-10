import React, { Fragment, useEffect, useReducer } from 'react';

import { fetchLineFoods } from '../apis/line_foods';

// reducers
import {
  initialState,
  lineFoodsActionTypes,
  lineFoodsReducer
} from '../reducers/lineFoods';

export const Orders = () => {
  const [state, dispatch] = useReducer(lineFoodsReducer, initialState)

  useEffect(() => {
    dispatch({type: lineFoodsActionTypes.FETCHING})

    fetchLineFoods()
      .then((data) => {
        console.log(data);
        dispatch({
          type: lineFoodsActionTypes.FETCH_SUCCESS,
          payload: data
        })
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <Fragment>
      注文一覧
    </Fragment>
  )
}
