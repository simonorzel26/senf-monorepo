/** @format */

import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { ProfilePage as ProfilePageComponent, ModalContext, Loader } from "senf-atomic-design-system";
import { getAuth } from "firebase/auth";
import { useParams, useHistory } from "react-router-dom";

import { closeAccountFunc, getMyOrganizations, getMyScreams } from "../redux/actions/accountActions";

import { handleTopicSelectorRedux } from "../redux/actions/UiActions";

import {
  search,
  sort,
  filterByGeodata,
  filterByTagFilter,
} from "../util/helpers";

import { deleteUserFromDb, getUserData, logoutUser } from "../redux/actions/userActions";
import Auth from "./Auth";
import { isMobileCustom } from "../util/customDeviceDetect";

const ProfilePage = ({
  handleButtonOpenCard,
  handleOpenProjectroom,
  setAuthEditOpen,
  handleButtonLike,
  handleButtonComment,
}) => {

  const { t } = useTranslation();
  const { handleModal } = React.useContext(ModalContext) || {};

  const loadingMyScreams = useSelector((state) => state.data.loadingMyScreams);

  const mapBounds = useSelector((state) => state.data.mapBounds);
  const selectedTopics = useSelector((state) => state.data.topics);
  const myScreams = useSelector((state) => state.user.myScreams);
  const myOrganizations = useSelector((state) => state.user.myOrganizations);
  const myProfileData = useSelector((state) => state.user);

  const profilePageData = useSelector((state) => state.data.guestProfile?.guestData?.userData);
  const profilePageScreams = useSelector((state) => state.data.guestProfile?.guestData?.screams);
  const profilePageOrganizations = useSelector((state) => state.data.guestProfile?.guestData?.organizations);
  const openAccount = useSelector((state) => state.UI.openAccount);
  const organizations = useSelector((state) => state.data.organizations);
  const organization = useSelector((state) => state.data.organization);


  const [foundOrganizations, setFoundOrganizations] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdown, setDropdown] = useState("newest");
  const [order, setOrder] = useState(1);
  const [accountOwner, setAccountOwner] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();
  const firebaseUser = auth.currentUser;
  const history = useHistory();
  const handleClose = useCallback(() => {


    dispatch(closeAccountFunc());
    dispatch(handleTopicSelectorRedux("all"));

    history.push("/");
    // history.goBack(); // @Todo: why it goes back to /projectroom ?? it should be /idea/1234

  }, [dispatch, history]);

  const handleClick = useCallback((order) => {
    setOrder(order);
  }, []);
  const handleDropdown = useCallback((value) => {
    setDropdown(value);
  }, []);
  // My Ideas
  const screamsSearched = search(myScreams, searchTerm, [
    "title",
    "body",
    "Stadtteil",
    "Stadtbezirk",
    "locationHeader",
  ]);
  const myIdeasfilteredByTagFilter = filterByTagFilter(
    screamsSearched,
    selectedTopics,
    "Thema"
  );
  const sortedScreams = sort(myIdeasfilteredByTagFilter, dropdown);
  // ideasData = filterByStatus(ideasData, dropdownStatus);
  const MyIdeasDataFinal = filterByGeodata(sortedScreams, mapBounds);

  // My Organizations
  const organizationsSearched = search(myOrganizations, searchTerm, ["title"]);
  const sortedOrganizations = sort(organizationsSearched, dropdown);
  const MyDataFinalOrganizations = sortedOrganizations;

  const { profileId } = useParams() // /profile/V4JkU7aQ...

  useEffect(() => {


    if (profileId) {
      const profilePage = true;
      if (profileId !== myProfileData.userId && openAccount) {
        // visiting profile of other user




        dispatch(getUserData(profileId, profilePage))
        dispatch(getMyScreams(profileId, profilePage));
        dispatch(getMyOrganizations(profileId, profilePage))
      } else if (profileId === myProfileData.userId && openAccount) {
        // visiting my own profile

        dispatch(getUserData(myProfileData.userId, profilePage))
        dispatch(getMyScreams(myProfileData.userId, profilePage));
        dispatch(getMyOrganizations(myProfileData.userId, profilePage))

      }
    }
  }, [dispatch, openAccount, myProfileData.userId, profileId]);
  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  const handleDeleteAccount = () => {
    dispatch(deleteUserFromDb(firebaseUser.uid)).then(() => {
      handleModal("pop")
      handleModal("pop")
      history.push('/');
    }).catch(err => {
      throw new Error(err, ' error in deleteUserFromDb in ProfilePage.jsx')
    })
  };

  useEffect(() => {
    if (myProfileData && myProfileData.authenticated && myProfileData.userId === profileId) {
      setAccountOwner(true)
    } else {

      setAccountOwner(false)
    }


  }, [myProfileData, profileId])





  return (

    <React.Fragment >
      {profilePageData ?
        <ProfilePageComponent
          user={profilePageData}
          accountOwner={accountOwner}
          organization={organization}
          organizations={organizations}
          myOrganizations={profilePageOrganizations}
          myScreams={profilePageScreams}
          handleButtonOpenCard={handleButtonOpenCard}
          handleOpenProjectroom={handleOpenProjectroom}
          handleButtonLike={handleButtonLike}
          handleButtonComment={handleButtonComment}
          handleButtonClose={handleClose}
          handleSetAuthEditOpen={() => handleModal("push", <Auth authAddDetails={true} />, { swipe: !!isMobileCustom, size: "md", height: isMobileCustom && window.innerHeight + 83, padding: 0 })

          }
          handleLogout={handleLogout}
          handleDeleteAccount={handleDeleteAccount}

        // setEditProfileOpen,
        /> :
        <React.Fragment />
      }

    </React.Fragment >

  );
};

export default ProfilePage;
