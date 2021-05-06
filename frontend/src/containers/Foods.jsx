import React, { Fragment } from 'react';

export const Foods = ({match}) => {
  return (
    <Fragment>
      フード一覧
      {console.log(match)}
      <p>
      restaurantsIdは {match.params.restaurantsId} です
      </p>
    </Fragment>
  )
}
