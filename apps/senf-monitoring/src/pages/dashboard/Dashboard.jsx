import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  IdeaCard,
  ModalButton,
  List,
  Icon,
  Dropdown,
  useModals,
  User,
  LayerWhiteFirstDefault,
  Input,
  TableTemplate,
} from "senf-atomic-design-system";
import styled from "styled-components";
import { useAuthContext } from "senf-shared";
import IdeaSidebarContent from "../ideaProcessing/IdeaSidebarContent";

const Wrapper = styled.div`
  top: 0;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const TableWrapper = styled.div``;
const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openModal } = useModals();
  const { user } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");

  const [greeting, setGreeting] = useState("");
  const ideas = useSelector((state) => state.data.ideas);
  const { ideaId } = useParams();

  useEffect(() => {
    if (ideaId) {
      openModal(<IdeaSidebarContent ideaId={ideaId} />, {
        padding: 0,
        size: "full",
        beforeClose: () => navigate(`/`),
      });
    }
  }, [ideaId]);

  useEffect(() => {
    const myDate = new Date();
    const hours = myDate.getHours();

    if (hours < 12) {
      setGreeting("Good morning");
    } else if (hours >= 12 && hours <= 17) {
      setGreeting("Good afternoon");
    } else if (hours >= 17 && hours <= 24) {
      setGreeting("Good evening");
    }
  }, []);

  const onRowClick = (value) => {
    navigate(`/idea/${value.ideaId}`);
    openModal(<IdeaSidebarContent ideaId={value.ideaId} />, {
      padding: 0,
      size: "full",
      beforeClose: () => navigate(`/`),
    });
  };

  return (
    <Wrapper>
      <Box
        gap="20px"
        flexDirection="column"
        margin="30px"
      >
        <Typography variant="h3">
          {" "}
          {greeting} {user?.handle}{" "}
        </Typography>

        {ideas && (
          <TableTemplate
            title={t("idealist")}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            data={ideas}
            // checkbox={"docId"}
            bulkEdit={<Icon icon="Search" />}
            onRowClick={onRowClick}
            columns={[
              { key: "topic", label: t("topic") },
              { key: "id", label: t("id") },
              { key: "date", label: t("date") },
              { key: "district", label: t("district") },
              { key: "likeCount", label: <Icon icon="FlameInactive" /> },
              {
                key: "commentCount",
                label: <Icon icon="CommentInactive" />,
              },
              { key: "status", label: t("status") },
              { key: "respnsibiity", label: t("respnsibiity") },
            ]}
          >
            {(row) => (
              <Box justifyContent="space-between">
                <Box gap="16px">
                  <Box
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <Typography variant="h3">{row.title}</Typography>
                    {/* {row?.email && <Typography variant="bodySm">{row.email}</Typography>} */}
                  </Box>
                </Box>
                <Typography variant="bodySm">{row.ideaId}</Typography>
                <Typography variant="bodySm">{row.createdAt}</Typography>
                <Typography variant="bodySm">{row.Stadtteil}</Typography>
                <Typography variant="bodySm">{row.likeCount}</Typography>
                <Typography variant="bodySm">{row.commentCount}</Typography>
                <Typography variant="bodySm">{row.status}</Typography>
                <Typography variant="bodySm">{row.responsibility}</Typography>

                <Box
                  gap="8px"
                  marginLeft="0"
                >
                  <Button
                    variant="white"
                    text="Delete"
                    onClick={(event) => {
                      event.stopPropagation();
                      console.log("delete");
                    }}
                  />
                </Box>
              </Box>
            )}
          </TableTemplate>
        )}
      </Box>
    </Wrapper>
  );
};

export default Dashboard;
