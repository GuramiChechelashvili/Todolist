import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom'

const Navbar = (props) => {
  return (
    <nav className="nav-wrapper green accent-3">
      <div className="container">
        <Link className="brand-logo" to="/">List of things to do</Link>
        <ul className="right">
          <li><NavLink exact to="/">Back To Categories</NavLink></li>
        </ul>
      </div>
    </nav> 
  )
}

export default withRouter(Navbar)