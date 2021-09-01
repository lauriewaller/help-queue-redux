import * as c from "./../actions/ActionTypes";

export default (state = {}, action) => {
  const { names, location, issue, id, formattedWaitTime, timeOpen } = action;
  switch (action.type) {
    case c.ADD_TICKET:
      return Object.assign({}, state, {
        [id]: {
          names: names,
          location: location,
          issue: issue,
          id: id,
          timeOpen: timeOpen,
          formattedWaitTime: formattedWaitTime,
        },
      });
    //timeOpen will store when a ticket was opened while formattedWaitTime will store a string with user-friendly elapsed wait time (such as "2 minutes ago").
    case c.DELETE_TICKET:
      let newState = { ...state };
      delete newState[id];
      return newState;
    case c.UPDATE_TIME:
      const newTicket = Object.assign({}, state[id], { formattedWaitTime }); //?
      const updatedState = Object.assign({}, state, {
        [id]: newTicket,
      });
      //Since the updatedTicket's id already exists in the copy of the ticket list, the old ticket will be replaced with the updated ticket.
      return updatedState;
    default:
      return state;
  }
};
