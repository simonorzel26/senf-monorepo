/** @format */

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Swipe from "react-easy-swipe";
import { isMobileCustom } from "../../util/customDeviceDetect";

// Redux stuff
import { connect } from "react-redux";
import { clearErrors } from "../../redux/actions/errorsActions";

import firebase from "firebase/app";
import "firebase/firestore";

//Components
import { MyIdeas } from "./MyIdeas";

// Icons
import Arrow from "../../images/icons/arrow.png";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Tabs from "../module/Tabs";
import { AccountTabData } from "../../data/AccountTabData";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  root: {
    backgroundColor: "transparent",
    padding: "0",
  },

  paper: {
    backgroundColor: "transparent",
    boxShadow: "none",
    // overflow: "hidden",
    padding: "0",
  },

  closeButton: {
    position: "relative",
    height: "35px",
    width: "35px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 22,
    borderRadius: "100%",
    backgroundColor: "white",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)",
  },
  header: {
    paddingTop: "10px",
    marginLeft: "0vw",
    width: "90%",
    objectFit: "cover",
  },
  user: {
    position: "relative",
    float: "left",
    color: "#414345",
    fontSize: "12pt",
  },
  date: {
    position: "relative",
    width: "80vw",
    color: "#414345",
    fontSize: "12pt",
  },

  faceButton: {
    zIndex: 9999,
  },

  expandButton: {
    position: "absolute",
    left: "0%",
    top: "0%",
    width: "110%",
    height: "110%",
    borderRadius: 0,
    // marginTop: "-20px",
    // marginLeft: "-10px",
    zIndex: 9,
    // backgroundColor: "rgb(0,0,0,0.5)",
  },

  content: {
    width: "100%",
    padding: 15,
    objectFit: "cover",
  },

  line: {
    position: "absolute",
    left: "85%",
    top: "0%",
    width: "1px",
    backgroundColor: "#d5dadd",
    height: "100%",
  },

  likeButton: {
    zIndex: 10,
    position: "relative",
    left: "0%",
    // width: "15vw",
    // height: "15vw",
    top: "10%",
  },
  likeButtonWrapper: {
    zIndex: 10,
    position: "absolute",
    left: "85%",
    // width: "15vw",
    top: "50px",
    textAlign: "center",
  },
  commentButtonWrapper: {
    top: "170px",
    position: "absolute",
    left: "85%",
  },

  title: {
    position: "relative",
    width: "95%",
    color: "#353535",
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: "18px",
    fontWeight: 500,
    fontFamily: "Futura PT W01-Bold",
    clear: "both",
  },
  bodytext: {
    width: "95%",
    fontSize: "14pt",
    textAlign: "center",
  },
  engagement: {
    paddingRight: 10,
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    color: "black",
  },

  locationOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    color: "rgb(255, 205, 6)",
    height: "3vh",
  },
  locationHeader: {
    color: "rgb(255, 205, 6)",
    float: "left",
    paddingRight: "2%",
    width: "100%",
  },
  locationIcon: {
    marginTop: "-3px",
    paddingRight: "2px",
    float: "left",
    color: "rgb(255, 205, 6)",
  },

  anmeldeText: {
    fontFamily: "Futura PT W01-Bold",
    fontSize: "14pt",
    color: "#414345",
    width: "95%",
    marginTop: "15px",
    textAlign: "center",
    marginLeft: "2.5%",
    paddingBottom: "15px",
  },

  commentHeader: {
    fontFamily: "Futura PT W01-Bold",
    marginLeft: "5vw",
    paddingTop: "1em",
    paddingBottom: "1em",
    color: "#414345",
  },
  KontaktButton: {
    position: "absolute",
    zIndex: 99,
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    width: "50vw",
    left: "25vw",
    top: "265vh",
    borderRadius: "100px",
    color: "#414345",
    backgroundColor: "white",
    textTransform: "none",
    fontSize: "14pt",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
  },

  mapPlaceholder: {
    position: "relative",
    width: "100vw",
    zIndex: 0,
    height: "52vh",
    backgroundColor: "lightgrey",
    overflow: "hidden",
  },

  card2: {
    zIndex: "99",
    position: "relative",
    display: "flex",
    marginTop: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
    borderRadius: 20,
    minHeight: "auto",

    boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
  },
  vertline: {
    width: "4px",
    position: "relative",
    backgroundColor: "#414345",
    height: "10px",
    marginLeft: "-2px",
    left: "50vw",
    zIndex: "0",
  },
};

class Account extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    open: false,
    myScreams: [],
    clicked: false,
    newPath: "",
    path: "",
    order: 1,

    latitude1: 51.08,
    latitude2: 50.79,
    longitude2: 6.712,
    longitude3: 7.17,

    showDemand: false,

    dropdown: "10",
    selectedId: "",
    showTitles: false,
    cookiesSetDesktop: false,

    openGeofilter: false,
    showGeofilterResults: false,
    createGeofilterCircle: false,
    dialogStyle: {},

    viewport: {
      zIndex: 9999,
      position: "fixed",
      top: "0vh",
      left: "0vw",
      width: "100vw",
      height: "100vh",
      latitude: 50.93,
      longitude: 6.9503,
      zoom: 9.2,
      maxZoom: 18,
      minZoom: 8,
    },
  };

  handleOpen = () => {
    const userHandle = this.props.user.credentials.handle;

    this.fetchMyScreams(userHandle);

    setTimeout(() => {
      this.setState({
        open: true,
      });
    }, 500);
    setTimeout(() => {
      this.setState({
        dialogStyle: { position: "initial" },
      });
    }, 2000);
  };

  fetchMyScreams = async (userHandle) => {
    if (userHandle !== undefined) {
      const db = firebase.firestore();
      const ref = await db
        .collection("screams")
        .where("userHandle", "==", userHandle)
        .orderBy("createdAt", "desc")
        .get();

      const screams = [];
      ref.docs.forEach((doc) => {
        const docData = {
          screamId: doc.id,
          lat: doc.data().lat,
          long: doc.data().long,
          title: doc.data().title,
          body: doc.data().body.substr(0, 170),
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          status: doc.data().status,
          Thema: doc.data().Thema,
          Stadtteil: doc.data().Stadtteil,
          project: doc.data().project,
          projectId: doc.data().project,
        };

        screams.push(docData);
        this.setState({ myScreams: screams });
      });
    }
  };

  handleClose = () => {
    window.history.pushState(null, null, `/`);
    this.setState({ open: false });

    setTimeout(() => {
      this.setState({
        dialogStyle: {},
      });
    }, 2000);

    this.props.clearErrors();
  };

  onSwipeMove(position) {
    if (`${position.x}` > 150) {
      this.handleClose();
    }
    var el = document.querySelector(".wrapperScreamDialog");
    if (el.scrollTop < 5) {
      if (`${position.y}` > 250) {
        this.handleClose();
      }
    }
  }

  handleClick = (order) => {
    this.setState({
      order,
    });
  };

  handleDropdown = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  _onViewportChange = (viewport) => {
    this.setState({ viewport, selectedId: "" });

    var metersPerPx =
      (156543.03392 *
        Math.cos((this.state.viewport.latitude * Math.PI) / 180)) /
      Math.pow(2, this.state.viewport.zoom);

    var Addnew = metersPerPx / 500;
    var Addnewtop = metersPerPx / 1000;
    var AddnewRight = metersPerPx / 500;
    var AddnewBottom = metersPerPx / 1000;

    this.setState({
      latitude1: this.state.viewport.latitude + Addnewtop,
      longitude1: this.state.viewport.longitude - Addnew,
      latitude2: this.state.viewport.latitude - AddnewBottom,
      longitude2: this.state.viewport.longitude - Addnew,
      latitude3: this.state.viewport.latitude + Addnewtop,
      longitude3: this.state.viewport.longitude + AddnewRight,
      latitude4: this.state.viewport.latitude - AddnewBottom,
      longitude4: this.state.viewport.longitude + AddnewRight,
    });
  };
  noLocation = () => {
    this.setState({
      latitude1: 50.93892,
      latitude2: 50.93864,
      longitude2: 6.9586,
      longitude3: 6.9588,

      openGeofilter: false,
      open: false,
    });
  };

  dataNoLocationHandle = () => {
    this.setState({
      selectedId: "hi",
    });
  };

  handleOpenGeofilter = () => {
    this.setState({
      openGeofilter: true,
      showGeofilterResults: false,
      createGeofilterCircle: false,
    });
  };

  handleCloseGeofilter = () => {
    this.setState({
      showGeofilterResults: true,

      openGeofilter: false,
      createGeofilterCircle: true,
    });

    setTimeout(() => {
      this.setState({});
    }, 1000);
  };

  handleResetGeofilter = () => {
    this.setState({
      showGeofilterResults: true,

      openGeofilter: false,
      createGeofilterCircle: true,
      viewport: {
        zIndex: 9999,
        position: "fixed",
        top: "0vh",
        left: "0vw",
        width: "100vw",
        height: "100vh",
        latitude: 50.93,
        longitude: 6.9503,
        zoom: 9.2 + 1.6,
        maxZoom: 18,
        minZoom: 8,
      },
      latitude1: 51.08,
      latitude2: 50.79,
      longitude2: 6.712,
      longitude3: 7.17,
    });

    setTimeout(() => {
      this.setState({});
    }, 1000);
  };

  render() {
    const {
      classes,
      screamIdParam,
      showTitles,
      _onViewportChangeDesktop,
      handleTopicSelector,
      topicsSelected,

      handleLogout,
      deleteAccount,

      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const { loadingMyScreams } = this.props.data;

    const dialogMarkup = (
      <div className="wrapperScreamDialog">
        <div className="dialogNavigation">
          <button onClick={this.handleClose} className="buttonRound">
            <img
              src={Arrow}
              width="20"
              alt="backArrow"
              style={{ transform: "rotate(90deg)" }}
            />
          </button>
        </div>
        <div className="hey-user" data-cy="hey-user">
          Hey {handle}{" "}
        </div>

        <Tabs
          loading={loadingMyScreams}
          handleClick={this.handleClick}
          order={this.state.order}
          tabLabels={AccountTabData.map((item) => item.text)}
          marginTop={"0px"}
          marginBottom={"40px"}
          lineColor={"white"}
        ></Tabs>

        <div
          className="MainAnimationChannels"
          style={
            this.state.order === 1
              ? { display: "block", width: "100%", minWidth: "100%" }
              : { display: "none", width: "100%", minWidth: "100%" }
          }
        >
          {!loadingMyScreams && this.state.open && (
            <MyIdeas
              loading={loadingMyScreams}
              myScreams={this.state.myScreams}
              classes={classes}
              latitude1={this.state.latitude1}
              latitude2={this.state.latitude2}
              latitude3={this.state.latitude3}
              latitude4={this.state.latitude4}
              longitude1={this.state.longitude1}
              longitude2={this.state.longitude2}
              longitude3={this.state.longitude3}
              longitude4={this.state.longitude4}
              viewport={this.state.viewport}
              _onViewportChange={this._onViewportChange}
              noLocation={this.noLocation}
              dataNoLocationHandle={this.dataNoLocationHandle}
              showDemand={this.state.showDemand}
              handleClick={this.handleClick}
              handleDropdown={this.handleDropdown}
              dropdown={this.state.dropdown}
              handleOpenGeofilter={this.handleOpenGeofilter}
              handleCloseGeofilter={this.handleCloseGeofilter}
              handleResetGeofilter={this.handleResetGeofilter}
              openGeofilter={this.state.openGeofilter}
              showGeofilterResults={this.state.showGeofilterResults}
              createGeofilterCircle={this.state.createGeofilterCircle}
              selectedId={this.state.selectedId}
              screamIdParam={screamIdParam}
              _onViewportChangeDesktop={_onViewportChangeDesktop}
              showTitles={showTitles}
              handleTopicSelector={handleTopicSelector}
              topicsSelected={topicsSelected}
            ></MyIdeas>
          )}
        </div>
        <div
          className="MainAnimationChannels"
          style={
            this.state.order === 2
              ? { display: "block", width: "100%", minWidth: "100%" }
              : { display: "none", width: "100%", minWidth: "100%" }
          }
        >
          <div className="accountCard">
            <div className={classes.content}>
              <Typography className={classes.bodytext}>
                {" "}
                Wir freuen uns über deine Beteiligung! Gefällt dir Senf? Stört
                dich etwas? Melde dich gerne und sag uns, was dir auffällt!
                <br />
                <br />
                Dein Senf.koeln-Team
                <br />
              </Typography>
            </div>{" "}
          </div>
          <div className={classes.accountactions}>
            <button
              className="buttonWide buttonSign"
              style={{ marginTop: "20px" }}
              onClick={handleLogout}
            >
              Ausloggen{" "}
            </button>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "50px",
                textDecoration: "underline",
              }}
              onClick={deleteAccount}
            >
              Konto löschen{" "}
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <Fragment>
        <button
          onClick={this.handleOpen}
          className="buttonExpand ripple"
          data-cy="profile-button"
        ></button>

        {!this.props.UI.openInfoPage &&
          (isMobileCustom ? (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              TransitionComponent={Transition}
              fullScreen
            >
              <Swipe onSwipeMove={this.onSwipeMove.bind(this)}>
                {dialogMarkup}
              </Swipe>
            </Dialog>
          ) : (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              BackdropProps={{ classes: { root: classes.root } }}
              PaperProps={{ classes: { root: classes.paper } }}
              TransitionComponent={Transition}
              fullScreen
              hideBackdrop // Disable the backdrop color/image
              disableEnforceFocus // Let the user focus on elements outside the dialog
              style={this.state.dialogStyle} // This was the key point, reset the position of the dialog, so the user can interact with other elements
              disableBackdropClick // Remove the backdrop click (just to be sure)
            >
              <div className="contentWrapper_dialog">{dialogMarkup}</div>
            </Dialog>
          ))}
      </Fragment>
    );
  }
}

Account.propTypes = {
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  data: state.data,
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Account));
