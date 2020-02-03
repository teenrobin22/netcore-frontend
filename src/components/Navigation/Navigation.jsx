import React, { Fragment, Component } from 'react';
import {
  Collapse,
  NavbarToggler,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { NavLink as NavLinkRouter } from 'react-router-dom';
import Login from './Login';
import { withRouter } from 'react-router-dom';
import './Navigation.css';

class Navigation extends Component {
  state = {
    dropdownOpen: false
  };

  toogleHandler = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  render() {
    const { isAuthenticated, decodedToken, logout, currentUser } = this.props;
    const { dropdownOpen } = this.state;
    let toolbarMenu = null;
    if (isAuthenticated) {
      toolbarMenu = (
        <Nav navbar>
          <NavItem>
            <NavLink tag={NavLinkRouter} exact to='/members'>
              Activities
            </NavLink>
          </NavItem>
          
        </Nav>
      );
    }

    let userInfoArea = isAuthenticated ? (
      <div className='dropdown'>
        <ButtonDropdown isOpen={dropdownOpen} toggle={this.toogleHandler}>
          <img
            className='UserPhoto'
            src={
              currentUser.photoUrl
                ? currentUser.photoUrl
                : require('../../assets/user.png')
            }
            alt={currentUser && currentUser.username}
          />
          <DropdownToggle caret color='primary'>
            Welcome {decodedToken.unique_name}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag={NavLinkRouter} exact to='/member/edit'>
              <i className='fa fa-user'></i>Edit Profile
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={logout}>
              <i className='fa fa-sign-out'></i>Logout
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    ) : (
      <Login />
    );

    return (
      <Fragment>
        <Navbar
          className='navbar navbar-expand-md navbar-dark bg-primary'
          light
          expand='md'
        >
          <NavbarBrand tag={NavLinkRouter} exact to='/'>
            FindYourMatch.com
          </NavbarBrand>
          <NavbarToggler></NavbarToggler>
          <Collapse navbar>{toolbarMenu}</Collapse>
          {userInfoArea}
        </Navbar>
      </Fragment>
    );
  }
}

export default withRouter(Navigation);
