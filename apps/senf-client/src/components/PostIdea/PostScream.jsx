/** @format */

import React, { useState, Fragment, memo, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import {
  Plus,
  Box,
  Button,
  Input,
  ModalContext,
  Geocoder
} from "senf-atomic-design-system";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { isMobileCustom } from "../../util/customDeviceDetect";
import { postScream } from "../../redux/actions/screamActions";
import { clearErrors } from "../../redux/actions/errorsActions";

// Components
import PostScreamFormContent from "./PostScreamFormContent";
import PostScreamSelectContainter from "./PostScreamSelectContainter";
import PostScreamRules from "./PostScreamRules";
import Auth from "../../pages/Auth";

const AuthFirst = styled.div`
  position: fixed;
  top: ${({ isMobile, locationDecided }) => (isMobile && locationDecided ? "27vh" : isMobile && !locationDecided && "100vh")};
  height: 80vh;
  z-index: 99999;
  width: 100%;
  transition: 0.5;

  @media (min-width: 768px) {
    z-index: 992;
    position: fixed;
    top: 40px;
    left: 0;
    margin-left: 210px;
    margin-right: auto;
    height: 600px;
    width: 380px;
    border-radius: 20px;
    box-shadow: 0 0px 40px -12px rgba(0, 0, 0, 0);
  }
`;

const PostScream = ({
  classes,
  loadingProjects,
  projectsData,
  setPostIdeaOpen,
  postIdeaOpen,
  statefulMap,
}) => {
  const dispatch = useDispatch();
  const { handleModal } = React.useContext(ModalContext) || {};
  const loading = useSelector((state) => state.data.loading);

  const project = useSelector((state) => state.data.project);

  const user = useSelector((state) => state.user);
  const history = useHistory();
  const { t } = useTranslation();

  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );

  const [viewport, setViewport] = useState(null);

  const [addressBarClickedState, setAddressBarClickedState] = useState(false);

  const [openRules, setOpenRules] = useState(false);
  const [out, setOut] = useState(false);
  const [projectSelected, setProjectSeleted] = useState("");
  const [geoData, setGeoData] = useState("");
  const [checkIfCalendar, setCheckIfCalendar] = useState(false);

  const [address, setAddress] = useState(null);
  const [neighborhood, setNeighborhood] = useState("Ohne Ortsangabe");
  const [fulladdress, setFulladdress] = useState("Ohne Ortsangabe");

  const [allMainStates, setAllMainStates] = useState({
    errors: {},
    MapHeight: "100vh",
    locationDecided: false,
  });

  const { errors, MapHeight, locationDecided } = allMainStates;

  const postIdeaValidationSchema = yup.object({
    title: yup
      .string()
      .required(t("enter_ideaTitle"))
      .min(10, t("ideaTitle_too_short"))
      .max(70, t("ideaTitle_too_long")),

    body: yup
      .string()
      .required(t("enter_ideaDescription"))
      .min(100, t("ideaDescription_too_short"))
      .max(800, t("ideaDescription_too_long")),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      topic: "",

      contact: null,
      contactTitle: null,
      weblink: null,
      weblinkTitle: null,
      selectedUnix: [],
    },
    validationSchema: postIdeaValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });



  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedUnix, setSelectedUnix] = useState([]);

  useEffect(() => {
    if (postIdeaOpen) {
      const projectSelected = project?.projectRoomId
        ? project?.projectRoomId
        : "";

      setProjectSeleted(projectSelected);


      projectsData?.forEach(
        ({ projectRoomId, zoom, centerLat, centerLong, geoData, calendar }) => {
          if (projectSelected === projectRoomId) {
            const viewport = {
              zoom,
              latitude: centerLat,
              longitude: centerLong,
              transitionDuration: 1000,
            };
            setViewport(viewport);
            setGeoData(geoData);
            setCheckIfCalendar(calendar);
          }
          // if (projectSelected === "") {
          //   const viewport = {
          //     zoom: mapViewportRef.current.zoom,
          //     latitude: mapViewportRef.current.latitude,
          //     longitude: mapViewportRef.current.longitude,
          //     transitionDuration: 1000,
          //   };
          //   setViewport(viewport);
          //   setGeoData("");
          // }
        }
      );
    } else {
      dispatch(clearErrors());
      setAllMainStates({ ...allMainStates, errors: {} });
    }
  }, [postIdeaOpen]);

  const handleDropdown = (value) => {
    setTopic(value);
  };

  const handleDropdownProject = (value) => {
    // event.preventDefault();
    setProjectSeleted(value);
    console.log(value);

    projectsData.forEach((element) => {
      if (value === element.projectRoomId) {
        const viewport = {
          zoom: element.zoom,
          latitude: element.centerLat,
          longitude: element.centerLong,
          transitionDuration: 1000,
        };
        setViewport(viewport);

        setGeoData(element.geoData);
        setCheckIfCalendar(element.calendar);
      }
      if (value === "") {
        if (initialMapViewport) {
          initialMapViewport.pitch = 0;
          setViewport(initialMapViewport);
        }

        setGeoData("");
        setCheckIfCalendar(false);
      }
    });
  };



  const handleSubmit = (event) => {
    event.preventDefault();

    const newScream = {
      body: formik.values.body,
      title: formik.values.title,
      locationHeader: address,
      fulladdress,
      neighborhood,
      lat: statefulMap.getCenter().lat,
      long: statefulMap.getCenter().lng,
      projectRoomId: projectSelected,
      Thema: formik.values.topic,
      weblinkTitle: formik.values.weblinkTitle,
      weblink: formik.values.weblink,
      contactTitle: formik.values.contactTitle,
      contact: formik.values.contact,
    };

    if (selectedUnix.length > 0) {
      newScream.selectedUnix = selectedUnix;
    }
    dispatch(postScream(newScream, user, history)).then(() => {
      setPostIdeaOpen(false);
    });
  };

  useEffect(() => {
    statefulMap.on("moveend", () => {
      const newViewport = {
        latitude: statefulMap.getCenter().lat,
        longitude: statefulMap.getCenter().lng,
      };
      setTimeout(() => {
        geocode(newViewport);
      }, 1000);

      // setAddressBarClickedState(false);
    });
  }, []);

  const geocode = (viewport) => {
    const geocodingClient = mbxGeocoding({
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
    });
    geocodingClient
      .reverseGeocode({
        query: [viewport.longitude, viewport.latitude],
        limit: 1,
      })
      .send()
      .then((response) => {
        const match = response.body;
        console.log("Gesamt", match.features[0]);
        console.log(
          "Adresse",
          match.features[0].text,
          match.features[0].address
        );
        console.log("Stadtteil", match.features[0].context[1].text);

        const houseNumber =
          match.features[0].address !== undefined
            ? match.features[0].address
            : "";

        setNeighborhood(match.features[0].context[1].text);
        setAddress(`${match.features[0].text} ${houseNumber}`);
        setFulladdress(match.features[0].place_name);
      });

    if (
      viewport.latitude > 51.08 ||
      viewport.latitude < 50.79 ||
      viewport.longitude < 6.712 ||
      viewport.longitude > 7.17
    ) {
      alert("Außerhalb von Köln kannst du leider noch keine Ideen teilen.");

      setOut(true);
    } else {
      setOut(false);
    }
  };

  const onSelected = (newViewport) => {
    setViewport(newViewport);

    setTimeout(() => {
      geocode(newViewport);
    }, 1000);
  };

  const addressBarClicked = () => {
    setAddressBarClickedState(true);
  };

  const handleLocationDecided = () => {
    if (address) {
      setAllMainStates({
        ...allMainStates,
        locationDecided: true,
        MapHeight: "30vh",
      });
    }
    if (locationDecided === true) {
      setAllMainStates({
        ...allMainStates,
        locationDecided: false,
        MapHeight: "100vh",
      });
    }
  };

  return (
    <React.Fragment>

      {/* <Box
        position="fixed"
        margin={document.body.clientWidth > 768 ? "20px" : "10px"}
        zIndex={2}
      >
        <Button
          size="medium"
          variant="white"
          icon={<Plus transform="rotate(45deg)" />}
          onClick={() => setPostIdeaOpen(false)}
        />
      </Box> */}

      {!user.authenticated && (
        <AuthFirst
          isMobile={isMobileCustom}
          locationDecided={locationDecided}
          onClick={() => handleModal("push", <Auth authEditOpen={false} />, { swipe: !!isMobileCustom, size: "md", height: isMobileCustom && window.innerHeight + 83, padding: 0 })
          }
        />
      )}

      {/* {isMobileCustom && (
        <div
          style={
            locationDecided
              ? { marginTop: 0, transition: "0.5s" }
              : { marginTop: "100vh", transition: "0.5s" }
          }
        >
          <div
            onClick={() => handleLocationDecided()}
          ></div>

          <div ></div>
        </div>
      )} */}
      <Box position="fixed" top="0px" width={isMobileCustom ? "100vw" : "400px"} zIndex={99999999} left="0px">
        <Geocoder finalAddress={address} statefulMap={statefulMap} handleSetClose={() => setPostIdeaOpen(false)} />
      </Box>

      <PostScreamSelectContainter
        classes={classes}
        locationDecided={locationDecided}
        handleLocationDecided={handleLocationDecided}
        projectSelected={projectSelected}
        address={address}
        handleDropdownProject={handleDropdownProject}
        open={open}
        loadingProjects={loadingProjects}
        projectsData={projectsData}
      />

      <PostScreamFormContent
        formik={formik}
        classes={classes}
        errors={errors}
        address={address}
        handleLocationDecided={handleLocationDecided}
        handleDropdown={handleDropdown}
        project={projectSelected}
        selectedDays={selectedDays}
        loading={loading}
        Out={out}
        locationDecided={locationDecided}
        handleSubmit={handleSubmit}
        checkIfCalendar={checkIfCalendar}
        setOpenRules={setOpenRules}
      />
    </React.Fragment>
  );
};

export default withRouter(memo(PostScream));
