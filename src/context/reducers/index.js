import {
  combineReducers
} from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";

const myReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});

export default myReducer;