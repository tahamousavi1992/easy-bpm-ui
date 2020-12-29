import React, { useState } from 'react';
import GatewayService from '../../../Services/GatewayService';
import UtilityService from '../../../Services/UtilityService';
import Select, { VariableControl } from '../../../Components/Select';
import ConditionForm from '../DesignCode/ConditionForm'
import Lang from '../../../Shared/AdminLang/Lang';
const $ = window.$;
class GatewayManagment extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.addCondition = this.addCondition.bind(this);
        this.loadForm = this.loadForm.bind(this);
        this.openDesignCode = this.openDesignCode.bind(this);
        this.conditionCodeCallBack = this.conditionCodeCallBack.bind(this);
    }
    async componentDidMount() {
        window.conditionCodeCallBack = this.conditionCodeCallBack;
        //load data 
        let data = await new GatewayService().getConditions(this.props.processId, this.props.elementId);
        await this.setState({ ...data });
        this.loadForm();
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    loadForm() {
        window.setListModelBinding('tblGatewayCondition', 'ListConditions');
    }

    addCondition() {
        let table = $('#tblGatewayCondition');
        let newRow = document.querySelector('.addCondition').cloneNode(true);
        newRow.classList.remove('addStep');
        newRow.style.removeProperty('display');
        table.append(newRow);
        newRow.querySelector('a.delete-row').onclick = this.removeRow;
        newRow.querySelector('a#btnOpenDesignCode').onclick = this.openDesignCode;

        window.setListModelBinding('tblGatewayCondition', 'ListConditions');
    }

    removeRow(event) {
        event.target.closest("tr").remove();
        window.setListModelBinding('tblGatewayCondition', 'ListConditions');
    }

    async openDesignCode(event) {
        await this.setState({ selectedTr: event.target.closest('tr') });
        let designCode = this.state.selectedTr.querySelector("input[name*='.Code']").value;
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenConditionForm: false, DesignCode: designCode, DesignCodeCallBack: 'conditionCodeCallBack' });
        await this.setState({ OpenConditionForm: true });
        window.openModal('divConditionDesignCode', true);
    }

    conditionCodeCallBack(codeDesign, code) {
        this.state.selectedTr.querySelector("input[name='Code']").value = window.getBusinessRuleName(codeDesign);
        this.state.selectedTr.querySelector("input[name*='.Code']").value = codeDesign;
    }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let result = await new GatewayService().postAddEdit(UtilityService.getFormData('divAddEditCondition', {
                ProcessID: this.props.processId,
                GatewayID: this.state.GatewayID,
            }));
            UtilityService.showMessage(result.ResultType, result.Message);
            if (result.ResultType == 'success') {
                document.getElementById('lnkGatewayCancel').click();
            }
        }
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="divAddEditCondition">

                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.GatewayManagment.caption}</h5>
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
                        <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                            <div className="table-information table-responsive">
                                <table style={{ display: 'none' }}>
                                    <tbody>
                                        <tr className="addCondition">
                                            <td>
                                                <input name="ListItem.GatewayID" id="ListItem.GatewayID" type="hidden" defaultValue={this.state.GatewayID} />
                                                <input name="ListItem.ID" id="ListItem.ID" type="hidden" defaultValue={""} />
                                                <Select name="ListItem.SequenceFlowID" defaultValue="" id="ListItem.SequenceFlowID"
                                                    listItem={this.state.SequenceFlows} optionKey="ID" optionLabel="Name" />
                                            </td>
                                            <td>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <a id="btnOpenDesignCode" href="javascript:;">
                                                                <i className="fa fa-plus"></i>
                                                            </a>
                                                        </span>
                                                    </div>
                                                    <input type="text" className="form-control" name="Code" id="Code" readOnly={true} defaultValue="" />
                                                </div>
                                                <input name="ListItem.Code" id="ListItem.Code" type="hidden" defaultValue={""} />
                                            </td>
                                            <td>
                                                <a href='javascript:;' className="delete-row btn btn btn-sm btn-clean btn-icon" title="Delete">
                                                    <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table id="tblGatewayCondition" className="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                {Lang.GatewayManagment.sequenceFlow}
                                            </th>
                                            <th>
                                                {Lang.GatewayManagment.rule}
                                            </th>
                                            <th>{Lang.GatewayManagment.delete}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.GetList &&
                                            this.state.GetList.map((item, index) => {
                                                return <tr key={item.ID} className="text-center" >
                                                    <td>
                                                        <input name="ListItem.GatewayID" id="ListItem.GatewayID" type="hidden" defaultValue={item.TaskID} />
                                                        <input name="ListItem.ID" id="ListItem.ID" type="hidden" defaultValue={item.ID} />
                                                        <Select name="ListItem.SequenceFlowID" defaultValue={item.SequenceFlowID || ''} id="ListItem.SequenceFlowID"
                                                            listItem={this.state.SequenceFlows} optionKey="ID" optionLabel="Name" />
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">
                                                                    <a id="btnOpenDesignCode" href="javascript:;" onClick={this.openDesignCode}>
                                                                        <i className="fa fa-plus"></i>
                                                                    </a>
                                                                </span>
                                                            </div>
                                                            <input type="text" className="form-control" defaultValue={window.getBusinessRuleName(item.Code)} name="Code" id="Code" readOnly={true} />
                                                        </div>
                                                        <input name="ListItem.Code" id="ListItem.Code" type="hidden" defaultValue={item.Code} />
                                                    </td>
                                                    <td>
                                                        <a href='javascript:;' className="delete-row btn btn-sm btn-clean btn-icon" onClick={this.removeRow} title={Lang.Shared.delete}>
                                                            <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <a href="javascript:;" className="btn btn-primary font-weight-bolder" onClick={this.addCondition}>
                            {Lang.GatewayManagment.new}
                        </a>
                    </div>
                    <div className="modal-footer">
                        {
                            this.state.AllowEdit &&
                            <button id="btnSave" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold" data-val-group="saveTask">
                                {Lang.Shared.save}
                            </button>
                        }
                        <button type="button" className="btn btn-light-primary font-weight-bold" id="lnkGatewayCancel" data-dismiss="modal">{Lang.Shared.cancel}</button>
                    </div>
                </div>

                <div id="divConditionDesignCode" className="modal fade" role="dialog">
                    {this.state.OpenConditionForm && <ConditionForm callBack={this.state.DesignCodeCallBack}
                        designCode={this.state.DesignCode} openDirectly={true}
                        processId={this.props.processId}></ConditionForm>}

                </div>
            </div>
        );
    }
}

export default GatewayManagment;

