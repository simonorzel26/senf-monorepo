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

const CreateOrganizationPreview = ({
  onClickPrev,
  setClose,
  set,
  pagesData,
  listItems,
  index,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [nextClicked, setNextClicked] = useState(false);

  const [openPreview, setOpenPreview] = useState(false);
  const [status, setStatus] = useState(true);

  const [infosProvided, setInfosProvided] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const ref = doc(
        db,
        "organizations",
        localStorage.getItem("createOrganizationId")
      );
      const DocumentSnapshot = await getDoc(ref);

      if (!DocumentSnapshot.exists()) {
        console.log("No such document!");
      } else {
        const data = DocumentSnapshot.data();
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
      localStorage.getItem("createOrganizationId")
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
        "organizations",
        localStorage.getItem("createOrganizationId")
      );
      await updateDoc(ref, { status: "deactivated" });
    } else {
    }
  };

  const handlePublish = async () => {
    setStatus(true);

    if (localStorage.getItem("createOrganizationPostEdit") !== "true") {
      setNextClicked(true);
    }

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      const ref = doc(
        db,
        "organizations",
        localStorage.getItem("createOrganizationId")
      );

      await updateDoc(ref, { status: "active" }).then(() => {
        if (localStorage.getItem("createOrganizationPostEdit") !== "true") {
          setTimeout(() => {
            setClose();
          }, 1000);
        }
      });
    }
  };

  const handleClose = () => {
    setNextClicked(true);

    if (localStorage.getItem("createOrganizationPostEdit") !== "true") {
      handlePublish();
    } else {
      setTimeout(() => {
        setClose();
      }, 1000);
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
          />

          {localStorage.getItem("createOrganizationPostEdit") === "true" && (
            <ToggleStatusComponent
              title={t("createOrganizationPage7ToggleTitle")}
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
        handleNext={handleClose}
        handlePrev={onClickPrev}
        disabled={
          // localStorage.getItem("createOrganizationPostEdit") === "true" ||
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

export default CreateOrganizationPreview;
