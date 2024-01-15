import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompProfile from "./rds-comp-profile";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/Profile",
    component: RdsCompProfile,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],
} as ComponentMeta<typeof RdsCompProfile>;

const Template: ComponentStory<typeof RdsCompProfile> = (args) => (
    <RdsCompProfile {...args} />
);

export const Profile = Template.bind({});

Profile.args = {
    navtabItems: [
        {
            "label": "My Account",
            "iconPath": "profile_picture_square",
            "subText": "Manage accounts linked to your account",
            "id": "nav-LinkAccount",
        },
        {
            "label": "Security logs",
            "iconPath": "setting",
            "subText": "Manage authority accounts",
            "id": "nav-Deligation",
        },
        {
            "label": "Personal Data",
            "iconPath": "login_attempts",
            "subText": "See recent login attempts for your account",
            "id": "nav-Attempts",
        }
    ],
    profilePic: "https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png",
    userName: "User Name",
    userRole: " Admin",
};
