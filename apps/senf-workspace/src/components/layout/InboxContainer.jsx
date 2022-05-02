import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import {
  Icon,
  Input,
  Typography,
  FlexWrapper,
} from "senf-atomic-design-system";
import User from "../User";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
  margin-top: 0px;
  border-right: 3px solid ${({ theme }) => theme.colors.beige.beige10};
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  position: absolute;
  overflow-y: auto;
  width: 330px;
  height: 100%;
  top: 0;
  left: 70px;
`;

const Group = styled.div`
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.brown.brown7 : undefined};
  border-bottom: 2px solid white;
  display: flex;
  gap: 10px;
`;

const InboxContainer = ({
  currentWorkspace,
  searchTerm,
  setSearchTerm,
  users,
  selectFoundUser,
  newChat,
  selectUser,
  user,
  user1,
  chat,
}) => {
  const { t } = useTranslation();

  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <Wrapper>
      <Navbar currentWorkspace={currentWorkspace} />

      <FlexWrapper
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="column"
        width="100%"
        margin="10px 10px 0px 10px"
      >
        <Typography variant="buttonBg">Organisation</Typography>
      </FlexWrapper>

      <Group>
        <Icon icon="bulb" />
        <Typography variant="buttonBg"> Verantwortlichkeiten</Typography>
      </Group>
      <Group>
        <Icon icon="bulb" />
        <Typography variant="buttonBg"> To-Do List</Typography>
      </Group>

      <FlexWrapper
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="column"
        width="100%"
        margin="10px 10px 0px 10px"
      >
        <Typography variant="buttonBg">Gruppen</Typography>
      </FlexWrapper>

      <Group>
        <Icon icon="bulb" />
        <Typography variant="buttonBg"> Allgemein</Typography>
      </Group>
      <Group>
        <Icon icon="bulb" />
        <Typography variant="buttonBg"> Planung</Typography>
      </Group>

      <FlexWrapper
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="column"
        width="100%"
        margin="10px 10px 0px 10px"
      >
        <Typography variant="buttonBg">Direktnachrichten</Typography>
      </FlexWrapper>

      <FlexWrapper
        flexDirection="column"
        width="calc(100% - 20px)"
        margin="10px 10px 0px 10px"
      >
        <Input
          type="text"
          value={searchTerm}
          placeholder={t("search_for_people")}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </FlexWrapper>

      {searchTerm ? (
        <div className="users_search">
          {users
            .filter((val) => {
              console.log(val);
              if (
                val.handle
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              ) {
                return val;
              } else {
                return "";
              }
            })
            .map((val, key) => {
              return (
                <div
                  className="found_user"
                  key={key}
                  onClick={() => selectFoundUser(val)}
                >
                  <p>{val.handle}</p>
                </div>
              );
            })}
        </div>
      ) : null}

      <br />
      {newChat ? (
        <User
          key={newChat.userId}
          user={newChat}
          selectUser={selectUser}
          user1={user1}
          chat={chat}
        />
      ) : null}
      {users
        .filter((val) => {
          if (
            user.interactedUsers &&
            user.interactedUsers.indexOf(val.userId) > -1
          ) {
            return val;
          } else {
            return "";
          }
        })
        .map((user) => (
          <User
            key={user.userId}
            user={user}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
          />
        ))}
    </Wrapper>
  );
};

export default InboxContainer;
