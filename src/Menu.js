import React, { Component } from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

class Menu extends Component {

  onSelectAlert = (eventKey, evt) => {
    alert('Alert from menu item.\n' + eventKey: eventKey );
    //console.log(this.eventKey.target.innerHTML);
  }

  render() {
  return (
    <div>
      <DropdownButton bsSize="large" title="Select location" id="dropdown-size-large" onSelect={this.props.onSelect}>
         <MenuItem eventKey={this.props.id1} >{this.props.l1}</MenuItem>
         <MenuItem eventKey={this.props.id2} >{this.props.l2}</MenuItem>
        </DropdownButton>

       {/*<button onClick={this.props.onClick}>{this.props.text}</button>*/}
    </div>

  );
  }
}

export default Menu;
