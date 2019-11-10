import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { getHome } from '../../actions/homes';
import { saveHome, deleteSavedHome } from '../../actions/auth';
import Spinner from '../misc/Spinner';
import ConvertPrice from '../../utils/ConvertPrice';
import GoogleMapReact from 'google-map-react';

const HomeImage = styled.img`
        width: 100%;
        height: auto;
`;

const PropertyCard = styled.div`
    background: #fff;
    width: 100%;
    padding: 10px;
`;

const BackBtn = styled.button`
    color: #fff;
    background: none;
    border: none;
    margin: 15px 20px;
    outline: none;

    :hover {
        cursor: pointer;
    }
`;

const SaveBtn = styled.button`
    color: #fff;
    background: none;
    border: none;
    margin: 15px 20px;
    float: right;
    outline: none;

    :hover {
        cursor: pointer;
    }
`;

const ImageModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
    width: 100%;
    height: 100vh;
    background: #fff;
    overflow: auto;

    @media screen and (min-width: 700px){
        background: rgba(0,0,0,0.5);
    }
`;

const MarkerComponent = () => <div><FontAwesomeIcon icon="map-marker" size="3x" color="red"/></div>

const ViewHome = ({getHome, homes: {home, loading}, match, history, saveHome, deleteSavedHome, user}) => {

    const [isSaved, setIsSaved] = useState(false);
    const [imgModal, setImgModal] = useState(false);

    useEffect(() => {
        if(user && home) {
            user.saved_props.forEach(prop => {
                if(home.mlsId === prop) {
                    setIsSaved(true);
                }           
            })
        }
    },[user, home])
    
    useEffect(() => {
        getHome(match.params.id) ;
    }, [getHome, match.params.id])

    

    const goBack = e => {
        e.stopPropagation();
        history.push('/homes');
    }

    const showModal = () => {
        if(!imgModal){
            setImgModal(true);
            document.getElementsByTagName('body')[0].className = 'no-scroll';
        } else {
            setImgModal(false);
            document.getElementsByTagName('body')[0].className = '';
        }
    }

    const saveBtnClick = e => {
        e.stopPropagation();
        if(isSaved) {
            deleteSavedHome(home.mlsId);
            setIsSaved(!isSaved)
        } else {
            saveHome(home.mlsId);
            setIsSaved(!isSaved)
        }
    }

    return (
        <div>
            {home === null || loading ? <Spinner /> : 
                <div className="home-wrapper">
                    <div className="flex-container">
                        <div className="homeImg-wrapper" onClick={showModal}>
                        <div className="action-bar">
                            <BackBtn onClick={e => goBack(e)}><FontAwesomeIcon icon="chevron-left" size="lg"/></BackBtn>
                            {isSaved ? 
                                <SaveBtn onClick={e => saveBtnClick(e)}><FontAwesomeIcon icon='heart' size="lg"/></SaveBtn>
                            :
                                <SaveBtn onClick={e => saveBtnClick(e)}><FontAwesomeIcon icon={['far', 'heart']} size="lg"/></SaveBtn>
                            }
                        </div>
                            <HomeImage src={home.photos[0]} alt="home full view"/>
                        </div>
                        <PropertyCard>
                            <div>
                                <p className="propPrice">For Sale<span className="price">{ConvertPrice(home.listPrice)}</span></p>
                                <p className="propLoc">
                                    {home.address.full}, {home.address.city}, TX {home.address.postalCode}
                                </p>
                            </div>
                            <div className="meta-wrap-container">
                                <div className="card-meta">
                                    <span className="meta-title">Bedrooms</span>
                                    <div><FontAwesomeIcon icon="bed"/><span className="figure">{home.property.bedrooms}</span></div>
                                </div>
                                <div className="card-meta">
                                    <span className="meta-title">Bathrooms</span>
                                    <div><FontAwesomeIcon icon="bath"/><span className="figure">{home.property.bathsFull}</span></div>
                                </div>
                                <div className="card-meta">
                                    <span className="meta-title">Area</span>
                                    <div><FontAwesomeIcon icon="ruler-combined" /><span className="figure">{home.property.area} Sq Ft</span></div>
                                </div>
                            </div>
                            <div className="property-details-container">
                                <h3>Property Details</h3>
                                <div className="card-meta">
                                    <span className="meta-title">Listing Agent</span>
                                    <p>{home.agent.firstName} {home.agent.lastName}</p>
                                </div>
                                <div className="card-meta">
                                    <span className="meta-title">Unit #</span>
                                    <p>{home.address.unit}</p>
                                </div>
                                <div className="card-meta">
                                    <span className="meta-title">Parking</span>
                                    <p>{home.property.parking.spaces} spaces</p>
                                </div>
                                <div className="card-meta">
                                    <span className="meta-title">Heating</span>
                                    <p>{home.property.heating}</p>
                                </div>
                                <div className="card-meta">
                                    <span className="meta-title">Year Built</span>
                                    <p>{home.property.yearBuilt}</p>
                                </div>
                                <div className="card-meta">
                                    <span className="meta-title">Stories</span>
                                    <p>{home.property.stories}</p>
                                </div>
                                <div className="card-meta">
                                    <span className="meta-title">Days On Market</span>
                                    <p>{home.mls.daysOnMarket}</p>
                                </div>
                            </div>
                        </PropertyCard>
                    </div>
                    <div id="googleMap2" style={{width: '100%', height: '400px'}}>
                        <GoogleMapReact 
                            bootstrapURLKeys={{key: 'AIzaSyDGbFei4QdX0y8icjVeLloa5IdqFS3cz4A'}}
                            defaultCenter={{lat: home.geo.lat, lng: home.geo.lng}}
                            defaultZoom={12} 
                        >
                        <MarkerComponent lat={home.geo.lat} lng={home.geo.lng}></MarkerComponent>
                        </GoogleMapReact>
                    </div>
                    {imgModal && <ImageModal>
                        <div className="imageModal-container">
                            <div className="action-bar">
                                <BackBtn onClick={showModal}><FontAwesomeIcon icon="times" size="lg"/></BackBtn>
                            </div>
                            {home.photos.map((photo, index) => <div key={index}>
                                <HomeImage src={photo} alt="View of home"/>
                            </div>)}
                        </div>
                    </ImageModal>}
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    homes: state.homes,
    user: state.auth.user
})

ViewHome.propTypes = {
    getHome: PropTypes.func.isRequired,
    homes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getHome, saveHome, deleteSavedHome })(ViewHome)
