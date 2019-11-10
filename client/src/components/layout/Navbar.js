import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Nav = styled.nav`
    width: 100%;
    display: none;
    align-items: center;
    justify-content: space-evenly;

    @media only screen and (min-width: 768px){
        display: flex;
    }
`;

const MobileNav = styled.nav`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @media only screen and (min-width: 768px){
        display: none;
    }
`;

const NavbarItem = styled.li`
    list-style: none;
    color: #fff;
    margin: 15px 0;

    @media screen and (min-width: 768px){
        list-style: none;
        display: inline;
        color: #fff;
    }
`;

const NavbarLink = styled(Link)`
    color: #fff;
    padding: 15px;
    text-decoration: none;
    transition: all 0.2s ease;

    :hover {
        color: #0A44F5;
    }
`;

const Logo = styled.h1`
    color: #fff;

    a {
        text-decoration: none;
        color: inherit;
    }
`;

const MobileNavMenu = styled.div`
    position: absolute;
    width: 100%;
    top: 101%;
    left: 0;
    background: #888;
    padding-top: ${props => props.show ? '20px' : '0'};
    transition: all 0.7s ease;
    height: ${props => props.show ? '100vh' : '0'};
    overflow: hidden;
`;

const Navbar = ({isAuthenticated, logout}) => {
    const [showMobileNavMenu, setShowMobileNavMenu] = useState(false);

    const navbarStyle = {
        background: showMobileNavMenu ? '#888': 'rgb(71,88,138)',
        position: showMobileNavMenu && 'fixed',
        borderBottom: showMobileNavMenu && '2px solid #111',
        top: 0
    }

    const showMobileNav = () => {
        if(showMobileNavMenu) {
            setShowMobileNavMenu(false);
            document.getElementsByTagName('body')[0].className = ''
        } else {
            setShowMobileNavMenu(true);
            document.getElementsByTagName('body')[0].className = 'no-scroll'
        }
    }

    const onClick = e => {
        logout()
        showMobileNav()
    }

    return (
        <div className="navbar" style={navbarStyle}>
            <Nav>
                <Logo><Link to="/">Trulocal</Link></Logo>
                <ul >
                    <NavbarItem>
                        <NavbarLink to="/" className="active">Home</NavbarLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavbarLink to="/homes">Buy</NavbarLink>
                    </NavbarItem>
                    {isAuthenticated ? 
                        <NavbarItem>
                            <NavbarLink to="/" onClick={logout}>Logout</NavbarLink>
                        </NavbarItem>
                        :
                        <Fragment>
                            <NavbarItem>
                                <NavbarLink to="/register">Sign Up</NavbarLink>
                            </NavbarItem>
                            <NavbarItem>
                                <NavbarLink to="/login">Login</NavbarLink>
                            </NavbarItem>
                        </Fragment>
                    }
                </ul>
            </Nav>
            <MobileNav>
                <Logo><Link to="/" onClick={() => setShowMobileNavMenu(false)}>Trulocal</Link></Logo>
                {showMobileNavMenu ? (
                    <FontAwesomeIcon icon="times" className="menuBtn" onClick={showMobileNav}/>
                ) : (
                    <FontAwesomeIcon icon="bars" className="menuBtn" onClick={showMobileNav}/>
                )}
                <MobileNavMenu className="mobileNav" show={showMobileNavMenu}>
                    <ul>
                        <NavbarItem>
                            <NavbarLink to="/" className="active" onClick={showMobileNav}>Home</NavbarLink>
                        </NavbarItem>
                        <NavbarItem>
                            <NavbarLink to="/homes" onClick={showMobileNav}>Buy</NavbarLink>
                        </NavbarItem>
                        {isAuthenticated ? 
                            <NavbarItem>
                                <NavbarLink to="/" onClick={onClick}>Logout</NavbarLink>
                            </NavbarItem>
                            :
                            <Fragment>
                                <NavbarItem>
                                    <NavbarLink to="/register" onClick={showMobileNav}>Sign Up</NavbarLink>
                                </NavbarItem>
                                <NavbarItem>
                                    <NavbarLink to="/login" onClick={showMobileNav}>Login</NavbarLink>
                                </NavbarItem>
                            </Fragment>
                        }
                    </ul>
                </MobileNavMenu>
            </MobileNav>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {logout})(Navbar)
