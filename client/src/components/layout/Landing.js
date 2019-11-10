import React from 'react';
import styled from 'styled-components';
import Search from '../forms/Search';

const Section = styled.section`
    width: 100%;
    max-width: 100%;
    height: 100vh;
    position: relative;
    background: rgb(71, 88, 138);
`;

const BackgroundImage = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 0;
    display: none;
    
    @media screen and (min-width: 321px){
        display: block;
    }
`;

const DarkOverlay = styled.div`
    background-color: rgba(0,0,0, 0.4);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    display: none;
    
    @media screen and (min-width: 321px){
        display: block;
    }
`;

const SplashSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    max-width: 1200px;
    margin: auto;
    position: relative;
    z-index: 1;
`;

const HeroSection = styled.div`
    height: 100vh;
    padding-top: 25%;
    // padding-bottom: 10vh;
    width: 100%;

    // @media screen and (max-width: 376px){
    //     padding-top: 25vh;
    // }
`;

const H1Motto = styled.h1`
    color: #fff;
    font-size: 3.25em;
    text-align: center;
    max-width: 600px;
    margin: auto;

    @media screen and (max-width: 768px){
        font-size: 2.3em;
    }
`;

const Sub = styled.p`
    color: #fff;
    font-size: 1.5em;
    text-align: center;
    margin: 30px;
`;

const Landing = ({search}) => {
    
    return (
        <Section className="landing">
            <BackgroundImage className="backgroundImage"></BackgroundImage>
            <DarkOverlay className="overlay"></DarkOverlay>
            <SplashSection>
                <HeroSection>

                    {/* <H1Motto>Reimagine home</H1Motto>
                    <Sub>We’ll help you find a place you’ll love.</Sub> */}
                    <Sub>Looking for a home in an unfamiliar area?</Sub>
                    <H1Motto>We make you feel like a true local.</H1Motto>
                    <Search search={search}/>
                </HeroSection>
            </SplashSection>
        </Section>
    )
}

export default Landing
