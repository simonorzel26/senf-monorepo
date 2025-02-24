/** @format */

import React, { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useFormik } from "formik";
import {
  Arrow,
  CalendarIcon,
  Dot,
  DotAllTopics,
  Hyperlink,
  Mail,
} from "../../../assets/icons";
import { OptionsTopics } from "../../../data/OptionsTopics";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import ContentDropdown from "../../atoms/contentDropdown/ContentDropdown";
import ContentDropdownItem from "../../atoms/contentDropdown/ContentDropdownItem";
import Divider from "../../atoms/divider/Divider";
import Input from "../../atoms/inputs/Input";
import Typography from "../../atoms/typography/Typography";
import ModalButton from "../../molecules/modalStack/ModalButton";
import { useModals } from "../../molecules/modalStack/ModalProvider";
import DatePicker from "../../organisms/datePicker/DatePicker";
import { PostIdeaFormProps } from "./PostIdeaForm.types";
import Geocoder from "../../atoms/geocoder/Geocoder";
import PostIdeaFormContacts from "./PostIdeaFormContacts";
import setColorByTopic from "../../../data/setColorByTopic";
import DropdownButton from "../../atoms/contentDropdown/DropdownButton";

const contactData = [
  {
    description: "Deine Kontaktdaten werden öffentlich gezeigt.",
    name: "contactTitle",
    placeholder: "contactTitle",
  },
  {
    name: "contact",
    placeholder: "contact",
  },
];

const webLinkData = [
  {
    description:
      "Du kannst deinem Link einen eigenen Titel geben. Wenn du möchtest dass die URL angezeigt wird, lasse das Feld einfach frei.",
    name: "weblinkTitle",
    placeholder: "weblinkTitle",
  },
  {
    name: "weblink",
    placeholder: "weblink",
  },
];

const Wrapper = styled.div<PostIdeaFormProps>`
  width: 100%;
  height: auto;
  padding: 16px;
  background-color: white;
  z-index: 2;
`;

const PostIdeaForm: FC<PostIdeaFormProps> = ({
  formik,
  statefulMap,
  checkIfCalendar,
  selectedDays,
  handleChangeCalendar,
  handleSubmit,
  loading,
  Out,
}) => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom();
  const { closeModal } = useModals();

  return (
    <Wrapper>
      <Box
        marginBottom="20px"
        flexDirection="column"
      >
        <Typography variant="bodySm">Adresse deiner Idee</Typography>
        {!isMobile && (
          <Geocoder
            formik={formik}
            statefulMap={statefulMap}
          />
        )}
      </Box>
      <Box
        gap="20px"
        flexDirection="column"
      >
        <Input
          name="title"
          type="text"
          placeholder={t("add_title")}
          label={t("postScream_ideaTitle")}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          value={formik?.values.title}
          error={formik?.touched.title && Boolean(formik?.errors?.title)}
          note={formik?.touched.title && formik?.errors?.title}

          // maxLength: 70
        />

        <Input
          name="body"
          type="textarea"
          placeholder={t("add_body")}
          label={t("postScream_ideaBody")}
          rows={5}
          maxRows={10}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          value={formik?.values.body}
          error={formik?.touched.body && Boolean(formik?.errors?.body)}
          note={formik?.touched.body && formik?.errors?.body}

          // maxLength: 800
        />

        <Box
          gap="8px"
          width="100%"
        >
          <ModalButton
            width="max"
            variant="secondary"
            size="small"
            text={formik?.values.weblinkTitle || t("add_weblink")}
            icon={<Hyperlink />}
            options={{
              style: {
                padding: 20,
              },
              title: t("add_weblink"),
              cancelText: t("cancel"),
              submitText: t("save"),
              onSubmit: closeModal,
            }}
          >
            <PostIdeaFormContacts
              formikEditIdea={formik}
              contactData={webLinkData}
            />
          </ModalButton>

          <ModalButton
            variant="secondary"
            size="small"
            width="max"
            text={formik?.values.contactTitle || t("add_contact")}
            icon={<Mail />}
            options={{
              style: {
                padding: 20,
              },
              title: t("add_contact"),
              cancelText: t("cancel"),
              submitText: t("save"),
              onSubmit: closeModal,
            }}
          >
            <PostIdeaFormContacts
              formikEditIdea={formik}
              contactData={contactData}
            />
          </ModalButton>
        </Box>

        <Divider />

        <Typography
          variant="buttonBg"
          textAlign="center"
        >
          Welche Kategorie passt zu deiner Idee?
        </Typography>
        <DropdownButton
          variant="white"
          icon={
            formik?.values?.topic ? (
              <Dot color={setColorByTopic(formik?.values?.topic)} />
            ) : (
              <DotAllTopics />
            )
          }
          width="max"
          text={formik?.values.topic || "Kategorie wählen"}
          options={{ size: "md", closeOnSelect: true }}
          data={OptionsTopics().map(({ value, label }) => {
            return {
              text: value,
              leadingIcon: <Dot color={setColorByTopic(value)} />,
              onClick: () => {
                formik?.setFieldValue("topic", value);
              },
            };
          })}
        />

        <Divider />
        {checkIfCalendar && (
          <ModalButton
            variant="secondary"
            text={
              selectedDays?.length > 0
                ? selectedDays.map(
                    (entry, i) =>
                      `${entry.day}.${entry.month.number}${
                        i !== selectedDays.length - 1 ? ", " : ""
                      }`
                  )
                : "Termine hinzufügen"
            }
            size="small"
            width="max"
            icon={<CalendarIcon />}
            options={{
              style: {
                padding: 20,
              },
              title: t("add_date"),
              cancelText: t("cancel"),
              submitText: t("save"),
              onSubmit: closeModal,
            }}
          >
            <Typography variant="bodyBg">
              {t("first_date_then_time")}
            </Typography>
            <Box
              gap="16px"
              flexDirection="column"
              marginTop="20px"
            >
              <DatePicker
                handleChangeCalendar={handleChangeCalendar}
                selectedDays={selectedDays}
              />
            </Box>
          </ModalButton>
        )}

        <Button
          onClick={handleSubmit}
          variant={
            formik?.errors?.body ||
            formik?.errors?.title ||
            !formik?.values?.address ||
            Out === true
              ? "white"
              : "primary"
          }
          text={t("postScream_shareIdea")}
          loading={loading}
          disabled={
            !!(
              formik?.errors?.body ||
              formik?.errors?.title ||
              !formik?.values?.address ||
              Out === true
            )
          }
        />
      </Box>
    </Wrapper>
  );
};

export default PostIdeaForm;
