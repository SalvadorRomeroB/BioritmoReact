import { combineReducers } from "redux";
import user from "./user";
import all_events from "./all_events";
import my_events from "./my_events";
import created_events from "./created_events";
import selected_event from "./selected_event";

const allReducers = combineReducers({
  user,
  all_events,
  my_events,
  created_events,
  selected_event
});

export default allReducers;
