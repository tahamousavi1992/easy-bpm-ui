import React, { useState } from 'react';
import ConfigurationService from '../../../Services/ConfigurationService';
import UtilityService from '../../../Services/UtilityService';
import Lang from '../../../Shared/AdminLang/Lang';
import Select, { CheckBox } from '../../../Components/Select';
class AddEditSetting extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
    }
    async componentDidMount() {
        this.props.setPageCaption(10, [Lang.Menu.AddEditSetting, Lang.Menu.setting], false);
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        //load data 
        let data = await new ConfigurationService().get();
        this.setState({ ...data });
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let result = await new ConfigurationService().update(this.state);
            UtilityService.showMessage(result.ResultType, result.Message);
        }
    }

    render() {
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
                                                <input onChange={this.handelChange} value={this.state.DefaultReportFontFamily || ''} name='DefaultReportFontFamily' className="form-control" />
                                            </div>
                                            <span htmlFor="DefaultReportFontFamily" className="help-block error"></span>
                                        </div>
                                        <div className="col-lg-6">
                                            <label>{Lang.AddEditSetting.processStartPointSerlialNumber}</label>
                                            <div className="input-group">
                                                <input onChange={this.handelChange} value={this.state.ProcessStartPointSerlialNumber || ''} name='ProcessStartPointSerlialNumber' className="form-control" />
                                            </div>
                                            <span htmlFor="ProcessStartPointSerlialNumber" className="help-block error"></span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <label>{Lang.AddEditSetting.processFormatSerlialNumber}</label>
                                            <div className="input-group">
                                                <input onChange={this.handelChange} value={this.state.ProcessFormatSerlialNumber || ''} name='ProcessFormatSerlialNumber' className="form-control" />
                                            </div>
                                            <span htmlFor="ProcessFormatSerlialNumber" className="help-block error"></span>
                                        </div>
                                        <div className="col-lg-6">
                                            <label>{Lang.AddEditSetting.threadStartPointSerlialNumber}</label>
                                            <div className="input-group">
                                                <input onChange={this.handelChange} value={this.state.ThreadStartPointSerlialNumber || ''} name='ThreadStartPointSerlialNumber' className="form-control" />
                                            </div>
                                            <span htmlFor="ThreadStartPointSerlialNumber" className="help-block error"></span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <label>{Lang.AddEditSetting.threadFormatSerlialNumber}</label>
                                            <div className="input-group">
                                                <input onChange={this.handelChange} value={this.state.ThreadFormatSerlialNumber || ''} name='ThreadFormatSerlialNumber' className="form-control" />
                                            </div>
                                            <span htmlFor="ThreadFormatSerlialNumber" className="help-block error"></span>
                                        </div>
                                        <div className="col-lg-6">
                                            <label>{Lang.AddEditSetting.showUserPanelWithNoSkin}</label>
                                            <CheckBox id="ShowUserPanelWithNoSkin" name="ShowUserPanelWithNoSkin" checked={this.state.ShowUserPanelWithNoSkin || false}
                                                handelChange={this.handelChange} />
                                        </div>
                                    </div>
                                    {
                                        !this.state.ShowUserPanelWithNoSkin &&
                                        <div className="form-group row">
                                            <div className="col-lg-6">
                                                <label>{Lang.AddEditSetting.loadUserPanelJquery}</label>
                                                <CheckBox id="LoadUserPanelJquery" name="LoadUserPanelJquery" checked={this.state.LoadUserPanelJquery || false}
                                                    handelChange={this.handelChange} />
                                            </div>
                                            <div className="col-lg-6">
                                                <label>{Lang.AddEditSetting.loadUserPanelBootstrap}</label>
                                                <CheckBox id="LoadUserPanelBootstrap" name="LoadUserPanelBootstrap" checked={this.state.LoadUserPanelBootstrap || false}
                                                    handelChange={this.handelChange} />
                                            </div>
                                        </div>
                                    }
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <label>{Lang.AddEditSetting.addUserAutomatically}</label>
                                            <CheckBox id="AddUserAutomatically" name="AddUserAutomatically" checked={this.state.AddUserAutomatically || false}
                                                handelChange={this.handelChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button id="btnSaveInfo" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold">
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
}

export default AddEditSetting;

