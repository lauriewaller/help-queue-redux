import formVisibleReducer from './form-visible-reducer';
import ticketListReducer from './ticket-list-reducer';
import { combineReducers } from 'redux'; //The final import statement is the combineReducers() function from Redux. This is not part of React Redux - this is core Redux functionality. Whenever we create a reducer that combines other reducers, we need to import this function.


const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterTicketList: ticketListReducer
});

//combineReducers() takes an object as an argument. That object contains key-value pairs. The key represents the state slice while the value represents the reducer that handles actions related to that state slice. 

//And that's a root reducer. It just combines other reducers into a single file. 

export default rootReducer;