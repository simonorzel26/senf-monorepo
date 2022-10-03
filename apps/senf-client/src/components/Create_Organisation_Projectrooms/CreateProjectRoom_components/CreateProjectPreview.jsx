/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

// firebase
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

// images
import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";

import { StyledH2 } from "../../../styles/GlobalStyle";
import Navigation from "../Components/Navigation";
import ListItemsEdit from "../Components/ListItemsEdit";
import ToggleStatusComponent from "../Components/ToggleStatusComponent";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ListItemWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
`;
const ListItem = styled.div`
  height: 50px;
  width: calc(100% - 60px);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: white;
  border-radius: 20px;
  overflow: hidden;
`;

const ListItemTitle = styled.h3`
  margin-left: 20px;
  font-size: 18px;
`;
const ListItemStatus = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const FrameWrapper = styled.div`
  width: calc(100vw - 50px);
  height: calc(100vh - 160px);
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 0px 40px -12px rgba(0, 0, 0, 0.5);
  border: 10px solid white;
  max-width: 1200px;

  @media (min-width: 768px) {
    box-shadow: 0 0px 40px -12px rgba(0, 0, 0, 0.2);

    width: calc(100vw - 60px);
    height: calc(100vh - 350px);
  }
`;

const CreateProjectPagePreview = ({
  onClickPrev,
  setClose,
  set,
  listItems,
  pagesData,
  index,
  projectRoomTitle,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openPreview, setOpenPreview] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);

  const [status, setStatus] = useState(true);

  const [infosProvided, setInfosProvided] = useState(false);

  useEffect(() => {
    async function fetchData() {
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
        if (
          !data.status ||
          data.status === "deactivated" ||
          data.status === "uncompleted"
        ) {
          setStatus(false);
        }
        if (data.title && data.description) {
          setInfosProvided(true);
        }
      }
    }

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId")
    ) {
      fetchData();
    }
  }, []);

  const handleArchive = async () => {
    setStatus(false);

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      const ref = doc(
        db,
        `organizations/${localStorage.getItem(
          "createProjectRoomOrganizationId"
        )}/projectRooms/${localStorage.getItem("createProjectRoomId")}`
      );

      await updateDoc(ref, { status: "deactivated" }).then(() => {});
    } else {
    }
  };

  const handlePublish = async () => {
    if (localStorage.getItem("createProjectRoomPostEdit") !== "true") {
      setNextClicked(true);
    }

    setStatus(true);

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId")
    ) {
      const ref = doc(
        db,
        `organizations/${localStorage.getItem(
          "createProjectRoomOrganizationId"
        )}/projectRooms/${localStorage.getItem("createProjectRoomId")}`
      );

      await updateDoc(ref, { status: "active" }).then(() => {
        if (localStorage.getItem("createProjectRoomPostEdit") !== "true") {
          setTimeout(() => {
            setClose();
          }, 1000);
        }
      });
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH2
            fontWeight="900"
            textAlign="center"
          >
            {pagesData[index].subTitle}
          </StyledH2>
          <ListItemsEdit
            listItems={listItems}
            set={set}
            info={projectRoomTitle}
          />

          {localStorage.getItem("createProjectRoomPostEdit") === "true" && (
            <ToggleStatusComponent
              title={t("createProjectRoomPage7ToggleTitle")}
              status={status}
              handlePublish={handlePublish}
              handleArchive={handleArchive}
              activeLabel={t("public")}
              deactivatedLabel={t("deactivated")}
            />
          )}
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("publish")}
        prevLabel={t("back")}
        handleNext={handlePublish}
        handlePrev={onClickPrev}
        disabled={
          localStorage.getItem("createProjectRoomPostEdit") === "true" ||
          nextClicked
        }
        loading={nextClicked}
        pagesData={pagesData}
        index={index}
        setClose={setClose}

        // loading={nextClicked}
      />
    </React.Fragment>
  );
};

export default CreateProjectPagePreview;
