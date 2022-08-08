import {
    ALL_REPORT_FAIL,
    ALL_REPORT_REQUEST,
    ALL_REPORT_SUCCESS,
    ADMIN_REPORT_REQUEST,
    ADMIN_REPORT_SUCCESS,
    ADMIN_REPORT_FAIL,
    NEW_REPORT_REQUEST,
    NEW_REPORT_SUCCESS,
    NEW_REPORT_FAIL,
    NEW_REPORT_RESET,
    UPDATE_REPORT_REQUEST,
    UPDATE_REPORT_SUCCESS,
    UPDATE_REPORT_FAIL,
    UPDATE_REPORT_RESET,
    DELETE_REPORT_REQUEST,
    DELETE_REPORT_SUCCESS,
    DELETE_REPORT_FAIL,
    DELETE_REPORT_RESET,
    REPORT_DETAILS_REQUEST,
    REPORT_DETAILS_FAIL,
    REPORT_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,
    CLEAR_ERRORS,
  } from "../constants/ReportConstants";
  
  export const ReportsReducer = (state = { Reports: [] }, action) => {
    switch (action.type) {
      case ALL_REPORT_REQUEST:
      case ADMIN_REPORT_REQUEST:
        return {
          loading: true,
          Reports: [],
        };
      case ALL_REPORT_SUCCESS:
        return {
          loading: false,
          Reports: action.payload.Reports,
          ReportsCount: action.payload.ReportsCount,
          resultPerPage: action.payload.resultPerPage,
        };
      case ADMIN_REPORT_SUCCESS:
        return {
          loading: false,
          Reports: action.payload,
        };
      case ALL_REPORT_FAIL:
      case ADMIN_REPORT_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  