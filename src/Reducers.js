import {combineReducers} from 'redux';
import * as types from './Constants';

const initialState = {
  npcHealth: 100,
  npcState: 0
};

const npcHealth = (state = initialState.npcHealth, action) => {
  switch (action.type) {
    case types.REDUCE_NPC_HEALTH:
      return action.payload;
    default:
      return state;
  }
};

const npcState = (state = initialState.npcState, action) => {
  switch (action.type) {
    case types.SET_NPC_STATE:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  npcHealth,
  npcState
})