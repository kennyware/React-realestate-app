import React from 'react';
import styled from 'styled-components';

const Divider = styled.div`
        width: 140px;
        height: 2px;
        background-color: yellow;
        margin: 30px auto 65px;
    `;

    const CardList = styled.div`
        display: ${props => props.display};

    `;

    const Card = styled.div`
        display: flex;
        flex-basis: 280px;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        flex-grow: 0;
        align-items: flex-start;
        text-align: center;
        padding-bottom: 50px;

        & h3 {
            font-size: 1.8em;
        }

        & p {
            margin-top: 15px;
            line-height: 22px;
        }
    `;

    const Button = styled.button`
        background: none;
        border: 1px solid #aaa;
        border-radius: 3px;
        color: rgb(0, 106, 255);
        padding: 10px 15px;
        margin-top: 30px;
        transition: all 0.3s ease;

        :hover {
            background: rgb(0, 106, 255);
            color: #fff;
            cursor: pointer;
        }
    `;

const Content = () => {
    return (
        <section className="content-section">
            <p className="styledParagraph">We have the most listings and constant updates.
            <br/>
                So you’ll never miss out.
            </p>
            <Divider />
            <CardList display="flex">
                <div className="card-flex-container">
                    <Card>
                        <div>
                            <h3>Buy A Home</h3>
                            <p>Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else.</p>
                            <Button>Search homes</Button>
                        </div>
                    </Card>
                    {/* <Card>
                        <div>
                            <h3>Sell A Home</h3>
                            <p>Whether you sell with new Zillow Offers™ or take another approach, we’ll help you navigate the path to a successful sale.</p>
                            <Button>See your options</Button>
                        </div>
                    </Card>
                    <Card>
                        <div>
                            <h3>Rent A Home</h3>
                            <p>We’re creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.</p>
                            <Button>Find rentals</Button>
                        </div>
                    </Card> */}
                </div>
            </CardList>
            
        </section>
    )
}

export default Content
