import React, { useEffect, useState, useCallback } from "react";
import Search from "../forms/Search";
import { connect } from "react-redux";
import {
  filterHomesByPrice,
  filterHomesByBeds,
  filterHomesByBaths,
  getHomes,
} from "../../actions/homes";

const Filter = ({
  filterHomesByBeds,
  filterHomesByPrice,
  filterHomesByBaths,
  getHomes,
  searching,
  filterParams,
}) => {
  const [priceRange, setPriceRange] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Set component State to app State

    if (
      filterParams.price.minPrice > 0 &&
      filterParams.price.maxPrice < Number.MAX_VALUE
    ) {
      setPriceRange({
        minPrice: filterParams.price.minPrice,
        maxPrice: filterParams.price.maxPrice,
      });
    } else if (
      filterParams.price.minPrice > 0 &&
      filterParams.price.maxPrice > Number.MAX_VALUE
    ) {
      setPriceRange((prevState) => {
        return { ...prevState, minPrice: filterParams.price.minPrice };
      });
    }
  }, [filterParams]);

  const getAncestorsClassNames = useCallback((element, arr = []) => {
    if (!element.parentElement.matches("body")) {
      arr = arr.concat(element.parentElement.className);
      return getAncestorsClassNames(element.parentElement, arr);
    }
    return arr;
  }, []);

  const handleWindowClicks = useCallback(
    (e) => {
      let openDropdowns = document.getElementsByClassName(
        "dropdown-btn active"
      );
      if (openDropdowns.length > 0) {
        const ancestors = getAncestorsClassNames(e.target);
        if (!e.target.matches(".dropdown-btn")) {
          if (
            !ancestors.includes("dropdown-box") ||
            !e.target.className === "dropdown-box"
          ) {
            // set each button's active status
            let buttons = document.getElementsByClassName("dropdown-btn");
            for (var i = 0; i < buttons.length; i++) {
              buttons[i].className = "dropdown-btn";
            }
          }
        }
      }
    },
    [getAncestorsClassNames]
  );

  useEffect(() => {
    window.addEventListener("click", handleWindowClicks);

    return () => {
      window.removeEventListener("click", handleWindowClicks);
    };
  }, [handleWindowClicks]);

  const sanitizeString = (str) => {
    let sanitizedStr = str.replace(/[^0-9]/g, "");
    return sanitizedStr;
  };

  const handleClick = ({ target }) => {
    // set each button's active status
    closeAllDropdowns();
    target.className = "dropdown-btn active";
  };

  const handlePriceChange = ({ target }) => {
    setPriceRange({
      ...priceRange,
      [target.name]: sanitizeString(target.value),
    });
  };

  const changePrice = ({ target }) => {
    if (target.value && !/[0-9]/g.test(target.value)) {
      // Check if entered value is a valid number
      setErrorMsg("Enter a valid number");
      setPriceRange((prevState) => {
        return { ...prevState, [target.name]: "" };
      });
      target.value = "";
      return;
    }

    if (target.value === "0") {
      target.value = "";
    }

    // Remove all non-number characters and then add commas where needed
    setErrorMsg("");
    let newStr = sanitizeString(target.value).toString().split("").reverse();
    let sanitizedStr = [];
    for (let i = 0; i < newStr.length; i++) {
      sanitizedStr.push(newStr[i]);
      if (i % 3 === 0 && i !== 0) {
        sanitizedStr.splice(sanitizedStr.length - 1, 0, ",");
      }
    }
    sanitizedStr = sanitizedStr.reverse().join("");
    target.value = sanitizedStr;

    if (Number(sanitizeString(sanitizedStr)) > 1000000000) {
      setErrorMsg("Enter a valid number");
      return;
    }
    filterHomesByPrice(priceRange);
  };

  const closeAllDropdowns = () => {
    let buttons = document.getElementsByClassName("dropdown-btn");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].className = "dropdown-btn";
    }
  };

  const changeBaths = ({ target }) => {
    const bathButtons = document.getElementsByClassName("bath-btn");
    for (let i = 0; i < bathButtons.length; i++) {
      bathButtons[i].className = bathButtons[i].className.replace(
        " active",
        ""
      );
    }
    target.className += " active";
    filterHomesByBaths(target.getAttribute("index"));
  };

  const changeBeds = ({ target }) => {
    const bedButtons = document.getElementsByClassName("bed-btn");
    for (let i = 0; i < bedButtons.length; i++) {
      bedButtons[i].className = bedButtons[i].className.replace(" active", "");
    }
    target.className += " active";
    filterHomesByBeds(target.getAttribute("index"));
  };

  const PriceHeading = (min, max) => {
    let minPrice = min.toString();
    let maxPrice = max.toString();

    if (minPrice.length > 0 && minPrice.length < 4) {
      minPrice = "$" + minPrice;
    } else if (minPrice.length > 3 && minPrice.length < 7) {
      const decimal = Math.round(
        minPrice.split("").reverse().slice(0, 3).reverse().join("") / 100
      );
      if (decimal > 9 || decimal === 0) {
        minPrice = minPrice
          .split("")
          .reverse()
          .slice(3)
          .reverse()
          .join("")
          .concat(".", decimal);
        minPrice = "$" + Math.ceil(minPrice).toString().concat("k");
      } else {
        minPrice =
          "$" +
          minPrice
            .split("")
            .reverse()
            .slice(3)
            .reverse()
            .join("")
            .concat(".", decimal, "k");
      }
    } else if (minPrice.length > 6 && minPrice.length < 10) {
      const decimal = Math.round(
        minPrice.split("").reverse().slice(3, 6).reverse().join("") / 100
      );
      if (decimal > 9 || decimal === 0) {
        minPrice = minPrice
          .split("")
          .reverse()
          .slice(6)
          .reverse()
          .join("")
          .concat(".", decimal);
        minPrice = "$" + Math.ceil(minPrice).toString().concat("m");
      } else {
        minPrice =
          "$" +
          minPrice
            .split("")
            .reverse()
            .slice(6)
            .reverse()
            .join("")
            .concat(".", decimal, "m");
      }
    } else if (minPrice.length === 10) {
      const decimal = Math.round(
        minPrice.split("").reverse().slice(6, 9).reverse().join("") / 100
      );
      if (decimal > 9 || decimal === 0) {
        minPrice = minPrice
          .split("")
          .reverse()
          .slice(9)
          .reverse()
          .join("")
          .concat(".", decimal);
        minPrice = "$" + Math.ceil(minPrice).toString().concat("b");
      } else {
        minPrice =
          "$" +
          minPrice
            .split("")
            .reverse()
            .slice(6)
            .reverse()
            .join("")
            .concat(".", decimal, "b");
      }
    } else {
      minPrice = null;
    }

    if (maxPrice.length > 0 && maxPrice.length < 4) {
      maxPrice = "$" + maxPrice;
    } else if (maxPrice.length > 3 && maxPrice.length < 7) {
      const decimal = Math.round(
        maxPrice.split("").reverse().slice(0, 3).reverse().join("") / 100
      );
      if (decimal > 9 || decimal === 0) {
        maxPrice = maxPrice
          .split("")
          .reverse()
          .slice(3)
          .reverse()
          .join("")
          .concat(".", decimal);
        maxPrice = "$" + Math.ceil(maxPrice).toString().concat("k");
      } else {
        maxPrice =
          "$" +
          maxPrice
            .split("")
            .reverse()
            .slice(3)
            .reverse()
            .join("")
            .concat(".", decimal, "k");
      }
    } else if (maxPrice.length > 6 && maxPrice.length < 10) {
      const decimal = Math.round(
        maxPrice.split("").reverse().slice(3, 6).reverse().join("") / 100
      );
      if (decimal > 9 || decimal === 0) {
        maxPrice = maxPrice
          .split("")
          .reverse()
          .slice(6)
          .reverse()
          .join("")
          .concat(".", decimal);
        maxPrice = "$" + Math.ceil(maxPrice).toString().concat("m");
      } else {
        maxPrice =
          "$" +
          maxPrice
            .split("")
            .reverse()
            .slice(6)
            .reverse()
            .join("")
            .concat(".", decimal, "m");
      }
    } else if (maxPrice.length === 10) {
      const decimal = Math.round(
        maxPrice.split("").reverse().slice(6, 9).reverse().join("") / 100
      );
      if (decimal > 9 || decimal === 0) {
        maxPrice = maxPrice
          .split("")
          .reverse()
          .slice(9)
          .reverse()
          .join("")
          .concat(".", decimal);
        maxPrice = "$" + Math.ceil(maxPrice).toString().concat("b");
      } else {
        maxPrice =
          "$" +
          maxPrice
            .split("")
            .reverse()
            .slice(6)
            .reverse()
            .join("")
            .concat(".", decimal, "b");
      }
    } else {
      maxPrice = null;
    }

    if (minPrice || maxPrice) {
      if (minPrice && maxPrice) {
        return `${minPrice} - ${maxPrice}`;
      } else if (!maxPrice) {
        return `${minPrice}+`;
      } else if (!minPrice) {
        return `Up to ${maxPrice}`;
      }
    } else {
      return "Price";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      var x = document.createEvent("FocusEvent");
      x.initEvent("blur");
      e.target.dispatchEvent(x);
    }
  };

  return (
    <div className="flex-container" id="filter-menu">
      <div className="filter-search">
        <Search
          searchQuery={filterParams.search}
          search={(query) => getHomes(query)}
        />
      </div>
      <div
        className={
          searching
            ? "filter-search mobile-filter-search"
            : "filter-search mobile-filter-search hide"
        }
      >
        <Search
          searchQuery={filterParams.search}
          search={(query) => getHomes(query)}
        />
      </div>
      <div
        className={
          searching
            ? "filter-btns flex-container hide"
            : "filter-btns flex-container"
        }
      >
        <div className="dropdown">
          <button id="btn2" className="dropdown-btn" onClick={handleClick}>
            {PriceHeading(priceRange.minPrice, priceRange.maxPrice)}
          </button>
          <div className="dropdown-tab"></div>
          <div id="priceDropdown" className="dropdown-box">
            <div className="dropdown-content">
              <span className="filter-heading">Price Range</span>
              <div className="priceRange-holder">
                <input
                  type="text"
                  className="price-input"
                  name="minPrice"
                  placeholder="Min"
                  onChange={handlePriceChange}
                  onBlur={changePrice}
                  onKeyPress={handleKeyPress}
                />
                <span className="seperate">-</span>
                <input
                  type="text"
                  className="price-input"
                  name="maxPrice"
                  placeholder="Max"
                  onChange={handlePriceChange}
                  onBlur={changePrice}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className={errorMsg ? "error-msg" : "error-msg hide"}>
                {errorMsg}
              </div>
            </div>
            <div className="color-change-wrapper">
              <button className="done-btn" onClick={closeAllDropdowns}>
                Done
              </button>
            </div>
          </div>
        </div>
        <div className="dropdown">
          <button id="btn3" className="dropdown-btn" onClick={handleClick}>
            {filterParams.beds > 0 ? `Beds: ${filterParams.beds}+` : "Beds"}
          </button>
          <div className="dropdown-tab"></div>
          <div id="bedsDropdown" className="dropdown-box">
            <div className="dropdown-content">
              <span className="filter-heading">Bedrooms</span>
              <div className="filter-options">
                <button
                  className="bed-btn active"
                  index={0}
                  onClick={changeBeds}
                >
                  Any
                </button>
                <button className="bed-btn" index={1} onClick={changeBeds}>
                  1+
                </button>
                <button className="bed-btn" index={2} onClick={changeBeds}>
                  2+
                </button>
                <button className="bed-btn" index={3} onClick={changeBeds}>
                  3+
                </button>
                <button className="bed-btn" index={4} onClick={changeBeds}>
                  4+
                </button>
                <button className="bed-btn" index={5} onClick={changeBeds}>
                  5+
                </button>
              </div>
            </div>
            <div className="color-change-wrapper">
              <button className="done-btn" onClick={closeAllDropdowns}>
                Done
              </button>
            </div>
          </div>
        </div>
        <div className="dropdown">
          <button id="btn4" className="dropdown-btn" onClick={handleClick}>
            {filterParams.baths > 0 ? `Baths: ${filterParams.baths}+` : "Baths"}
          </button>
          <div className="dropdown-tab"></div>
          <div id="bathsDropdown" className="dropdown-box">
            <div className="dropdown-content">
              <span className="filter-heading">Bathrooms</span>
              <div className="filter-options">
                <button
                  className="bath-btn active"
                  index={0}
                  onClick={changeBaths}
                >
                  Any
                </button>
                <button className="bath-btn" index={1} onClick={changeBaths}>
                  1+
                </button>
                <button className="bath-btn" index={2} onClick={changeBaths}>
                  2+
                </button>
                <button className="bath-btn" index={3} onClick={changeBaths}>
                  3+
                </button>
                <button className="bath-btn" index={4} onClick={changeBaths}>
                  4+
                </button>
                <button className="bath-btn" index={5} onClick={changeBaths}>
                  5+
                </button>
              </div>
            </div>
            <div className="color-change-wrapper">
              <button className="done-btn" onClick={closeAllDropdowns}>
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  filterParams: state.homes.filterParams,
});

export default connect(mapStateToProps, {
  filterHomesByPrice,
  filterHomesByBeds,
  filterHomesByBaths,
  getHomes,
})(Filter);
