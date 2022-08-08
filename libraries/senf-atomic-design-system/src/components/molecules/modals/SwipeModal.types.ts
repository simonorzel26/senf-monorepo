/** @format */

import { MouseEventHandler } from "react";

export interface SwipeModalProps {
  x?: string;
  size?: "xl" | "l" | "m";
  backgroundColor?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  setOpenModal: (x: boolean) => void;
  openModal: boolean;
  children: React.ReactNode;
  zIndex?: number | string;
  portalId?: string;
  overflow?: string;
}
