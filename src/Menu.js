import React, { Component } from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

class Menu extends Component {

  onSelectAlert = (eventKey) => {
    alert('Alert from menu item.\n' + eventKey: eventKey );
  }

  render() {
  return (
    <div>
      <DropdownButton bsSize="large" title="Select location" id="dropdown-size-large">
        <MenuItem title="Berlin" eventKey={1} onSelect={this.onSelectAlert}>{this.props.l1}</MenuItem>
        <MenuItem title="London">{this.props.l2}</MenuItem>
       </DropdownButton>
    </div>

  );
  }
}

export default Menu;
