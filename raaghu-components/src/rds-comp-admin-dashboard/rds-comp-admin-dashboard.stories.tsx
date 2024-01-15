import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompAdminDashboard from "./rds-comp-admin-dashboard";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Admin Dashboard",
  component: RdsCompAdminDashboard,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompAdminDashboard>;

const Template: ComponentStory<typeof RdsCompAdminDashboard> = (args) => (
  <RdsCompAdminDashboard {...args} />
);

export const AdminDashboard = Template.bind({});

AdminDashboard.args = {


};
