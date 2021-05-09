import React, { Fragment, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// api
import { fetchFoods } from '../apis/foods';

// reducers
import { initialState as foodsInitailState, foodsActionTypes, foodsReducer } from '../reducers/foods';

// images
import MainLogo from '../images/logo.png';
import FoodImage from '../images/food-image.jpg';

// constants
import { REQUEST_STATE } from '../constants';
import { COLORS } from '../style_constants';

// components
import { LocalMallIcon } from '../components/Icons';
import { FoodWrapper } from '../components/FoodWrapper';
import Skeleton from '@material-ui/lab/Skeleton';
import { FoodOrderDialog } from '../components/FoodOrderDialog';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`

const BagIconWrapper = styled.div`
  padding-top: 24px;
`

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`

const MainLogoImage = styled.img`
  height: 90px;
`

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`

const ItemWrapper = styled.div`
  margin: 16px;
`

const submitOrder = () => {
  console.log('登録ボタンが押された！')
}

export const Foods = ({match}) => {
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitailState)

  const initialState = {
    isOpenOrderDialog: false,
    selectedFood: null,
    selectedFoodCount: 1,
  }

  const [state, setState] = useState(initialState);

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
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to='/orders'>
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <FoodsList>
        {
          foodsState.fetchState === REQUEST_STATE.LOADING ?
            <Fragment>
              {
                [...Array(12).keys()].map(i =>
                  <ItemWrapper key={i}>
                    <Skeleton key={i} variant="rect" width={450} height={180} />
                  </ItemWrapper>
                )
              }
            </Fragment>
          :
            foodsState.foodsList.map(food =>
              <itemWrapper key={food.id}>
                <FoodWrapper
                  food={food}
                  onClickFoodWrapper={
                    (food) => setState({
                      ...state,
                      isOpenOrderDialog: true,
                      selectedFood: food,
                    })
                  }
                  imageUrl={FoodImage}
                />
              </itemWrapper>
            )
        }
      </FoodsList>
      {
        state.isOpenOrderDialog &&
          <FoodOrderDialog
            food={state.selectedFood}
            isOpen={state.isOpenOrderDialog}
            onClickCountUp={() =>  setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount + 1
            })}
            onClickCountDown={() => setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount - 1
            })}
            onClickOrder={() => submitOrder()}
            onClose={() => setState({
              ...state,
              isOpenOrderDialog: false,
              selectedFood: null,
              selectedFoodCount: 1
            })}
            countNumber={state.selectedFoodCount}
          />
      }
    </Fragment>
  )
}
