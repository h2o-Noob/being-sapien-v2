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
  UPDATE_TREAT_RESET,
  DELETE_TREAT_REQUEST,
  DELETE_TREAT_SUCCESS,
  DELETE_TREAT_FAIL,
  DELETE_TREAT_RESET,
  TREAT_DETAILS_REQUEST,
  TREAT_DETAILS_SUCCESS,
  TREAT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/TreatConstants";

export const NewTreatReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TREAT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_TREAT_SUCCESS:
      return {
        loading: false,
        treat: action.payload,
      };

    case CREATE_TREAT_FAIL:
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

export const ReportTreatsReducer = (state = { treats: [] }, action) => {
  switch (action.type) {
    case REPORT_TREATS_REQUEST:
      return {
        loading: true,
      };

    case REPORT_TREATS_SUCCESS:
      return {
        loading: false,
        treats: action.payload,
      };

    case REPORT_TREATS_FAIL:
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

export const MyTreatsReducer = (state = { treats: [] }, action) => {
  switch (action.type) {
    case MY_TREATS_REQUEST:
      return {
        loading: true,
      };

    case MY_TREATS_SUCCESS:
      return {
        loading: false,
        treats: action.payload,
      };

    case MY_TREATS_FAIL:
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

// export const allTreatsReducer = (state = { treats: [] }, action) => {
//   switch (action.type) {
//     case ALL_TREATS_REQUEST:
//       return {
//         loading: true,
//       };

//     case ALL_TREATS_SUCCESS:
//       return {
//         loading: false,
//         treats: action.payload,
//       };

//     case ALL_TREATS_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };

//     default:
//       return state;
//   }
// };

// export const treatReducer = (state = {}, action) => {
//   switch (action.type) {
//     case UPDATE_TREAT_REQUEST:
//     case DELETE_TREAT_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };

//     case UPDATE_TREAT_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isUpdated: action.payload,
//       };

//     case DELETE_TREAT_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isDeleted: action.payload,
//       };

//     case UPDATE_TREAT_FAIL:
//     case DELETE_TREAT_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     case UPDATE_TREAT_RESET:
//       return {
//         ...state,
//         isUpdated: false,
//       };

//     case DELETE_TREAT_RESET:
//       return {
//         ...state,
//         isDeleted: false,
//       };
//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };

//     default:
//       return state;
//   }
// };

// export const treatDetailsReducer = (state = { treat: {} }, action) => {
//   switch (action.type) {
//     case TREAT_DETAILS_REQUEST:
//       return {
//         loading: true,
//       };

//     case TREAT_DETAILS_SUCCESS:
//       return {
//         loading: false,
//         treat: action.payload,
//       };

//     case TREAT_DETAILS_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };

//     default:
//       return state;
//   }
// };
