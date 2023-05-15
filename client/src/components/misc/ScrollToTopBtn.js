import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";

const ScrollBtn = styled.button`
  position: fixed;
  bottom: 20px;
  right: 15px;
  z-index: 1000;
  border: none;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 810px) {
    display: none;
  }
`;

const ScrollToTopBtn = () => {
  const [btnDisplay, setBtnDisplay] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return function cleanup() {
      document.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = (e) => {
    if (e.cancelable) e.preventDefault();
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      if (btnDisplay === false) {
        setBtnDisplay(true);
      }
    } else {
      if (btnDisplay === true) {
        setBtnDisplay(false);
      }
    }
  };

  const scrollAction = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <CSSTransition
      in={btnDisplay}
      appear={true}
      timeout={500}
      classNames="fade"
      mountOnEnter={true}
      unmountOnExit={true}
    >
      <ScrollBtn onClick={() => scrollAction()}>
        <FontAwesomeIcon icon="chevron-up" />
      </ScrollBtn>
    </CSSTransition>
  );
};

export default ScrollToTopBtn;
