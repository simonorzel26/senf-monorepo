/** @format */

import { MouseEventHandler } from "react";

export type errorMessage = { code: string; message: string };

export interface AuthEmailProps {
  text?: string;
  variant?: "register" | "login";
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  formikRegisterStore?: Function;
  formikLoginStore?: Function;
  handleSubmitRegister?: Function;
  handleSubmitLogin?: Function;
  errorMessage?: errorMessage;
  setPage?: React.Dispatch<React.SetStateAction<string>>;
}
