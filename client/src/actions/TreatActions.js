import {
  CREATE_TREAT_REQUEST,
  CREATE_TREAT_SUCCESS,
  CREATE_TREAT_FAIL,
  MY_TREATS_REQUEST,
  MY_TREATS_SUCCESS,
  MY_TREATS_FAIL,
  REPORT_TREATS_REQUEST,
  REPORT_TREATS_SUCCESS,
  REPORT_TREATS_FAIL,
  ALL_TREATS_REQUEST,
  ALL_TREATS_SUCCESS,
  ALL_TREATS_FAIL,
  UPDATE_TREAT_REQUEST,
  UPDATE_TREAT_SUCCESS,
  UPDATE_TREAT_FAIL,
  DELETE_TREAT_REQUEST,
  DELETE_TREAT_SUCCESS,
  DELETE_TREAT_FAIL,
  TREAT_DETAILS_REQUEST,
  TREAT_DETAILS_SUCCESS,
  TREAT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/TreatConstants";

import axios from "axios";

// Create Treat
export const createTreat = (treat) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TREAT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/treat/new", treat, config);

    dispatch({ type: CREATE_TREAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_TREAT_FAIL,
      payload: error.response.data.error,
    });
  }
};

// report Treats
export const reportTreats = (id) => async (dispatch) => {
  try {
    dispatch({ type: REPORT_TREATS_REQUEST });

    const { data } = await axios.get(`/api/treat/report/${id}`);

    dispatch({ type: REPORT_TREATS_SUCCESS, payload: data.treats });
  } catch (error) {
    dispatch({
      type: REPORT_TREATS_FAIL,
      payload: error.response.data.error,
    });
  }
};

// my Treats
export const myTreats = () => async (dispatch) => {
  try {
    dispatch({ type: MY_TREATS_REQUEST });

    const { data } = await axios.get("/api/treats/me");

    dispatch({ type: MY_TREATS_SUCCESS, payload: data.treats });
  } catch (error) {
    dispatch({
      type: MY_TREATS_FAIL,
      payload: error.response.data.error,
    });
  }
};

// // Get All Treats (admin)
// export const getAllTreats = () => async (dispatch) => {
//   try {
//     dispatch({ type: ALL_TREATS_REQUEST });

//     const { data } = await axios.get("/api/v1/admin/treats");

//     dispatch({ type: ALL_TREATS_SUCCESS, payload: data.data });
//   } catch (error) {
//     dispatch({
//       type: ALL_TREATS_FAIL,
//       payload: error.response.data.error,
//     });
//   }
// };

// // Update Treat
// export const updateTreat = (id, treat) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_TREAT_REQUEST });

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const { data } = await axios.put(
//       `/api/v1/admin/treat/${id}`,
//       treat,
//       config
//     );

//     dispatch({ type: UPDATE_TREAT_SUCCESS, payload: data.success });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_TREAT_FAIL,
//       payload: error.response.data.error,
//     });
//   }
// };

// // Delete Treat
// export const deleteTreat = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_TREAT_REQUEST });

//     const { data } = await axios.delete(`/api/v1/admin/treat/${id}`);

//     dispatch({ type: DELETE_TREAT_SUCCESS, payload: data.success });
//   } catch (error) {
//     dispatch({
//       type: DELETE_TREAT_FAIL,
//       payload: error.response.data.error,
//     });
//   }
// };

// // Get Treat Details
// export const getTreatDetails = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: TREAT_DETAILS_REQUEST });

//     const { data } = await axios.get(`/api/v1/treat/${id}`);

//     dispatch({ type: TREAT_DETAILS_SUCCESS, payload: data.data });
//   } catch (error) {
//     dispatch({
//       type: TREAT_DETAILS_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Clearing Errors
// export const clearErrors = () => async (dispatch) => {
//   dispatch({ type: CLEAR_ERRORS });
// };
