import React, { Component } from 'react'
import {FaAlignRight, FaHome} from 'react-icons/fa'
import {Link} from 'react-router-dom'

export default class Navbar extends Component {
    state={
        isOpen: false
    }

    handleToggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        return (
            <nav className='navbar'>
                <div className='nav-center'>
                    <div className='nav-header'>
                        
                        <div className='logotype'>
                            <Link to='/'>
                                <div className='logo'>
                                    <FaHome size={49} />
                                </div>
                                <div className='logo-text'>
                                    <span>SCHVBERTT</span><br />
                                    <span>APARTMENTS</span>
                                </div>
                            </Link>
                        </div>
                        <button 
                        type='button' 
                        className='nav-btn'
                        onClick={this.handleToggle}
                        >
                            <FaAlignRight className='nav-icon' />
                        </button>
                    </div>
                    <ul className={this.state.isOpen 
                    ? 'nav-links show-nav'
                    : 'nav-links'}>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/rooms'>Rooms</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
