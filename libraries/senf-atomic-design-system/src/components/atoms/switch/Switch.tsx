/** @format */

import React, { FC, useState } from "react";
import styled from "styled-components";
import { SwitchProps } from "./Switch.types";

const Wrapper = styled.div`
  opacity: ${({ disabled }) => disabled && 0.5};
`;
const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 34px;
  height: 20px;
  border-radius: 50px;
  border: 2px solid
    ${({ theme, toggled }) =>
      toggled ? theme.colors.signal.greenDark : theme.colors.brown.brown4tra};
  background-color: ${({ theme, toggled }) =>
    toggled ? theme.colors.signal.green : theme.colors.brown.brown10tra};
  position: relative;
  transition: background-color 0.2s;
`;

const SwitchButton = styled.span`
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  width: 20px;
  height: 20px;
  border-radius: 10px;

  transition: 0.2s;
  background: ${({ theme }) => theme.colors.white.white100};
  box-shadow: 0px 4px 10px rgba(186, 160, 79, 0.5);
  ${SwitchInput}:checked + ${SwitchLabel} & {
    left: 100%;
    transform: translateX(-100%);
  }
  ${SwitchLabel}:active & {
    width: 20px;
  }
`;

const Switch: FC<SwitchProps> = ({
  id = "switch",
  checked,
  receiveValue,
  onChange,
  disabled,
}) => {
  const [toggle, setToggle] = useState(false);

  return (
    <Wrapper disabled={disabled}>
      <SwitchInput
        className="switch-checkbox"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setToggle(!toggle);
          receiveValue(e.currentTarget.value);
        }}
      />
      <SwitchLabel
        toggled={checked}
        className="switch-label"
        htmlFor={id}
      >
        <SwitchButton
          toggled={checked}
          className="switch-button"
        />
      </SwitchLabel>
    </Wrapper>
  );
};

export default Switch;
