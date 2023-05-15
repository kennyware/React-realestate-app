import { useHistory } from "react-router-dom";
import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getHomes, sortHomes } from "../../actions/homes";
import HomeItem from "../layout/HomeItem";
import Spinner from "../misc/Spinner";
import styled from "styled-components";
import Filter from "../layout/Filter";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoBox,
} from "@react-google-maps/api";

const MapDiv = styled.div`
  width: 59%;
  height: calc(100vh - 170px);
  border-right: 1px solid rgba(3, 3, 3, 0.4);
  margin-right: 1%;
  display: inline-block;

  @media screen and (min-width: 500px) {
    height: calc(100vh - 130px);
  }
`;

const HomesDiv = styled.div`
  width: 40%;
  max-height: calc(100vh - 170px);
  overflow: auto;
  display: inline-block;

  @media screen and (min-width: 500px) {
    max-height: calc(100vh - 130px);
  }
`;

const InfoBoxContent = styled.div`
  background: #fff;
  padding: 10px;
  width: 100%;
  height: 70px;

  display: flex;
  align-content: center;
  font-size: 1.1em;

  .info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
     
    * {
      margin-bottom: 2.5px;
    }
  }
  img {
    width: 50px;
    height: auto
    margin-right: 10px;
  }
`;

const GOOGLE_MAP_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const center = { lat: 29.689418, lng: -95.474464 };
const containerStyle = {
  width: "100%",
  height: "100%",
};

const ListHomes = ({
  getHomes,
  homes: { homes, filteredHomes, loading, results },
  location,
  user,
  sortHomes,
}) => {
  const [selected, setSelected] = useState("");
  const [showMap, setShowMap] = useState(true);
  const [showSort, setShowSort] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedHome, setSelectedHome] = useState(null);
  const history = useHistory();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_KEY,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (homes.length < 1) {
      getHomes(params.get("q"));
    }

    const mediaMatch = (mediaQuery) => {
      if (mediaQuery.matches) {
        setShowSearch(false);
        setShowMap(false);
        setShowSort(false);
      }
    };

    const mediaQuery = window.matchMedia("(min-width: 500px)");

    mediaMatch(mediaQuery);
    mediaQuery.addEventListener("change", mediaMatch);

    document.addEventListener("click", ({ target }) => {
      const select = document.getElementsByClassName("custom-select selecting");
      if (select.length > 0) {
        if (target !== select[0]) {
          select[0].classList.remove("selecting");
        }
      }
    });

    return () => {
      mediaQuery.removeEventListener("change", mediaMatch);
    };
  }, [getHomes, location.search, homes]);

  const showHomes = () =>
    homes.map((home) => {
      if (user && user.saved_props.includes(home.mlsId)) {
        return <HomeItem key={home.listingId} home={home} saved />;
      } else {
        return <HomeItem key={home.listingId} home={home} />;
      }
    });

  const showFilteredHomes = () =>
    filteredHomes.map((home) => {
      if (user && user.saved_props.includes(home.mlsId)) {
        return <HomeItem key={home.listingId} home={home} saved />;
      } else {
        return <HomeItem key={home.listingId} home={home} />;
      }
    });

  const handleSelect = ({ target }) => {
    setSelected(target.innerHTML);
    sortHomes(target.getAttribute("value"));
    setShowSort(false);
    const select = document.getElementsByClassName("custom-select");
    select[0].classList.remove("selecting");
  };

  const openSelect = ({ target }) => {
    target.classList.toggle("selecting");
  };

  const trimPrice = (price) => {
    let trimmed = price.toString();
    if (price.toString().length > 3) {
      trimmed = price.toString().slice(0, price.toString().length - 3) + "k";
    }

    if (price.toString().length > 6) {
      trimmed = price.toString().slice(0, price.toString().length - 6) + "m";
    }

    if (price.toString().length > 9) {
      trimmed = price.toString().slice(0, price.toString().length - 9) + "b";
    }

    return "$" + trimmed;
  };

  const handleClick = (home) => {
    history.push(`/home/${home.mlsId}`);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Filter searching={showSearch} />
          <div className="mobile-options">
            <button
              className="options-btn"
              onClick={() => setShowSearch(!showSearch)}
              type="button"
            >
              {showSearch ? "Close Search" : "Search"}
            </button>
            <ul className="options-list">
              <li className="options-item">
                <button
                  className={showMap ? "options-btn hide" : "options-btn"}
                  onClick={() => setShowSort(true)}
                >
                  Sort
                </button>
              </li>
              <li className="options-item">
                <button
                  className={showMap ? "options-btn hide" : "options-btn"}
                  onClick={() => setShowMap(true)}
                >
                  Map
                </button>
              </li>
              <li className="options-item">
                <button
                  className={showMap ? "options-btn" : "options-btn hide"}
                  onClick={() => setShowMap(false)}
                >
                  List
                </button>
              </li>
            </ul>
          </div>
          <div className="home-map-list-container">
            {showMap ? (
              isLoaded && (
                <GoogleMap
                  center={center}
                  zoom={9}
                  // mapContainerStyle={containerStyle}
                  mapContainerClassName="mobile-map"
                  options={{
                    disableDoubleClickZoom: true,
                    disableDefaultUI: true,
                    clickableIcons: false,
                    gestureHandling: "cooperative",
                    noClear: true,
                  }}
                >
                  {homes &&
                    homes.map((home) => (
                      <Marker
                        key={home.mlsId}
                        position={{ lat: home.geo.lat, lng: home.geo.lng }}
                        icon={{
                          path: window.google.maps.SymbolPath.CIRCLE,
                          scale: 6,
                          strokeColor: "white",
                          fillColor: selectedHome
                            ? selectedHome.mlsId === home.mlsId
                              ? "blue"
                              : "#cc3131"
                            : "#cc3131",
                          fillOpacity: 1,
                          strokeWeight: 2,
                        }}
                        onClick={() => {
                          handleClick(home);
                        }}
                        zIndex={10}
                      />
                    ))}
                </GoogleMap>
              )
            ) : (
              <Fragment>
                <MapDiv className="map">
                  {isLoaded && (
                    <GoogleMap
                      center={center}
                      zoom={9}
                      mapContainerStyle={containerStyle}
                    >
                      {homes &&
                        homes.map((home) => (
                          <Marker
                            key={home.mlsId}
                            position={{ lat: home.geo.lat, lng: home.geo.lng }}
                            icon={{
                              path: window.google.maps.SymbolPath.CIRCLE,
                              scale: 6,
                              strokeColor: "white",
                              fillColor: selectedHome
                                ? selectedHome.mlsId === home.mlsId
                                  ? "blue"
                                  : "#cc3131"
                                : "#cc3131",
                              fillOpacity: 1,
                              strokeWeight: 2,
                            }}
                            onMouseOver={() => {
                              setSelectedHome(home);
                            }}
                            onMouseOut={() => setSelectedHome(null)}
                            onClick={() => handleClick(home)}
                          />
                        ))}

                      {selectedHome && (
                        <InfoBox
                          position={{
                            lat: selectedHome.geo.lat,
                            lng: selectedHome.geo.lng,
                          }}
                          options={{
                            closeBoxURL: "",
                            alignBottom: true,
                            pixelOffset: new window.google.maps.Size(-70, -10),
                            boxStyle: {
                              width: "140px",
                            },
                          }}
                        >
                          <InfoBoxContent>
                            <img src={selectedHome.photos[0]} alt="" />
                            <div className="info-container">
                              <h4>{trimPrice(selectedHome.listPrice)}</h4>
                              <p>
                                {selectedHome.property.bedrooms || "--"} bd,{" "}
                                {selectedHome.property.bathsFull || "--"} ba
                              </p>
                              <p>{selectedHome.property.area || "--"} sqft</p>
                            </div>
                          </InfoBoxContent>
                        </InfoBox>
                      )}
                    </GoogleMap>
                  )}
                </MapDiv>
                <HomesDiv className="home-list-container">
                  <div
                    className={
                      showSort
                        ? "mobile-select modal"
                        : "mobile-select modal hidden"
                    }
                  >
                    <div className="header">
                      <div className="header-left">
                        <button
                          className="modal-close-btn"
                          onClick={() => setShowSort(false)}
                        >
                          Close
                        </button>
                      </div>
                      <div className="header-title">Sort</div>
                      <div className="header-right"></div>
                    </div>

                    <div className="mobile-select-options">
                      <ul className="mobile-select-options-list">
                        <li
                          className="select-btn"
                          value="listprice"
                          onClick={handleSelect}
                        >
                          Price (Low to High)
                        </li>
                        <li
                          className="select-btn"
                          value="-listprice"
                          onClick={handleSelect}
                        >
                          Price (High to Low)
                        </li>
                        <li
                          className="select-btn"
                          value="listdate"
                          onClick={handleSelect}
                        >
                          Newest
                        </li>
                        <li
                          className="select-btn"
                          value="beds"
                          onClick={handleSelect}
                        >
                          Bedrooms
                        </li>
                        <li
                          className="select-btn"
                          value="baths"
                          onClick={handleSelect}
                        >
                          Bathrooms
                        </li>
                      </ul>
                    </div>
                  </div>
                  <h3 className="results-header">
                    Real Estate &amp; Homes For Sale
                  </h3>
                  <div className="select-clearfix">
                    <div className="select-wrapper">
                      <strong>Sort by:</strong>
                      <div className="custom-select" onClick={openSelect}>
                        {selected ? selected : "Homes for you"}
                        <div className="select-drop">
                          <div
                            className="select-option"
                            onClick={handleSelect}
                            value="listprice"
                          >
                            Price (Low to High)
                          </div>
                          <div
                            className="select-option"
                            onClick={handleSelect}
                            value="-listprice"
                          >
                            Price (High to Low)
                          </div>
                          <div
                            className="select-option"
                            onClick={handleSelect}
                            value="listdate"
                          >
                            Newest
                          </div>
                          <div
                            className="select-option"
                            onClick={handleSelect}
                            value="beds"
                          >
                            Bedrooms
                          </div>
                          <div
                            className="select-option"
                            onClick={handleSelect}
                            value="baths"
                          >
                            Bathrooms
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {(homes.length > 0 || filteredHomes.length > 0) &&
                  results === true ? (
                    <div className="grid-container home-list">
                      {filteredHomes.length > 0
                        ? showFilteredHomes()
                        : showHomes()}
                    </div>
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: "50px",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      No matching results found
                    </div>
                  )}
                </HomesDiv>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  homes: state.homes,
  user: state.auth.user,
});

ListHomes.propTypes = {
  homes: PropTypes.object.isRequired,
  getHomes: PropTypes.func.isRequired,
  sortHomes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getHomes, sortHomes })(ListHomes);
