import {
  combineReducers
} from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import allUserReducer from "./allUserReducer";
import allNewsReducer from "./allNewsReducer";
import allBlogReducer from "./allBlogReducer";
import allProjectReducer from "./allProjectReducer";

const myReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  allUsers: allUserReducer,
  allNews: allNewsReducer,
  allBlog: allBlogReducer,
  allProject: allProjectReducer,
});

export default myReducer;