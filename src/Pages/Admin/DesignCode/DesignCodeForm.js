import React, { useState } from 'react';
import DesignCodeService from '../../../Services/DesignCodeService';
import UtilityService from '../../../Services/UtilityService';
import Select from '../../../Components/Select';
import BusinessRuleDiagram from './BusinessRuleDiagram'
import Lang from '../../../Shared/AdminLang/Lang';
class DesignCodeForm extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.loadForm = this.loadForm.bind(this);
    }
    async componentDidMount() {
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        let data = null;
        //if is from onENtry and Exit dynamicForm
        if (this.props.loadType == 1) {
            data = await new DesignCodeService().getDynamicFormCode(this.props.callBack, this.props.dynamicFormId, this.props.isOnExitForm, this.props.processId, this.props.applicationPageId);
        }
        else if (this.props.loadType == 2) {
            data = await new DesignCodeService().postIndex(this.props.callBack, this.props.dynamicFormId, this.props.designCode, this.props.codeType, this.props.processId, this.props.applicationPageId);
        }
        //call from processDesign and ServiceTask
        else if (this.props.loadType == 3) {
            data = await new DesignCodeService().getServiceTaskCode(this.props.elementId, this.props.processId);
        }

        await this.setState({ ...data });
        this.loadForm();
    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async loadForm() {
        this.setState({ ShowBusinessRuleDiagram: false })
        this.setState({ ShowBusinessRuleDiagram: true })
    }

    async submitForm() {
        if (window.bpmsFormIsValid()) {
            let xmlCode = `<ArrayOfObjects>${window.draw2dGetXml()}</ArrayOfObjects>`;
            let result = await new DesignCodeService().doRenderCode(xmlCode, this.props.processId, this.props.applicationPageId, false, true);
            let data = `﻿<?xml version="1.0" encoding="utf-16"?>
             <DesignCodeModel xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
               <Code><![CDATA[${result.Code}]]></Code>
               <DesignCode><![CDATA[<ArrayOfObjects>${window.draw2dGetXml()}</ArrayOfObjects>]]></DesignCode>
               <ID>${this.state.ID}</ID>
               <TimeStamp>${new Date().YYYYMMDDHHMMSS()}</TimeStamp>
               <Assemblies>${result.Assemblies}</Assemblies>
               <Diagram><![CDATA[${window.draw2dGetCanvasAsJsonString()}]]></Diagram>
             </DesignCodeModel>`;
            if (typeof this.props.callBack === "function") {
                let callResult = await this.props.callBack(data, window.getBusinessRuleName(data));
                if (callResult == null || callResult == true)
                    document.querySelector('#divAddEditCode #lnkDesignCodeCancel').click();
            }
            else {
                let callResult = await window[this.props.callBack](data, window.getBusinessRuleName(data));
                if (callResult == null || callResult == true)
                    document.querySelector('#divAddEditCode #lnkDesignCodeCancel').click();
            }

        }
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="divAddEditCode">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.DesignCodeForm.caption}</h5>
                        <div className="modal-button">
                            <button type="button" className="btn close window-maximize" data-dismiss="modal" aria-label="Close">
                                <i className="fad fa-expand-alt modal-square"></i>
                            </button>
                            <button type="button" className="btn close" data-dismiss="modal" aria-label="Close">
                                <i className="fa fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body modal-scroll">
                        {this.state.ShowBusinessRuleDiagram &&
                            <BusinessRuleDiagram {...this.state}  {...this.props}></BusinessRuleDiagram>
                        }
                    </div>
                    <div className="modal-footer">
                        <button id="lnkSaveJavaCode" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold">
                            {Lang.Shared.save}
                        </button>
                        <button type="button" id="lnkDesignCodeCancel" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">{Lang.Shared.cancel}</button>
                    </div>
                </div>
            </div >
        );
    }
}

export default DesignCodeForm;

