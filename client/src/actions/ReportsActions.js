import axios from "axios";
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
  UPDATE_REPORT_REQUEST,
  UPDATE_REPORT_SUCCESS,
  UPDATE_REPORT_FAIL,
  DELETE_REPORT_REQUEST,
  DELETE_REPORT_SUCCESS,
  DELETE_REPORT_FAIL,
  REPORT_DETAILS_REQUEST,
  REPORT_DETAILS_FAIL,
  REPORT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/ReportConstants";

// get reports
export const getReports = (keyword="") => async (dispatch) => {
  try {
    dispatch({ type: ALL_REPORT_REQUEST });

    let link = `/api/reports?keyword=${keyword}`;

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_REPORT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// report details
export const reportDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: REPORT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/report/${id}`);

    dispatch({
      type: REPORT_DETAILS_SUCCESS,
      payload: data.report,
    });
  } catch (error) {
    dispatch({
      type: REPORT_DETAILS_FAIL,
      payload: error.response.data.error,
    });
  }
};

// clearing errors
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
