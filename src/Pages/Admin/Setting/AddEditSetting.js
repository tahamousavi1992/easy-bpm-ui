import React, { useState, useEffect } from 'react';
import ConfigurationService from '../../../Services/ConfigurationService';
import UtilityService from '../../../Services/UtilityService';
import Lang from '../../../Shared/AdminLang/Lang';
import { CheckBox } from '../../../Components/Select';
import {useSelector, useDispatch} from 'react-redux'
import { setConfiguration, updateConfiguration, getConfiguration } from '../../../State/reducers/configuration';

export default function AddEditSetting(props) {
    let model = useSelector((state)=> state.configuration.value);
    let dispatch = useDispatch();

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        props.setPageCaption(10, [Lang.Menu.AddEditSetting, Lang.Menu.setting], false);
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');

        dispatch(getConfiguration());

        //To clean up something after unmouniting the component.
        return () => { }
    }, []); // Or [] if effect doesn't need props or state

    async function handelChange(event) {
        dispatch(setConfiguration(UtilityService.handelChange(event)))
    }

    async function submitForm(event) {
        if (window.bpmsFormIsValid()) {
            dispatch(updateConfiguration(model));
        }
    }

    return (
        <div>
            <div id="dbManagerIndexSearchForm">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card card-custom gutter-b">
                            <div className="card-header flex-wrap border-0 pt-6 pb-0">
                                <div className="card-title">
                                    <h3 className="card-label">
                                        {Lang.AddEditSetting.caption}
                                    </h3>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <label>{Lang.AddEditSetting.defaultReportFontFamily}</label>
                                        <div className="input-group">
                                            <input onChange={handelChange} value={model.DefaultReportFontFamily || ''} name='DefaultReportFontFamily' className="form-control" />
                                        </div>
                                        <span htmlFor="DefaultReportFontFamily" className="help-block error"></span>
                                    </div>
                                    <div className="col-lg-6">
                                        <label>{Lang.AddEditSetting.processStartPointSerlialNumber}</label>
                                        <div className="input-group">
                                            <input onChange={handelChange} value={model.ProcessStartPointSerlialNumber || ''} name='ProcessStartPointSerlialNumber' className="form-control" />
                                        </div>
                                        <span htmlFor="ProcessStartPointSerlialNumber" className="help-block error"></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <label>{Lang.AddEditSetting.processFormatSerlialNumber}</label>
                                        <div className="input-group">
                                            <input onChange={handelChange} value={model.ProcessFormatSerlialNumber || ''} name='ProcessFormatSerlialNumber' className="form-control" />
                                        </div>
                                        <span htmlFor="ProcessFormatSerlialNumber" className="help-block error"></span>
                                    </div>
                                    <div className="col-lg-6">
                                        <label>{Lang.AddEditSetting.threadStartPointSerlialNumber}</label>
                                        <div className="input-group">
                                            <input onChange={handelChange} value={model.ThreadStartPointSerlialNumber || ''} name='ThreadStartPointSerlialNumber' className="form-control" />
                                        </div>
                                        <span htmlFor="ThreadStartPointSerlialNumber" className="help-block error"></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <label>{Lang.AddEditSetting.threadFormatSerlialNumber}</label>
                                        <div className="input-group">
                                            <input onChange={handelChange} value={model.ThreadFormatSerlialNumber || ''} name='ThreadFormatSerlialNumber' className="form-control" />
                                        </div>
                                        <span htmlFor="ThreadFormatSerlialNumber" className="help-block error"></span>
                                    </div>
                                    <div className="col-lg-6">
                                        <label>{Lang.AddEditSetting.showUserPanelWithNoSkin}</label>
                                        <CheckBox id="ShowUserPanelWithNoSkin" name="ShowUserPanelWithNoSkin" checked={model.ShowUserPanelWithNoSkin || false}
                                            handelChange={handelChange} />
                                    </div>
                                </div>
                                {
                                    !model.ShowUserPanelWithNoSkin &&
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <label>{Lang.AddEditSetting.loadUserPanelJquery}</label>
                                            <CheckBox id="LoadUserPanelJquery" name="LoadUserPanelJquery" checked={model.LoadUserPanelJquery || false}
                                                handelChange={handelChange} />
                                        </div>
                                        <div className="col-lg-6">
                                            <label>{Lang.AddEditSetting.loadUserPanelBootstrap}</label>
                                            <CheckBox id="LoadUserPanelBootstrap" name="LoadUserPanelBootstrap" checked={model.LoadUserPanelBootstrap || false}
                                                handelChange={handelChange} />
                                        </div>
                                    </div>
                                }
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <label>{Lang.AddEditSetting.addUserAutomatically}</label>
                                        <CheckBox id="AddUserAutomatically" name="AddUserAutomatically" checked={model.AddUserAutomatically || false}
                                            handelChange={handelChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button id="btnSaveInfo" type="button" onClick={submitForm} className="btn btn-primary font-weight-bold">
                                    {Lang.Shared.save}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );

}


