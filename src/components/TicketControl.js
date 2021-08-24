import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";


class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTicket: null,
      editing: false
    };
  }
  //handles actions to be completed when button is clicked. If there is a selected ticket, do not show form, set ticket to null, do not show editing form. Else, toggle form. 
  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        //formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      // this.setState(prevState => ({
      //   formVisibleOnPage: !prevState.formVisibleOnPage
      // }));
      const { dispatch } = this.props;
      const action = {
        type: 'TOGGLE_FORM'
      }
      dispatch(action);
    }
  }
  //CREATE: creates new ticket when submit button is clicked on in NewTicketForm. Triggered within handleFormSubmission function, where the inputs from form are passed into the function. changes form to false  
  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newTicket;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    //this.setState({formVisibleOnPage: false});
    const action2 = {
      type: 'TOGGLE_FORM'
    }
    dispatch(action2);
  }
  //DETAIL:this is passed down to TicketList, then Ticket, and thus is an example of prop drilling.
  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = ticketToEdit;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }
  //DELETE: this is passed to TicketDetail, where it is attached to the delete button 
  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_TICKET',
      id: id
    }
    dispatch(action);
    this.setState({ selectedTicket: null });
  }
  //Handle Edit Button: this is passed to TicketDetail, where it is attached to the edit button 
  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({ editing: true });
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.masterTicketList[id];
    this.setState({ selectedTicket: selectedTicket });
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState = <EditTicketForm ticket={this.state.selectedTicket} onEditTicket={this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket={this.state.selectedTicket} onClickingDelete={this.handleDeletingTicket} onClickingEdit={this.handleEditClick} />
      buttonText = "Return to Ticket List";
      // While our TicketDetail component only takes placeholder data, we will eventually be passing the value of selectedTicket as a prop.
    }
    else if (this.props.formVisibleOnPage) {
      // This conditional needs to be updated to "else if."
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.props.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
      // Because a user will actually be clicking on the ticket in the Ticket component, we will need to pass our new handleChangingSelectedTicket method as a prop.
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

TicketControl.propTypes = {
  masterTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    masterTicketList: state.masterTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

// Note: we are now passing mapStateToProps into the connect() function.

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;




//It should be clear where we will need to dispatch Redux actions - the exact same place where we previously used setState() to change our form's visibility. When refactoring an application to use Redux instead of React for state, this can be a very helpful way to see where the refactor needs to happen. We don't necessarily need to create new methods in our components. We just need to rewire the relevant methods to use Redux instead of React for state.