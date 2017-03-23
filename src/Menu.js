import React, { Component } from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

class Menu extends Component {

  onSelectAlert = (eventKey) => {
    alert('Alert from menu item.\n' + eventKey: eventKey );
  }

  render() {
  return (
    <div>
      {/*<DropdownButton bsSize="large" title="Select location (Test)" id="dropdown-size-large" onSelect={this.onSelectAlert}>
         <MenuItem eventKey={1} >{this.props.l1}</MenuItem>
         <MenuItem eventKey={2} >{this.props.l2}</MenuItem>
        </DropdownButton>*/}

       <button onClick={this.props.onClick}>{this.props.text}</button>
    </div>

  );
  }
}

export default Menu;
