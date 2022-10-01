import React, { useRef, useEffect } from "react";
import { useTrail, animated } from "@react-spring/web";
import styled from "styled-components";
import { isMobileCustom } from "../../../../hooks/customDeviceDetect";
// import BulbImg from "../../../images/lamp.png";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  will-change: transform, opacity;
  overflow: visible;
  margin-top: ${(props) => props.marginTop};
  z-index: 1;
  -webkit-backspace-visibility: hidden;
`;

const HooksMain = styled.div`
  position: absolute;
  width: 100%;
  height: 0;
  /* overflow: hidden; */
  background: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
  -webkit-backspace-visibility: hidden;

  div {
    position: absolute;
    will-change: transform;
    background-color: #fed957;
    /* box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75); */
    /* opacity: 0.6; */
  }

  div:nth-child(1) {
    width: ${({ isMobile }) => (isMobile ? "1900px" : "3000px")};
    height: ${({ isMobile }) => (isMobile ? "1900px" : "3000px")};
    border-radius: ${(props) => (props.idRef === "Circle3" ? "0%" : "100%")};
  }
`;

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 130, friction: 50 };
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

const Circle = ({ id, marginTop }) => {
  const isMobile = isMobileCustom();
  const ref = useRef(null);
  const [trail, api] = useTrail(1, (i) => ({
    xy: [window.innerWidth / 2, window.innerHeight + 200],
    config: slow,
  }));
  //   const [ref, { left, top }] = useMeasure();

  const handleMouseMove = (e) => {
    api.start({ xy: [e.clientX - 0, e.clientY - 0] });
  };

  useEffect(() => {
    const element = document.getElementById("InfoPage");
    const positionInfo = element.getBoundingClientRect();
    const { height } = positionInfo;
    const { width } = positionInfo;

    api.start({ xy: [width / 1.4, 0] });

    const firstInterval = setInterval(() => {
      api.start({
        xy: [width / 1.45, 0],
      });
    }, 2500);

    const secondInterval = setInterval(() => {
      api.start({
        xy: [width / 1.4, 0],
      });
    }, 4000);
    // setInterval(function () {
    //   api.start({
    //     xy: [width / 2.1, height / 1.25],
    //   });
    // }, 7000);
  }, []);
  return (
    <Container ref={ref} marginTop={marginTop}>
      <HooksMain
        isMobile={isMobile}
        //   onMouseMove={handleMouseMove}
        idRef={id}
      >
        {trail.map((props, index) => (
          <animated.div
            id={id}
            key={index}
            style={{ transform: props.xy.to(trans) }}
          >
            {/* {id === "Circle" || id === "Circle3" ? (
              <img
                src={BulbImg}
                id="infoPageBulb"
                width="100px"
                style={{
                  marginLeft: "50%",
                  marginTop: "50%",
                  transform: "translateX(-50%)translateY(-50%) rotate(20)",
                  position: "absolute",
                }}
              />
            ) : (
              <img
                src={BulbImg}
                id="infoPageBulb"
                width="100px"
                style={{
                  marginLeft: "50%",
                  marginTop: "50%",
                  transform: "translateX(-50%)translateY(-50%) rotate(20)",
                  position: "absolute",
                }}
              />
            )} */}

            {/* <SecondHeadline
              marginTop="570px"
              visible={true}
              textlines={[
                { text: "infopage_addMustard_1" },
                { text: "infopage_addMustard_2" },
              ]}
            /> */}
          </animated.div>
        ))}
      </HooksMain>
    </Container>
  );
};

export default Circle;
