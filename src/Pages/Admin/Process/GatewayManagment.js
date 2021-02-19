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
        this.selectedTr = null;
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
        let list = this.state.GetList;
        list.push(
            {
                ID: '',
                GatewayID: this.state.GatewayID,
                SequenceFlowID: '',
                Code: ''
            });

        this.setState({ GetList: list }, function () {
            window.setListModelBinding('tblGatewayCondition', 'ListConditions');
        });
    }

    async removeRow(event) {
        let list = this.state.GetList;
        //because of header tr, rowIndex of tr start from 1.
        let index = event.target.closest("tr").rowIndex - 1;
        if (index > -1) {
            list.splice(index, 1);
        }

        this.setState({ GetList: list }, function () {
            window.setListModelBinding('tblGatewayCondition', 'ListConditions');
        });

    }

    async openDesignCode(event) {
        this.selectedTr = event.target.closest('tr');
        let designCode = this.selectedTr.querySelector("input[name*='.Code']").value;

        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenConditionForm: false, DesignCode: designCode, DesignCodeCallBack: 'conditionCodeCallBack' });
        await this.setState({ OpenConditionForm: true });
        window.openModal('divConditionDesignCode', true);
    }

    conditionCodeCallBack(codeDesign, code) {
        let list = this.state.GetList;
        let condition = list[this.selectedTr.rowIndex - 1];
        condition.Code = codeDesign;
        this.setState({ GetList: list }, function () {
            window.setListModelBinding('tblGatewayCondition', 'ListConditions');
        });
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
                                                return <tr key={(item.ID == '' ? Math.random() : item.ID)} className="text-center" >
                                                    <td>
                                                        <input name="ListItem.GatewayID" id="ListItem.GatewayID" type="hidden" defaultValue={item.GatewayID} />
                                                        <input name="ListItem.ID" id="ListItem.ID" type="hidden" defaultValue={item.ID} />
                                                        <Select name="ListItem.SequenceFlowID" defaultValue={item.SequenceFlowID || ''} id="ListItem.SequenceFlowID"
                                                            listItem={this.state.SequenceFlows} optionKey="ID" optionLabel="Name" />
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">
                                                                    <a id="btnOpenDesignCode" href="#" onClick={this.openDesignCode}>
                                                                        <i className="fa fa-plus"></i>
                                                                    </a>
                                                                </span>
                                                            </div>
                                                            <input type="text" className="form-control" defaultValue={window.getBusinessRuleName(item.Code)} name="Code" id="Code" readOnly={true} />
                                                        </div>
                                                        <input name="ListItem.Code" id="ListItem.Code" type="hidden" defaultValue={item.Code} />
                                                    </td>
                                                    <td>
                                                        <button type="button" className="delete-row btn btn-sm btn-clean btn-icon" onClick={this.removeRow} title={Lang.Shared.delete}>
                                                            <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary font-weight-bolder" onClick={this.addCondition}>
                            {Lang.GatewayManagment.new}
                        </button>
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

