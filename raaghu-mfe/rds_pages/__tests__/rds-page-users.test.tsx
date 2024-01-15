import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../libs/state-management/index";
import Users from "../rds-page-users/src/users/users";
jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: any) => key }),
    initReactI18next: { type: 'mock' },
  }));
  

it("renders Text Templates page correctly", () => {
    render(
        <Provider store={store}>
            <Users />
        </Provider>
    );

    // expect(screen.getByTestId("new-language")).toBeInTheDocument();
    // const displayNameText = screen.getAllByText("Display Name");
    // displayNameText.forEach(item=>{
    //     expect(item).toBeInTheDocument();
    // })
});
