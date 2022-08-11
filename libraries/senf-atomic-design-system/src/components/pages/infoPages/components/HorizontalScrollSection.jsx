import React, { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Partners from "./Partners";

import SectionBackground from "../../../../assets/infoPages/shapes/sectionSticky.png";
import Ideas from "../../../../assets/infoPages/howItWorks/ideas.png";
import IdeasMobile from "../../../../assets/infoPages/howItWorks/ideas_mobile.png";
import Submitted from "../../../../assets/infoPages/howItWorks/submitted.png";
import Statement from "../../../../assets/infoPages/howItWorks/statement.png";
import Implemented from "../../../../assets/infoPages/howItWorks/implemented.png";
import ImplementedMobile from "../../../../assets/infoPages/howItWorks/implemented_mobile.png";
import { isMobileCustom } from "../../../../hooks/customDeviceDetect";
import Typography from "../../../atoms/typography/Typography";



const Container = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SpaceHolder = styled.div`
  position: relative;
  width: 100%;
`;

const Sticky = styled.div`
  position: sticky;
  top: -80px;
  height: 120vh;
  width: 100%;
  overflow-x: hidden;
`;
const Horizontal = styled.div`
  position: absolute;
  height: 100%;
  will-change: transform;
`;
const CardsSection = styled.section`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const Article = styled.article`
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  box-sizing: border-box;
  width: calc(100vw - 48px);
  margin: 24px 50px 0px 24px;

  @media (min-width: 768px) {
    width: 700px;
    margin: 50px 50px 0px 50px;
  }
`;

const Title = styled.h3`
  font-size: 30px;
  text-align: center;
  width: 90%;
  margin-left: 5%;
  color: #353535;
  z-index: 1;
  font-weight: 700;
  margin-top: 100px;
  top: 130px;
  margin-bottom: 10px;
`;
const Img = styled.img`
  position: absolute;
  top: 0px;
  height: calc(100% - 10px);
  z-index: 0;

  @media (min-width: 768px) {
    top: 0px;
    height: calc(100% - 150px);
    min-height: 800px;
  }
`;

const ArticleImg = styled.img`
  position: absolute;
  max-width: 100%;
  margin-left: 50%;
  transform: translate(-50%, -20%);

  margin-top: 320px;

  @media (min-width: 768px) {
    margin-top: 50%;
    max-width: 100%;
    max-height: 450px;
  }
`;

const Flex = styled.div`
  width: calc(100% - 20px);
  position: relative;
  display: flex;
  flex-flow: wrap;
  align-items: center;
  margin: 10px;
`;

const Logo = styled.img`
  padding: 5px 10px;
`;
const Goosefoot = styled.span`
  color: #353535;
  font-size: 150px;
  width: 100%;
  text-align: center;
`;

const Text = styled.p`
  text-align: center;
  font-style: italic;
  font-size: 16px;
  line-height: 20px;
  margin: 10px 5px 5px 5px;

  @media (min-width: 768px) {
    margin: 10px 100px 20px 100px;

    font-size: 24px;
    line-height: 34px;
  }
`;

const HorizontalScrollSection = ({ id, visiblePartners }) => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom()
  useEffect(() => {
    setTimeout(() => {
      function calcDynamicHeight(ref) {
        const element = document.getElementById("InfoPage");
        const positionInfo = element.getBoundingClientRect();
        const { height } = positionInfo;
        const { width } = positionInfo;

        const objectWidth = ref.scrollWidth;
        return objectWidth - width + height + width * 2; // 150 is the padding (in pixels) desired on the right side of the .cards container. This can be set to whatever your styles dictate
      }

      const spaceHolder = document.querySelector(`#space-holder${id}`);
      const horizontal = document.querySelector(`#horizontal${id}`);
      spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;



      spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;

      // window.addEventListener("resize", () => {
      //   spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;
      // });
    }, 1000);

  }, []);

  const pages = [
    {
      title: t("infopage_succesStories_title1"),
      subTitle: t("infopage_succesStories_subtitle1"),
      img: isMobile ? IdeasMobile : Ideas,
    },
    {
      title: t("infopage_succesStories_title2"),
      subTitle: t("infopage_succesStories_subtitle2"),
      img: Submitted,
    },
    {
      title: t("infopage_succesStories_title3"),
      subTitle: t("infopage_succesStories_subtitle3"),
      img: Statement,
    },
    {
      title: t("infopage_succesStories_title4"),
      subTitle: t("infopage_succesStories_subtitle4"),
      img: isMobile ? ImplementedMobile : Implemented,
    },
  ];
  const credits = [
    {
      title: t("infopage_creditAuthor1"),
      subTitle: t("infopage_creditText1"),
      width: "70px",
    },
    {
      title: t("infopage_creditAuthor2"),
      subTitle: t("infopage_creditText2"),
      width: "50px",
    },
    {
      title: t("infopage_creditAuthor3"),
      subTitle: t("infopage_creditText3"),
      width: "150px",
    },
  ];

  return (
    <Container>
      <SpaceHolder id={`space-holder${id}`}>
        <Sticky id={`sticky${id}`}>
          {/* {id === "1" ? (
            <Title>
              Wir setzen uns <br />
              für euch ein!
            </Title>
          ) : (
            <Title>
              Gemeinsam für die <br />
              Stadt der Zukunft
            </Title>
          )} */}
          <Img src={SectionBackground} width="100%" />

          <Horizontal id={`horizontal${id}`}>
            {id === "1" ? (
              <CardsSection role="feed" className="cards">
                {pages.map(({ title, subTitle, img }) => (
                  <Article key={title}>
                    <Title textAlign="center" margin="20px 20px 0px 20px">
                      {title}
                    </Title>
                    <Text>{subTitle}</Text>
                    <ArticleImg src={img} />
                  </Article>
                ))}
              </CardsSection>
            ) : (
              <CardsSection role="feed" className="cards">
                {credits.map(({ title, subTitle, img, width }) => (
                  <Article key={title}>
                    <Goosefoot>„</Goosefoot>
                    <Text>{subTitle}</Text>
                    <Typography variant="h3" textAlign="center" margin="20px 20px 20px 20px">
                      {title}
                    </Typography>
                  </Article>
                ))}
              </CardsSection>
            )}
          </Horizontal>
          {id === "2" && visiblePartners && <Partners />}
        </Sticky>
      </SpaceHolder>
    </Container>
  );
};

export default HorizontalScrollSection;
