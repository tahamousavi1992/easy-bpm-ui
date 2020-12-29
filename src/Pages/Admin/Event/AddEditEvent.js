import React, { useState } from 'react';
import EventService from '../../../Services/EventService';
import UtilityService from '../../../Services/UtilityService';
import Select, { VariableControl } from '../../../Components/Select';
import SubTypeThrowMessage from './SubTypeThrowMessage'
import SubTypeCatchMessage from './SubTypeCatchMessage'
import SubTypeTimer from './SubTypeTimer'
import Lang from '../../../Shared/AdminLang/Lang';
const $ = window.$;
class AddEditEvent extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.setSaveMethod = this.setSaveMethod.bind(this);

    }
    async componentDidMount() {
        //load data 
        let data = await new EventService().getIndex(this.props.processId, this.props.elementId);
        await this.setState({ ...data });
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');

    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    setSaveMethod(method) {
        window.eventSaveMethod = method;
    }

    async submitForm(event) {
        window.eventSaveMethod(event);
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="divAddEditEvent">
                {
                    this.state.Model &&
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{Lang.AddEditEvent.caption}</h5>
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
                            <div className="form">
                                {
                                    //WorkflowBoundaryEvent.BPMNBoundaryType.Message    
                                    //sysEvent.e_TypeLU.IntermediateThrow  
                                    this.state.Model.SubType == 1 && this.state.Model.TypeLU == 3 &&
                                    <SubTypeThrowMessage setSaveMethod={this.setSaveMethod} {...this.state} ></SubTypeThrowMessage>
                                }
                                {
                                    //WorkflowBoundaryEvent.BPMNBoundaryType.Message
                                    //sysEvent.e_TypeLU.boundary
                                    this.state.Model.SubType == 1 && this.state.Model.TypeLU == 4 &&
                                    <SubTypeCatchMessage setSaveMethod={this.setSaveMethod} {...this.state}></SubTypeCatchMessage>
                                }
                                {
                                    //WorkflowBoundaryEvent.BPMNBoundaryType.timer
                                    //sysEvent.e_TypeLU.IntermediateCatch 
                                    this.state.Model.SubType == 6 && this.state.Model.TypeLU == 5 &&
                                    <SubTypeTimer setSaveMethod={this.setSaveMethod} {...this.state}></SubTypeTimer>
                                }
                                {
                                    //WorkflowIntermediateCatchEvent.BPMNIntermediateCatchType.Message
                                    //sysEvent.e_TypeLU.IntermediateCatch
                                    this.state.Model.SubType == 1 && this.state.Model.TypeLU == 5 &&
                                    <SubTypeCatchMessage setSaveMethod={this.setSaveMethod} {...this.state}></SubTypeCatchMessage>
                                }
                                {
                                    //WorkflowIntermediateCatchEvent.BPMNIntermediateCatchType.Timer
                                    //sysEvent.e_TypeLU.IntermediateCatch
                                    this.state.Model.SubType == 5 && this.state.Model.TypeLU == 5 &&
                                    <SubTypeTimer setSaveMethod={this.setSaveMethod} {...this.state}></SubTypeTimer>
                                }
                                {
                                    //WorkflowStartEvent.BPMNStartEventType.Message
                                    //sysEvent.e_TypeLU.StartEvent
                                    //ViewBag.HideVariable = true;
                                    this.state.Model.SubType == 1 && this.state.Model.TypeLU == 1 &&
                                    <SubTypeCatchMessage setSaveMethod={this.setSaveMethod} hideVariable={true} {...this.state}></SubTypeCatchMessage>
                                }
                                {
                                    //WorkflowStartEvent.BPMNStartEventType.Timer
                                    //sysEvent.e_TypeLU.StartEvent
                                    this.state.Model.SubType == 2 && this.state.Model.TypeLU == 1 &&
                                    <SubTypeTimer setSaveMethod={this.setSaveMethod} {...this.state}></SubTypeTimer>
                                }
                                {
                                    //WorkflowEndEvent.BPMNEndEventType.Message
                                    //sysEvent.e_TypeLU.EndEvent
                                    this.state.Model.SubType == 1 && this.state.Model.TypeLU == 2 &&
                                    <SubTypeThrowMessage setSaveMethod={this.setSaveMethod} {...this.state} ></SubTypeThrowMessage>
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button id="btnSave" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold" data-val-group="saveTask">
                                {Lang.Shared.save}
                            </button>
                            <button type="button" className="btn btn-light-primary font-weight-bold" id="lnkEventCancel" data-dismiss="modal">{Lang.Shared.cancel}</button>
                        </div>
                    </div>
                }

            </div >
        );
    }
}

export default AddEditEvent;

