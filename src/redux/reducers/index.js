import { combineReducers } from "redux";
import user from "./user";
import all_events from "./all_events";
import my_events from "./my_events";

const allReducers = combineReducers({ user, all_events, my_events });

export default allReducers;
