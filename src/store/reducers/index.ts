import { combineReducers } from 'redux';
import wallet from './wallet';
import transaction from './transaction';

const rootReducer = combineReducers({
  wallet, transaction,
});

export default rootReducer;
