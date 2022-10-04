/** @format */

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Icon, CalendarIcon, Typography } from "senf-atomic-design-system";
import {
  ComponentWrapper,
  ComponentInnerWrapper,
} from "../styles/sharedStyles";

// firebase
import { db } from "../../../firebase";

import Navigation from "../Components/Navigation";
import ToggleStatusComponent from "../Components/ToggleStatusComponent";

const Card = styled.div`
  margin: 50px 0px 0px 10px;
  overflow: hidden;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 200px;
  width: 200px;
  margin-left: 50%;
  transform: translateX(-50%);

  box-shadow: 0px 12px 18px -8px rgba(186, 160, 79, 0.2),
    0px -4px 10px 4px rgba(255, 255, 255, 0.2);
  background-color: ${(props) => (props.active ? "#feecab" : "#fcfbf8")};
  border-radius: 18px;
  border: 2px solid ${(props) => (props.active ? "#e8ba02" : "#ffffff")};

  filter: ${(props) =>
    props.status === "deactivated" || props.status === "uncompleted"
      ? "brightness(0.6)"
      : "brightness(1)"};

  animation: CalendarCardAnimation 0.8s;

  @keyframes CalendarCardAnimation {
    0% {
      opacity: 0;
      transform: translateY(50%) translateX(-50%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%) translateX(-50%);
    }
  }
`;

const CreateProjectPage5 = ({
  onClickNext,
  onClickPrev,
  set,
  pagesData,
  index,
}) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);

  const [calendar, setCalendar] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (
        typeof Storage !== "undefined" &&
        localStorage.getItem("createProjectRoomId")
      ) {
        const ref = doc(
          db,
          "organizations",
          localStorage.getItem("createProjectRoomOrganizationId"),
          "projectRooms",
          localStorage.getItem("createProjectRoomId")
        );
        const docSnapshot = await getDoc(ref);

        if (!docSnapshot.exists()) {
          console.log("No such document!");
        } else {
          const data = docSnapshot.data();
          if (data.calendar) {
            setCalendar(data.calendar);
          }
        }
      }
    }
    fetchData();
  }, []);

  const handleNext = async () => {
    setNextClicked(true);

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId")
    ) {
      // UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        calendar,
      };
      const ref = doc(
        db,
        `organizations/${localStorage.getItem(
          "createProjectRoomOrganizationId"
        )}/projectRooms/${localStorage.getItem("createProjectRoomId")}`
      );

      await updateDoc(ref, updateProject).then(() => {
        setTimeout(() => {
          if (localStorage.getItem("createProjectRoomPostEdit") === "true") {
            set(pagesData.length - 1);
          } else {
            onClickNext();
          }
        }, 200);
      });
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <Typography
            variant="h3"
            textAlign="center"
            margin="20px"
          >
            {pagesData[index].subTitle}
          </Typography>

          <Card
            active={calendar}
            onClick={() => setCalendar(!calendar)}
          >
            <CalendarIcon size="100%" />
            <Typography
              variant="h3"
              textAlign="center"
            >
              {t("calendar")}
            </Typography>
            <Typography
              variant="bodyBg"
              textAlign="center"
            >
              {t("calendar_projectroom_explanaition")}
            </Typography>
          </Card>

          <ToggleStatusComponent
            title={""}
            status={calendar}
            handlePublish={() => setCalendar(true)}
            handleArchive={() => setCalendar(false)}
            activeLabel={t("active")}
            deactivatedLabel={t("deactivated")}
          />
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("next")}
        prevLabel={t("back")}
        handleNext={handleNext}
        handlePrev={onClickPrev}
        set={set}
        disabled={nextClicked}
        loading={nextClicked}
        pagesData={pagesData}
        index={index}
      />
    </React.Fragment>
  );
};

export default CreateProjectPage5;
