import React, { useState, useEffect } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsLabel } from "../rds-elements";
import { useTranslation } from "react-i18next";


export interface RdsCompIdentityLdapManagementProps {
    ldapData: any
    onLdapSettingsSubmit?: any
    onSaveHandler?: (data: any) => void;
    reset?: boolean;
}
const RdsCompIdentityLdapManagement = (props: RdsCompIdentityLdapManagementProps) => {
    const [ldap, setLdap] = useState(props.ldapData);
    const [inputReset, setInputReset] = useState(false);

    useEffect(() => {
        setLdap(props.ldapData);
    }, [props.ldapData]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

    const handleChangeform = (value: any, key: any) => {
        setLdap({ ...ldap, [key]: value });
    }

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(ldap);
        setInputReset(!inputReset);
      setLdap({
            enableLdapLogin: false,
            ldapServerHost: "",
            ldapServerPort: "",
            ldapBaseDc: "",
            ldapDomain: "",
            ldapUserName: "",
            ldapPassword: ""
        });
    } 


    return (
        <div className="pt-2">
            <form>
              <div className="custom-content-scroll">
                <div className="mb-3 fw-medium">
                    <RdsLabel label="Ldap Login Settings"></RdsLabel>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                    <RdsCheckbox
                        label="Enable Ldap Login"
                        onChange={(e: any) => { handleChangeform(e.target.checked, "enableLdapLogin"); }}
                        checked={ldap?.enableLdapLogin}
                        dataTestId="use-default-credential"
                    ></RdsCheckbox>
                </div>
                <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 mb-3">
                        <div className="form-group">
                            <RdsInput
                                value={ldap?.ldapServerHost}
                                name="serverHost"
                                label="Server Host"
                                placeholder="Enter Server Host"
                                customClasses="form-control"
                                onChange={(e: any) => handleChangeform(e.target.value, "ldapServerHost")}
                                dataTestId="server-host"
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 mb-3">
                        <RdsInput
                            placeholder="389"
                            customClasses="form-control"
                            inputType="text"
                            label="Server Port"
                            name="ldapServerPort"
                            value={ldap?.ldapServerPort}
                            onChange={(e: any) => handleChangeform(e.target.value, "ldapServerPort")}
                            dataTestId="server-port"
                        ></RdsInput>

                    </div>
                    <div className="offset-xxl-4 offset-xl-4 offset-lg-4"></div>
                </div>
                <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 mb-3">
                        <div className="form-group">
                            <RdsInput
                                value={ldap?.ldapBaseDc}
                                name="ldapBaseDc"
                                label="Base Dc"
                                placeholder="Enter Base Domain Component"
                                customClasses="form-control"
                                onChange={(e: any) => handleChangeform(e.target.value, "ldapBaseDc")}
                                dataTestId="base-domain"
                            ></RdsInput>

                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 mb-3">
                        <RdsInput
                            placeholder="Enter Domain"
                            customClasses="form-control"
                            inputType="text"
                            label="Domain"
                            name="ldapDomain"
                            value={ldap?.ldapDomain}
                            onChange={(e: any) => handleChangeform(e.target.value, "ldapDomain")}
                            dataTestId="domain"
                        ></RdsInput>
                    </div>
                    <div className="offset-xxl-4 offset-xl-4 offset-lg-4"></div>
                </div>
                <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 mb-3">
                        <div className="form-group">
                            <RdsInput
                                value={ldap?.ldapUserName}
                                name="ldapUserName"
                                label="Username"
                                placeholder="Enter Username"
                                customClasses="form-control"
                                onChange={(e: any) => handleChangeform(e.target.value, "ldapUserName")}
                                dataTestId="username"
                            ></RdsInput>

                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 mb-3">
                        <RdsInput
                            value={ldap?.ldapPassword}
                            name="ldapPassword"
                            label="Password"
                            placeholder="Enter Password"
                            inputType="password"
                            customClasses="form-control"
                            onChange={(e: any) => handleChangeform(e.target.value, "ldapPassword")}
                            dataTestId="password"
                            showIcon= {false}
                        ></RdsInput>
                    </div>
                    <div className="offset-xxl-4 offset-xl-4 offset-lg-4"></div>
                </div>
              </div>
              <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                    <RdsButton
                        label="Save"
                        type="submit"
                        colorVariant="primary"
                        size="small"
                        dataTestId="save"
                        onClick={(e: any) => emitSaveData(e)}
                    ></RdsButton>
                </div>

            </form>
        </div>
    );
};

export default RdsCompIdentityLdapManagement;