import React from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FooterDiv = styled.footer`
        width: 100%;
        background-color: #888;
        margin-top: 50px;
        color: #fff;

        & nav {
            width: 90%;
            margin: auto;
            padding-top: 20px;
            text-align: center;

            ul {
                
                li {
                    list-style: none;
                    display: inline;
                    margin: 0 15px;

                    @media screen and (max-width: 500px) {
                        flex-grow: 1;
                    }

                    a {
                        text-decoration: none;
                        color: #fff;
                        transition: color 0.2s ease;

                        :hover {
                            color: rgb(15, 170, 197);
                        }
                    }
                }
            }
        }
    `;

    const FooterHeading = styled.h3`
        font-size: 1.5rem;
        margin-bottom: 20px;
        padding-top: 20px;
        text-align: center;

        @media screen and (min-width: 700px){
            text-align: left;
        }
    `;

const Footer = () => {
    return (
        <FooterDiv>
            <div className="footer-container">
                <div className="flex-container footer-items-container">
                    <div className="footer-contact footer-item">
                        <div className="flex-containter-down">
                            <FooterHeading>Contact</FooterHeading>
                            <div className="flex-container">
                                <div>
                                    <FontAwesomeIcon icon="location-arrow" className="footer-contact-icon" />
                                </div>
                                <div>
                                    774 NE 84th St Miami, FL 33879
                                </div>
                            </div>
                            <div className="flex-container">
                                <div>
                                    <FontAwesomeIcon icon="phone" className="footer-contact-icon" />
                                </div>
                                <div>
                                    Call us FREE +1 (800) 990 8877
                                </div>
                            </div>
                            <div className="flex-container">
                                <div>
                                    <FontAwesomeIcon icon="fax" className="footer-contact-icon" />
                                </div>
                                <div>
                                    +1 (800) 990 8877
                                </div>
                            </div>
                            <div className="flex-container">
                                <div>
                                    <FontAwesomeIcon icon={['far', 'envelope']} className="footer-contact-icon" />
                                </div>
                                <div>
                                    email@email.com
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-newsletter footer-item">
                        <FooterHeading>Newsletter</FooterHeading>
                        <div className="newsletter-container">
                            <input type="text" className="input-email" placeholder="Enter your email" />
                            <button className="email-submitBtn" >Submit</button>
                        </div>
                    </div>
                </div>
                <nav className="footer-nav">
                    <ul className="flex-container">
                        <li>
                            <a href="!#">About</a>
                        </li>
                        <li>
                            <a href="!#">Contact</a>
                        </li>
                        <li>
                            <a href="!#">Help</a>
                        </li>
                        <li>
                            <a href="!#">Terms of use &amp; Privacy</a>
                        </li>
                    </ul>
                </nav>
            </div>
            
            
        </FooterDiv>
    )
}

export default Footer
