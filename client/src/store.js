import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProfileReducer, UserReducer } from "./reducers/UserReducers";
import { MyReportsReducer, NewReportReducer, ReportDetailsReducer, ReportReducer, ReportsReducer } from "./reducers/ReportReducers";
import { MyTreatsReducer, NewTreatReducer, ReportTreatsReducer } from "./reducers/TreatReducer";

const reducer = combineReducers({
    user: UserReducer,
    profile: ProfileReducer,
    reports: ReportsReducer,
    report: ReportReducer,
    reportDetails: ReportDetailsReducer,
    newReport: NewReportReducer,
    myTreats: MyTreatsReducer,
    myReports: MyReportsReducer,
    reportTreats: ReportTreatsReducer,
    newTreat: NewTreatReducer
});

let initialState = {};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store