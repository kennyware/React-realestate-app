import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import ConvertPrice from '../../utils/ConvertPrice';

const HomeItem = ({home, saved}) => {

    

    const HomeImage = styled.img`
        width: 100%;
        height: auto;
    `;

    const PropertyCard = styled.div`
        background: #fff;
        width: 100%;
        padding: 10px;
    `;

    const HeartIcon = styled(FontAwesomeIcon)`
        color: #fff;
        background: none;
        border: none;
        margin: 15px 20px;
        position: absolute;
        top: 0;
        right: 0;
    `;

    return (
        <Link to={`/home/${home.mlsId}`} className="homeItem-link">
            <div className="home-item">
                <div className="flex-container">
                    <div className="home-itemImg-wrapper">
                        {saved && <HeartIcon icon="heart" size="lg"/>}
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
                    </PropertyCard>
                </div>
            </div>
        </Link>
    )
}

HomeItem.propTypes = {
    home: PropTypes.object.isRequired
}

export default HomeItem
