import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { UserReducer } from "./reducers/UserReducers";
import { ReportsReducer } from "./reducers/ReportReducers";

const reducer = combineReducers({
    user: UserReducer,
    reports: ReportsReducer
});

let initialState = {};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store