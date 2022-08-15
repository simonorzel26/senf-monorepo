/** @format */

import React, { FC, useState } from "react";
import styled from "styled-components";
import Wave from "../../atoms/shapes/Wave";
import { AuthProps } from "./Auth.types";

import Box from "../../atoms/box/Box";
import Accordion from "../../molecules/accordion/Accordion";
import Success from "../../templates/success/Success";

import RoundedButton from "../../atoms/buttons/RoundedButton";
import Plus from "../../../assets/icons/Plus";
import Arrow from "../../../assets/icons/Arrow";

import AuthOptions from "../../templates/auth/AuthOptions";

import SenfManSquating from "../../../assets/illustrations/senfManSquatting.png";

import AuthEmail from "../../templates/auth/AuthEmail";
import AuthResetEmail from "../../templates/auth/AuthResetEmail";
import AuthVerifyEmail from "../../templates/auth/AuthVerifyEmail";
import AuthAddDetails from "../../templates/auth/AuthAddDetails";
import TertiaryButton from "../../atoms/buttons/TertiaryButton";
import Button from "../../atoms/buttons/Button";

const Wrapper = styled.div<AuthProps>`
  position: relative;
  width: 100%;
  max-width: 400px;
  min-height: 700px;
  background-color: ${(props) => props.theme.colors.beige.beige20};
  overflow: hidden;
  top:0;
`;
const Img = styled.img`
  position: absolute;
  right: 24px;
  margin-top: 91px;
  width: 126px;
  z-index: 1;
  pointer-events: none;
  user-select: none;
`;
const StyledSvg = styled.svg`
  position: absolute;
  right: -67px;
  margin-top: 193px;
  z-index: 0;
  pointer-events: none;
  user-select: none;
`;

const Auth: FC<AuthProps> = ({
  handleClose,
  handleSubmitRegister,
  registerLoading,
  handleSubmitLogin,
  loginLoading,
  handleGoogleSignIn,
  googleLoading,
  handleFacebookSignIn,
  facebookLoading,
  resetLoading,
  handleSubmitResetEmail,
  emailRegistrationSubmitted,
  verifiedUser,
  addedDetails,
  user,
  handleSubmitEditDetails,
  handleImageUpload,
  uploadingImage,
  errorMessage,
  dataSuccess,
}) => {
  const [page, setPage] = useState("authOptions");
  console.log(verifiedUser, 'verifiedUser')
  console.log(addedDetails, 'addedDetails')
  console.log(emailRegistrationSubmitted, 'emailRegistrationSubmitted')
  return (
    <Wrapper>
      <Box margin="10px" position="absolute" zIndex={999}>
        {
          page !== "authOptions" && (
            <Button
              variant="tertiary"
              icon={<Arrow transform="rotate(180deg)" />}
              onClick={() => setPage("authOptions")}
            />
          )
        }
      </Box>

      <Wave color="#fed957" top="170px" />

      {!verifiedUser && (
        <React.Fragment>
          <Img src={SenfManSquating} alt="Illustration" />
          <StyledSvg xmlns="http://www.w3.org/2000/svg" width="175" height="69">
            <g>
              <defs>
                <linearGradient
                  id="idX0hbBYeIVg-1861781537"
                  gradientTransform="rotate(154, 0.5, 0.5)"
                >
                  <stop
                    offset="0"
                    stopColor="rgba(186, 163, 79, 0)"
                    stopOpacity="0"
                  ></stop>
                  <stop
                    offset="1"
                    stopColor="rgba(119, 108, 70, 0.46)"
                    stopOpacity="0.46"
                  ></stop>
                </linearGradient>
              </defs>
              <path
                d="M 0.5 68.5 L 174.5 0.5 L 174.5 33.5 L 56.5 67 L 62 55.5 L 26 67 Z"
                fill="url(#idX0hbBYeIVg-1861781537)"
                stroke="hsla(0, 0%, 100%, 0)"
              ></path>
            </g>
          </StyledSvg>
        </React.Fragment>
      )}

      {emailRegistrationSubmitted ? (
        <AuthVerifyEmail />
      ) : page === "authEmail" && !emailRegistrationSubmitted && !verifiedUser ? (
        <AuthEmail
          setPage={setPage}
          handleSubmitRegister={handleSubmitRegister}
          handleSubmitLogin={handleSubmitLogin}
          registerLoading={registerLoading}
          loginLoading={loginLoading}
          errorMessage={errorMessage}
        />
      ) : verifiedUser && !addedDetails && !emailRegistrationSubmitted ? (
        <AuthAddDetails
          user={user}
          handleSubmitEditDetails={handleSubmitEditDetails}
          handleImageUpload={handleImageUpload}
          uploadingImage={uploadingImage}
        />
      ) : page === "authResetEmail" ? (
        <AuthResetEmail
          resetLoading={resetLoading}
          handleSubmitResetEmail={handleSubmitResetEmail}
          dataSuccess={dataSuccess}
        />
      ) : (
        <AuthOptions
          handleGoogleSignIn={handleGoogleSignIn}
          googleLoading={googleLoading}
          handleFacebookSignIn={handleFacebookSignIn}
          facebookLoading={facebookLoading}
          setPage={setPage}
        />
      )}
    </Wrapper>
  );
};

export default Auth;
