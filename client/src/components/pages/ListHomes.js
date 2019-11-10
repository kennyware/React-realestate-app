import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getHomes, sortHomes } from '../../actions/homes';
import HomeItem from '../layout/HomeItem';
import Spinner from '../misc/Spinner';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import Filter from '../layout/Filter';

const MapDiv = styled.div`
    width: 59%;
    height: calc(100vh - 170px);
    border-right: 1px solid rgba(3,3,3,0.4);
    margin-right: 1%;
    display: inline-block;

    @media screen and (min-width: 500px){
        height: calc(100vh - 130px);
    }
`;

const HomesDiv = styled.div`
    width: 40%;
    max-height: calc(100vh - 170px);
    overflow: auto;
    display: inline-block;

    @media screen and (min-width: 500px){
        max-height: calc(100vh - 130px);
    }
`;

const MapMiniMarker = styled.div`
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: 2px solid #fff;
    background: #cc3131;

    hover: {
        background: #3cbd4b;
    }
`;
const MapComponent = props => {
    return (
        <GoogleMapReact bootstrapURLKeys={{key: 'AIzaSyDGbFei4QdX0y8icjVeLloa5IdqFS3cz4A'}} defaultCenter={{lat: 29.689418, lng: -95.474464}} defaultZoom={7}>
            {props.homes && props.homes.map(home => <MapMiniMarker key={home.mlsId} lat={home.geo.lat} lng={home.geo.lng}/>)}
        </GoogleMapReact>
    )
}

const ListHomes = ({getHomes, homes: {homes, filteredHomes, loading, results}, location, user, sortHomes}) => {
    const [selected, setSelected] = useState('');
    const [showMap, setShowMap] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        if(homes.length < 1) {
            getHomes(params.get('q'))
        }

        const mediaMatch = mediaQuery => {
            if(mediaQuery.matches) {
                setShowSearch(false);
                setShowMap(false);
                setShowSort(false);
            }
        }

        const mediaQuery = window.matchMedia("(min-width: 500px)");

        mediaMatch(mediaQuery);
        mediaQuery.addEventListener("change", mediaMatch)

        document.addEventListener('click', ({target}) => {
            const select = document.getElementsByClassName('custom-select selecting')
            if(select.length > 0) {
                if(target !== select[0]){
                    select[0].classList.remove('selecting')
                }
            }
        })

        return () => {
            mediaQuery.removeEventListener("change", mediaMatch)
        }

    }, [getHomes, location.search, homes])

    const showHomes = () => homes.map(home => {
        if(user && user.saved_props.includes(home.mlsId)) {
            return <HomeItem key={home.listingId} home={home} saved/>
        } else {
            return <HomeItem key={home.listingId} home={home} />
        }
    })

    const showFilteredHomes = () => filteredHomes.map(home => {
        if(user && user.saved_props.includes(home.mlsId)) {
            return <HomeItem key={home.listingId} home={home} saved/>
        } else {
            return <HomeItem key={home.listingId} home={home} />
        }
    })
    
    const handleSelect = ({target}) => {
        setSelected(target.innerHTML)
        sortHomes(target.getAttribute('value'))
        setShowSort(false);
        const select = document.getElementsByClassName('custom-select');
        select[0].classList.remove('selecting');
    }

    const openSelect = ({target}) => {
        target.classList.toggle('selecting')
    }
    
    return (
        <Fragment>
            {loading ? 
                (<Spinner />) 
                : 
                (
                    <Fragment>
                        <Filter searching={showSearch}/>
                        <div className="home-map-list-container">
                            <div className="mobile-options">
                                <div className="options-search">
                                    <button className="options-btn" onClick={() => setShowSearch(!showSearch)}>{showSearch ? "Close Search" : "Search"}</button>
                                </div>
                                <ul className="options-list">
                                    <li className="options-item">
                                        <button className={showMap ? "options-btn hide" : "options-btn"} onClick={() => setShowSort(true)}>Sort</button>
                                    </li>
                                    <li className="options-item">
                                        <button className={showMap ? "options-btn hide" : "options-btn"} onClick={() => setShowMap(true)}>Map</button>
                                    </li>
                                    <li className="options-item">
                                        <button className={showMap ? "options-btn" : "options-btn hide"} onClick={() => setShowMap(false)}>List</button>
                                    </li>
                                </ul>
                            </div>
                            {showMap ? 
                            <div className="mobile-map">
                                <MapComponent homes={homes}/>
                            </div>
                            : 
                            <Fragment>
                                <MapDiv className="map"><MapComponent homes={filteredHomes.length > 0 ? filteredHomes : results && homes}/></MapDiv>
                                <HomesDiv className="home-list-container">
                                    <div className={showSort ? "mobile-select modal" : "mobile-select modal hidden"}>
                                        <div className="header">
                                            <div className="header-left">
                                                <button className="modal-close-btn" onClick={() => setShowSort(false)}>Close</button>
                                            </div>
                                            <div className="header-title">Sort</div>
                                            <div className="header-right"></div>
                                        </div>
                                        
                                        <div className="mobile-select-options">
                                            <ul className="mobile-select-options-list">
                                                <li className="select-btn" value="listprice" onClick={handleSelect}>Price (Low to High)</li>
                                                <li className="select-btn" value="-listprice" onClick={handleSelect}>Price (High to Low)</li>
                                                <li className="select-btn" value="listdate" onClick={handleSelect}>Newest</li>
                                                <li className="select-btn" value="beds" onClick={handleSelect}>Bedrooms</li>
                                                <li className="select-btn" value="baths" onClick={handleSelect}>Bathrooms</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <h3 className="results-header">Real Estate &amp; Homes For Sale</h3>
                                    <div className="select-clearfix">
                                        <div className="select-wrapper">
                                            <strong>Sort by:</strong>
                                            <div className="custom-select" onClick={openSelect}>
                                                {selected ? selected : 'Homes for you'}
                                                <div className="select-drop">
                                                    <div className="select-option" onClick={handleSelect} value="listprice">Price (Low to High)</div>
                                                    <div className="select-option" onClick={handleSelect} value="-listprice">Price (High to Low)</div>
                                                    <div className="select-option" onClick={handleSelect} value="listdate">Newest</div>
                                                    <div className="select-option" onClick={handleSelect} value="beds">Bedrooms</div>
                                                    <div className="select-option" onClick={handleSelect} value="baths">Bathrooms</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {((homes.length > 0 || filteredHomes.length > 0) && results === true) ? 
                                        <div className="grid-container home-list">{filteredHomes.length > 0 ? showFilteredHomes() : showHomes()}</div>
                                        :
                                        <div style={{
                                            textAlign: "center", 
                                            marginTop: "50px", 
                                            fontWeight: "bold", 
                                            fontSize: "20px"
                                        }}>
                                            No matching results found
                                        </div>
                                    }
                                </HomesDiv>
                            </Fragment>
                            }
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

const mapStateToProps = state => ({
    homes: state.homes,
    user: state.auth.user,
})

ListHomes.propTypes = {
    homes: PropTypes.object.isRequired,
    getHomes: PropTypes.func.isRequired,
    sortHomes: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { getHomes, sortHomes })(ListHomes)
