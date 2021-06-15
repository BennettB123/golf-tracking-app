import React from 'react';
import './Header.css';

class Header extends React.Component {
    render() {
      return (
        <div className="HeaderContainer">
            <h1 className="Header">Golf Score Tracker</h1>
            <hr />
        </div>
        );
    }
}

export default Header;