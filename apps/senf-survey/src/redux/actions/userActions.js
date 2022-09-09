/** @format */

import { signOut, sendPasswordResetEmail, deleteUser } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import i18n from "i18next";
import { db, auth } from "../../firebase";

import {
  SET_USER,
  SET_UNAUTHENTICATED,
  SET_DATA_ERROR,
  SET_DATA_SUCCESS,
  LOADING_DATA,
  STOP_LOADING_DATA,
} from "../types";

export const resetPassword = (email) => (dispatch) => {
  console.log(email);
  dispatch({ type: LOADING_DATA });
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email sent!", email);
      // Password reset email sent!
      // ..
      dispatch({
        type: SET_DATA_SUCCESS,
        payload: i18n.t("reset_password_success"),
      });
      dispatch({ type: STOP_LOADING_DATA });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch({ type: STOP_LOADING_DATA });
      if (errorCode === "auth/invalid-email") {
        dispatch({
          type: SET_DATA_ERROR,
          payload: i18n.t("email_not_valid"),
        });
      }
      if (errorCode === "auth/user-not-found") {
        dispatch({
          type: SET_DATA_ERROR,
          payload: i18n.t("email_not_found"),
        });
      }
    });
};

export const logoutUser = () => (dispatch) => {
  signOut(auth)
    .then(() => {
      dispatch({ type: SET_UNAUTHENTICATED });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage, "error during logoutUser");
    });
};
export const deleteUserFromDb = (userId) => async (dispatch) => {
  if (userId) {
    try {
      const currentuser = auth.currentUser;
      const cantDeleteSuperAdmins = ["dein@senf.koeln"];
      if (cantDeleteSuperAdmins.includes(currentuser.email)) {
        alert("cant delete SuperAdmin");
        return;
      }
      if (currentuser.uid === userId) {
        const userRef = doc(db, "users", userId);
        const emailRef = doc(db, "users", userId, "Private", userId);

        await deleteDoc(emailRef);
        await deleteDoc(userRef);

        await deleteUser(currentuser);
        dispatch({ type: SET_UNAUTHENTICATED });
        dispatch(closeAccountFunc());
      }
    } catch (error) {
      throw new Error(error);
    }
  }
};

export const getUserLikesAndComments = (userData) => async (dispatch) => {
  try {
    if (userData) {
      const likesRef = collection(db, "likes");
      const commentsRef = collection(db, "comments");
      const q1 = query(likesRef, where("userId", "==", userData.userId));
      const q2 = query(commentsRef, where("userId", "==", userData.userId));
      const likesQuerySnapshot = await getDocs(q1);
      const commentsQuerySnapshot = await getDocs(q2);

      likesQuerySnapshot.forEach((doc) =>
        userData.likes.push({ ...doc.data() })
      );
      commentsQuerySnapshot.forEach((doc) =>
        userData.comments.push({ ...doc.data() })
      );
      dispatch({
        type: SET_USER,
        payload: userData,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
export const getUserData = (uid) => async (dispatch) => {
  try {
    if (uid) {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userId", "==", uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        userData.likes = [];
        userData.comments = [];

        dispatch(getUserLikesAndComments(userData));
      });
    }
  } catch (error) {
    console.error(error);
  }
};
