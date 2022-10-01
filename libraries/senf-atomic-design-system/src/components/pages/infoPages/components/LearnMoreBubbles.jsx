import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Box, Accordion } from "senf-atomic-design-system";
import Contact from "../../../../assets/infoPages/lastSection/contact.png";
import Faq from "../../../../assets/infoPages/lastSection/faq.png";
import Insta from "../../../../assets/infoPages/lastSection/insta.png";
import Bulb from "../../../../assets/infoPages/lastSection/bulb.png";

import { isMobileCustom } from "../../../../hooks/customDeviceDetect";
import { openMail } from "../../../../util/helpers";
import Typography from "../../../atoms/typography/Typography"

const Wrapper = styled.div`
  width: 100%;

  z-index: 9999;
  position: sticky;
  top: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 320px;

  @media (min-width: 768px) {
    top: 200px;
    height: 400px;
  }
`;

const Bubble = styled.div`
  height: 80px;
  width: 80px;
  left: ${(props) => props.left};
  position: relative;
  transition: 0.2s;

  &:hover {
    width: 90px;
  }

  @media (min-width: 768px) {
    height: 100px;
    width: 100px;

    &:hover {
      width: 110px;
    }
  }
`;

const Divider = styled.div`
  width: calc(100% - 48px);
  height: 1px;
  background-color: rgba(186, 160, 79, 0.2);
  overflow: visible;
  margin: 10px 24px 10px 24px;
`;

const LearnMoreBubbles = ({ handleClose }) => {
  const { t } = useTranslation();
  const [faqOpen, setFaqOpen] = useState(false);

  const faqData = [
    // { question: t("faq_question1"), answer: t("faq_answer1") },
    { question: t("faq_question2"), answer: t("faq_answer2") },
    { question: t("faq_question3"), answer: t("faq_answer3") },
    { question: t("faq_question4"), answer: t("faq_answer4") },
    // { question: t("faq_question5"), answer: t("faq_answer5") },
    // { question: t("faq_question6"), answer: t("faq_answer6") },
    { question: t("faq_question7"), answer: t("faq_answer7") },
    { question: t("faq_question8"), answer: t("faq_answer8") },
  ];

  return (
    <Wrapper>
      {ReactDOM.createPortal(
        <React.Fragment>
          {faqOpen && (
            // <Modal openModal={faqOpen} setOpenModal={() => setFaqOpen(false)}>
            <Box margin="24px" flexDirection="column">
              <Typography
                variant="h2"
                fontWeight="900"
                margin="15px 0px 15px 0px"
                textAlign="center"
              >
                FAQ
              </Typography>

              <Accordion data={faqData} />
            </Box>
            // </Modal>
          )}
        </React.Fragment>,
        document.getElementById("portal-root-modal")
      )}

      <Bubble
        color="#BD9BF4"
        id="infoPageBubble1"
        left={isMobileCustom ? "50px" : "-3%"}
        onClick={() => setFaqOpen(true)}
      >
        <img src={Faq} width="100%" />
      </Bubble>
      <Bubble
        color="#90D8B9"
        id="infoPageBubble2"
        left={isMobileCustom ? "270px" : "105%"}
        onClick={() => openMail("dein@senf.koeln")}
      >
        <img src={Contact} width="100%" />
      </Bubble>

      <Bubble
        color="#90D8B9"
        id="infoPageBubble3"
        left={isMobileCustom ? "30px" : "-5%"}
        onClick={() =>
          window.open("https://www.instagram.com/senf.koeln/", "_blank")
        }
      >
        <img src={Insta} width="100%" />
      </Bubble>

      <Bubble
        color="#90D8B9"
        id="infoPageBubble4"
        left={isMobileCustom ? "220px" : "90%"}
        onClick={handleClose}
      >
        <img src={Bulb} width="100%" />
      </Bubble>
    </Wrapper>
  );
};

export default LearnMoreBubbles;
