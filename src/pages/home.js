/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { compose } from 'redux'
import { connect } from "react-redux";
import { withTranslation } from 'react-i18next';
import {
  getScreams,
  closeScream,
  openScream,
} from "../redux/actions/screamActions";
import {
  getProjects,
  openProject,
  closeProject,
} from "../redux/actions/projectActions";

import { setMapViewport, setMapBounds } from "../redux/actions/mapActions";

import { isMobileCustom } from "../util/customDeviceDetect";

import { logoutUser } from "../redux/actions/userActions";
import { clearErrors } from "../redux/actions/errorsActions";

//ICONS
import lamploader from "../images/lamp.png";

import InsightsPage from "../components/templates/InsightsPage";
import DesktopSidebar from "../components/molecules/Navigation/DesktopSidebar";

import Cookies from "universal-cookie";
import Topbar from "../components/molecules/Navigation/Topbar";
import MapDesktop from "../components/atoms/map/MapDesktop";
import IdeaList from "../components/templates/IdeaList";
import ProjectsPage from "../components/templates/ProjectsPage";
import ScreamDialog from "../components/templates/ScreamDialog";
import ProjectDialog from "../components/organisms/Projects/ProjectDialog";

import styled from "styled-components";

import ThanksForTheVote from "../components/atoms/Backgrounds/ThanksForTheVote";
const cookies = new Cookies();

const styles = {};

export class home extends Component {
  // TOGGLES
  constructor(props) {
    super(props);
    this.props.getScreams();
    this.props.getProjects();

    this.state = {
      order: 1,

      screamIdParam: null,
      dropdown: "newest",

      topicsSelected: [
        "Verkehr",
        "Versorgung",
        "Umwelt und Grün",
        "Rad",
        "Inklusion / Soziales",
        "Sport / Freizeit",
        "Sonstige",
      ],
    };
    console.log(this.props);

    if (
      cookies.get("Cookie_settings") !== "all" &&
      cookies.get("Cookie_settings") !== "minimum" &&
      isMobileCustom
    ) {
      this.props.history.push("/intro");
    }
  }

  componentDidMount() {
    this.props.clearErrors();

    if (!this.props.UI.openInfoPage) {
      this.openDialogFromUrl();
    }

    const screamId = this.props.match.params.screamId;
    if (!screamId) {
      setTimeout(() => {
        const viewport = {
          latitude: 50.95,
          longitude: 6.9503,
          zoom: isMobileCustom ? 9.5 : 11.5,
          transitionDuration: 4000,
          pitch: 30,
          bearing: 0,
        };
        this.props.setMapViewport(viewport);
      }, 3000);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.UI.openInfoPage !== this.props.UI.openInfoPage) {
      this.openDialogFromUrl();
    }
  }

  openDialogFromUrl() {
    const screamId = this.props.match.params.screamId;

    if (screamId) {
      if (screamId.indexOf("_") > 0) {
        this.props.openProject(screamId);
      } else {
        this.props.openScream(screamId);
      }
      this.setState({ screamIdParam: screamId });
    }
    if (window.location.pathname === "/projects") {
      this.handleClick(2);
    }
  }

  handleClick = (order) => {
    this.setState({
      order,
      screamIdParam: null,
    });

    this.props.closeScream();
    this.props.closeProject();

    this.handleTopicSelector("all");

    if (order === 2) {
      window.history.pushState(null, null, "/projects");
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    if (order === 3) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  handleDropdown = (value) => {
    this.setState({
      dropdown: value,
    });
  };

  handleTopicSelector = (topic) => {
    const index = this.state.topicsSelected.indexOf(topic);
    if (topic === "all") {
      this.setState({
        topicsSelected: [
          "Verkehr",
          "Versorgung",
          "Umwelt und Grün",
          "Rad",
          "Inklusion / Soziales",
          "Sport / Freizeit",
          "Sonstige",
        ],
      });
    } else if (this.state.topicsSelected.length === 7) {
      this.setState({
        topicsSelected: [topic],
      });
    } else if (index === -1) {
      this.setState({
        topicsSelected: this.state.topicsSelected.concat(topic),
      });
    } else {
      this.state.topicsSelected.splice(index, 1);
      if (this.state.topicsSelected.length === 0) {
        this.setState({
          topicsSelected: [
            "Verkehr",
            "Versorgung",
            "Umwelt und Grün",
            "Rad",
            "Inklusion / Soziales",
            "Sport / Freizeit",
            "Sonstige",
          ],
        });
      } else {
        this.setState({
          topicsSelected: this.state.topicsSelected,
        });
      }
    }
  };

  render() {
    const {
      screams,
      myScreams,
      loading,
      projects,
      project,
      loadingProjects,
      mapBounds,
      mapViewport,
    } = this.props.data;
    const { classes } = this.props;

    console.log(myScreams);

    const dataFinal = screams.filter(
      ({ Thema, lat, long, status }) =>
        this.state.topicsSelected.includes(Thema) &&
        lat <= mapBounds.latitude1 &&
        lat >= mapBounds.latitude2 &&
        long >= mapBounds.longitude2 &&
        long <= mapBounds.longitude3 &&
        status === "None"
    );

    const dataFinalMap = this.props.UI.openProject
      ? project.screams.filter(
        ({ Thema, status }) =>
          this.state.topicsSelected.includes(Thema) && status === "None"
      )
      : myScreams !== null
        ? myScreams.filter(
          ({ Thema, status }) =>
            this.state.topicsSelected.includes(Thema) && status === "None"
        )
        : screams.filter(
          ({ Thema, status }) =>
            this.state.topicsSelected.includes(Thema) && status === "None"
        );



    return (
      <div>
        {!loading && screams.length === 0 && (
          <div className="errorBackground">
            <div className="homeHeader"> Ooops! </div>
            <br />
            <span className="oopsText">
              {this.props.t("something_went_wrong")}
            </span>
          </div>
        )}

        {this.props.UI.voted && <ThanksForTheVote />}

        <Topbar
          loading={loading}
          handleClick={this.handleClick}
          order={this.state.order}
          handleTopicSelector={this.handleTopicSelector}
          topicsSelected={this.state.topicsSelected}
          dataFinalMap={dataFinalMap}
        />
        <DesktopSidebar
          loading={this.state.loading}
          handleClick={this.handleClick}
          order={this.state.order}
          handleTopicSelector={this.handleTopicSelector}
          topicsSelected={this.state.topicsSelected}
          loadingProjects={loadingProjects}
          projectsData={projects}
          dataFinalMap={dataFinalMap}
        ></DesktopSidebar>

        <MapDesktop
          loading={loading}
          loadingProjects={loadingProjects}
          dataFinal={dataFinalMap}
          id="mapDesktop"
          style={{ zIndex: 9999 }}
          openProject={this.props.UI.openProject}
          geoData={
            this.props.data.project &&
            this.props.UI.openProject &&
            this.props.data.project.geoData
          }
        ></MapDesktop>

        {!this.props.UI.openInfoPage && (
          <div className="contentWrapper">
            {loading && (
              <div className="spinnerDivBackground">
                <img src={lamploader} className="lamploader" alt="loader" />
              </div>
            )}
            <div className="MainBackgroundHome" />

            <div
              style={
                !this.props.UI.openScream
                  ? { overflow: "scroll" }
                  : {
                    height: "100vh",
                    overflow: "hidden",
                    top: `-${window.scrollY}px`,
                    position: "fixed",
                  }
              }
            >
              <IdeaList
                type="allIdeas"
                loading={loading}
                order={this.state.order}
                classes={classes}
                dataFinal={dataFinal}
                dataFinalMap={dataFinalMap}
                viewport={mapViewport}
                handleDropdown={this.handleDropdown}
                projectsData={projects}
                loadingProjects={loadingProjects}
                project={this.props.project}
                dropdown={this.state.dropdown}
                handleTopicSelector={this.handleTopicSelector}
                topicsSelected={this.state.topicsSelected}
              ></IdeaList>
            </div>

            <ProjectsPage
              loadingProjects={loadingProjects}
              order={this.state.order}
              projects={projects}
            ></ProjectsPage>

            <InsightsPage order={this.state.order}></InsightsPage>

            {this.props.UI.openScream && (
              <ScreamDialog
                screamIdParam={this.state.screamIdParam}
                projectsData={projects}
              ></ScreamDialog>
            )}
            {this.props.UI.openProject && (
              <ProjectDialog
                loading={loading}
                openProject={this.props.UI.openProject}
                dataFinalMap={dataFinalMap}
                screamIdParam={this.state.screamIdParam}
                handleClick={this.handleClick}
                latitude1={this.state.latitude1}
                latitude2={this.state.latitude2}
                longitude2={this.state.longitude2}
                longitude3={this.state.longitude3}
                loadingProjects={loadingProjects}
                projectsData={projects}
                viewport={mapViewport}
                handleTopicSelector={this.handleTopicSelector}
                topicsSelected={this.state.topicsSelected}
              ></ProjectDialog>
            )}
          </div>
        )}
      </div>
    );
  }
}

home.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getScreams: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,

  openDialog: PropTypes.bool,

  getProjects: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,

  closeScream: PropTypes.func.isRequired,
  openScream: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,
  closeProject: PropTypes.func.isRequired,

  setMapViewport: PropTypes.func.isRequired,
  setMapBounds: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  logoutUser,
  getScreams,
  clearErrors,
  getProjects,
  closeScream,
  openScream,
  openProject,
  closeProject,
  setMapViewport,
  setMapBounds,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
  UI: state.UI,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(compose(withStyles(styles), withTranslation())(home));
