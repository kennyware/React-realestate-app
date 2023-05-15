import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Landing from "../layout/Landing";
import Content from "../layout/Content";
import Spinner from "../misc/Spinner";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { getHome } from "../../actions/homes";
import { Link } from "react-router-dom";
import { convertToDollar } from "../../utils/ConvertPrice";
import Footer from "../layout/Footer";
import { clearHomes } from "../../actions/homes";

const SlantedSection = styled.section`
  height: 500px;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  margin-top: 100px;

  :before {
    content: "";
    position: absolute;
    bottom: 100%;
    transform: skewY(3deg);
    height: 50%;
    width: 100%;
    transform-origin: left;
    background: #fff;
  }

  :after {
    content: "";
    position: absolute;
    bottom: 0;
    transform: skewY(3deg);
    height: 25%;
    width: 100%;
    transform-origin: left;
    background: #fff;
  }
`;

const DarkBtn = styled(Link)`
  text-decoration: none;
  background: #333;
  padding: 10px 20px;
  color: #fff;
  display: inline-block;
  margin-top: 20px;
  transition: all 0.3s ease;

  :hover {
    background: #09ecec;
    color: #333;
  }
`;
const LightBtn = styled(Link)`
  text-decoration: none;
  background: #fff;
  padding: 10px 20px;
  color: #333;
  display: inline-block;
  margin-top: 20px;
  transition: all 0.3s ease;

  :hover {
    background: rgb(15, 170, 197);
    color: #fff;
  }
`;

const FeaturedSection = styled.section`
  width: 100%;
  height: 700px;
`;

const PropertyCard = styled.div`
  position: relative;
  margin: -70px auto 0;
  background: #fff;
  width: 90%;
  max-height: 250px;
  padding: 10px;
`;

const Home = ({
  homes: { homes, home },
  loading,
  getHome,
  clearHomes,
  history,
}) => {
  useEffect(() => {
    getHome(1005192);
  }, [getHome]);

  const onSearch = (query) => {
    if (homes) {
      clearHomes();
    }
    history.push(`/homes?q=${query}`);
  };

  return (
    <Fragment>
      {home === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Landing search={onSearch} />
          <Content />
          <SlantedSection className="slantedSection">
            <div className="parallax-overlay">
              <div className="parallax-container">
                <h3>Looking For More?</h3>
                <p>Talk to our experts or browse through properties.</p>
                <DarkBtn to="/">Contact</DarkBtn>
                <LightBtn to="/homes">Browse</LightBtn>
              </div>
            </div>
          </SlantedSection>
          <FeaturedSection>
            <div className="featuredProp">
              <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                Featured Property
              </h2>
              <div className="featuredPropImgWrap">
                <Link to={"/home/" + home.mlsId}>
                  <img src={home.photos[0]} alt="Featured Property" />
                </Link>
                <div className="img-overlay"></div>
              </div>
              <PropertyCard>
                <div>
                  <p className="propPrice">
                    <Link to={"/home/" + home.mlsId} className="sale-link">
                      For Sale
                    </Link>{" "}
                    <span className="price">
                      {convertToDollar(home.listPrice)}
                    </span>
                  </p>
                  <p className="propLoc">
                    {home.address.full}
                    <br />
                    {home.address.city}, TX {home.address.postalCode}
                  </p>
                  <p className="propDesc">
                    Enchanting three bedroom, three bath home with spacious one
                    bedroom, one bath cabana, in-laws quarters. Charming living
                    area features fireplace…
                  </p>
                </div>
                <div className="meta-wrap-container">
                  <div className="card-meta">
                    <span className="meta-title">Bedrooms</span>
                    <div>
                      <FontAwesomeIcon icon="bed" />
                      <span className="figure">{home.property.bedrooms}</span>
                    </div>
                  </div>
                  <div className="card-meta">
                    <span className="meta-title">Bathrooms</span>
                    <div>
                      <FontAwesomeIcon icon="bath" />
                      <span className="figure">{home.property.bathsFull}</span>
                    </div>
                  </div>
                  <div className="card-meta">
                    <span className="meta-title">Area</span>
                    <div>
                      <FontAwesomeIcon icon="ruler-combined" />
                      <span className="figure">{home.property.area} Sq Ft</span>
                    </div>
                  </div>
                </div>
              </PropertyCard>
            </div>
          </FeaturedSection>
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  homes: state.homes,
  loading: state.homes.loading,
});

Home.propTypes = {
  homes: PropTypes.object.isRequired,
  getHome: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  clearHomes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getHome, clearHomes })(Home);
