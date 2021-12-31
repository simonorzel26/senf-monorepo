/** @format */
import React from "react";
import styled, { keyframes } from "styled-components";
import Line from "../../../images/line.png";
const enterAnimation = keyframes`
    0% {
      opacity: 0;
      transform: translateY(10%);
    }
    50% {
      opacity: 0;
      transform: translateY(10%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
`;

const TabWrapper = styled.div`
  position: relative;

  width: 100%;
  margin-left: 0%;
  margin-top: ${(props) => props.marginTop};
  padding-bottom: ${(props) => props.marginBottom};
`;
const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Tab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  height: 100%;
  width: auto;
  padding-right: 15px;
  padding-left: 15px;
  animation: ${enterAnimation} ${(props) => props.i * 0.3}s;
  font-size: 22px;
  /* color: rgb(87, 87, 87);
  font-family: ${(props) =>
    props.active ? "Futura PT W01-Bold" : "Futura PT W01 Book;"}; */

  font-family: Futura PT W01 Book;
  color: #353535;
  opacity: ${(props) => (props.active ? "1" : "0.6")};
`;

const TabLine = styled.div`
  height: 3px;
  width: 50px;
  background-color: #353535;
  margin-left: 70px;
`;

const ImgWrapper = styled.div`
  opacity: ${(props) => (props.active ? "1" : "0")};
  margin-top: 5px;
  position: absolute;
  width: 120px;
  z-index: -1;
  height: 25px;
`;

const Tabs = ({
  loading,
  handleClick,
  order,
  tabLabels,
  marginTop,
  marginBottom,
}) => {
  const tab = tabLabels.map((tabLabel, i) => {
    return (
      !loading && (
        <React.Fragment>
          <Tab
            i={i + 1}
            active={order === i + 1}
            onClick={() => handleClick(i + 1)}
          >
            {tabLabel}
            <ImgWrapper active={order === i + 1}>
              {" "}
              <img src={Line} width="100%" height="100%" />
            </ImgWrapper>
          </Tab>{" "}
          {/* {i !== tabLabels.length - 1 && (
            <TabLine i={i + 1.5} lineColor={lineColor} />
          )}{" "} */}
        </React.Fragment>
      )
    );
  });

  return (
    <TabWrapper marginTop={marginTop} marginBottom={marginBottom}>
      <FlexWrapper>{tab}</FlexWrapper>
      {/* <TabLine order={order} /> */}
    </TabWrapper>
  );
};

export default Tabs;
