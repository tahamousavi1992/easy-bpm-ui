import React, { useState } from 'react';
import DesignCodeService from '../../../Services/DesignCodeService';
import UtilityService from '../../../Services/UtilityService';
import Select from '../../../Components/Select';
import SelectTypeControl from './SelectTypeControl';
import SelectTypeValue from './SelectTypeValue';
import Lang from '../../../Shared/AdminLang/Lang';

class ConditionForm extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.addConditionRow = this.addConditionRow.bind(this);
        this.getCode = this.getCode.bind(this);
        this.validateSetControl = this.validateSetControl.bind(this);
    }

    async componentDidMount() {
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        if (this.props.openDirectly) {
            //DesignCodeDTO.e_CodeType.ConditionCode
            let data = await new DesignCodeService().postIndex(this.props.callBack, this.props.dynamicFormId, this.props.designCode, 3, this.props.processId, this.props.applicationPageId);
            await this.setState({ ...data });
        } else {
            let data = await new DesignCodeService().postLoadConditionForm(this.props);
            await this.setState({ ...data });
        }
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async removeRow(event) {
        event.target.closest('tr').remove();
    }

    async addConditionRow() {
        let cloneRow = document.getElementById('tblCloneConditionRow').querySelector('tr').cloneNode(true);
        document.getElementById('tblDCConditionModel').tBodies[0].appendChild(cloneRow);
        cloneRow.querySelector('#btnDelete').onclick = this.removeRow;
    }

    validateSetControl() {
        let result = true;
        document.getElementById('tblDCConditionModel').tBodies[0].querySelectorAll('tr').forEach(function (item, index) {
            if (item.querySelector('#firstValue #txtSelectedValueType').getAttribute('data-type') == '') {
                UtilityService.showMessage('error', `Selecting the value in line ${index + 1} is required.`);
                result = false;
            }
            if (item.querySelector('#secondValue #txtSelectedValueType').getAttribute('data-type') == '') {
                UtilityService.showMessage('error', `Selecting the value in line ${index + 1} is required.`);
                result = false;
            }
        });
        return result;
    }

    getCode() {
        let rows = '';
        document.getElementById('tblDCConditionModel').tBodies[0].querySelectorAll('tr').forEach(function (item) {
            let firstConditionType = item.querySelector('#firstValue #txtSelectedValueType').getAttribute('data-type');
            let firstConditionValue = item.querySelector('#firstValue #txtSelectedValueType').getAttribute('data-value');

            let secondConditionType = item.querySelector('#secondValue #txtSelectedValueType').getAttribute('data-type');
            let secondConditionValue = item.querySelector('#secondValue #txtSelectedValueType').getAttribute('data-value');

            let operationType = item.querySelector('#ddlOperationType').value;
            rows +=
                `<DCRowConditionModel>
<FirstConditionType>${firstConditionType}</FirstConditionType>
<FirstConditionValue>${firstConditionValue}</FirstConditionValue>
<SecondConditionType>${secondConditionType}</SecondConditionType>
<SecondConditionValue>${secondConditionValue}</SecondConditionValue>
<OperationType>${operationType}</OperationType>
</DCRowConditionModel>`;
        });

        let code = `<DCConditionModel>
<ID>${this.state.Model.ID}</ID>
<ParentShapeID>${this.state.Model.ParentShapeID}</ParentShapeID>
<IsFirst>${this.state.Model.IsFirst}</IsFirst>
<ShapeID>${this.state.Model.ShapeID}</ShapeID>
<Name>${document.querySelector('#divAddEditConditionModal #Name').value}</Name>
<FuncName>${this.state.Model.FuncName}</FuncName>
<IsOutputYes>${this.state.Model.IsOutputYes}</IsOutputYes>
<ActionType>${this.state.Model.ActionType}</ActionType>
<EvaluateType>${document.querySelector('#divAddEditConditionModal #EvaluateType').value}</EvaluateType>
<Rows>${rows}</Rows>
</DCConditionModel>`;
        return code;
    }

    async submitForm() {

        if (window.bpmsFormIsValid()) {
            let code = this.getCode();

            if (this.state.OpenDirectly) {
                let xmlCode = `<ArrayOfObjects>${this.getCode()}</ArrayOfObjects>`;
                let result = await new DesignCodeService().doRenderCode(xmlCode, this.props.processId, this.props.applicationPageId, true, false);
                let data = `<?xml version="1.0" encoding="utf-16"?>
             <DesignCodeModel xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
               <Code><![CDATA[${result.Code}]]></Code>
               <DesignCode><![CDATA[<ArrayOfObjects>${this.getCode()}</ArrayOfObjects>]]></DesignCode>
               <ID>${this.state.DesignCodeDTO.ID}</ID>
               <TimeStamp>${new Date().YYYYMMDDHHMMSS()}</TimeStamp>
               <Assemblies>${result.assemblies}</Assemblies>
               <Diagram><![CDATA[]]></Diagram>
             </DesignCodeModel>`;
                window[this.props.callBack](data, window.getBusinessRuleName(data));
                document.querySelector('#divAddEditConditionModal #lnkConditionCancel').click();

            }
            else {

                window.draw2UpdateDiagramData([code], document.getElementById('Name').value, this.state.Model.ShapeID);
                window.closeModal('divAddEditBusinessRule');
            }
        }
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="divAddEditConditionModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.ConditionForm.caption}</h5>
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
                        {
                            this.state.Model &&
                            <div className="form">
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <label>{Lang.ConditionForm.name}</label>
                                        <div className="input-group">
                                            <input onChange={this.handelChange} defaultValue={this.state.Model.Name || ''} name='Name' id='Name' className="form-control required-field" data-val-required="Name is required" data-val="true" data-val-group="saveCondition" autoComplete="off" />
                                        </div>
                                        <span htmlFor="Name" className="help-block error"></span>
                                    </div>
                                    <div className="col-lg-6">
                                        <label>{Lang.ConditionForm.type}</label>
                                        <div className="input-group">
                                            <select onChange={this.handelChange} defaultValue={this.state.Model.EvaluateType || ''} name='EvaluateType' id='EvaluateType' className="form-control required-field" data-val-required="Type is required" data-val="true" data-val-group="saveCondition">
                                                <option value="1">And</option>
                                                <option value="2">Or</option>
                                            </select>
                                        </div>
                                        <span htmlFor="EvaluateType" className="help-block error"></span>
                                    </div>
                                </div> 
                                <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                                    <div className="table-information table-responsive">
                                        <table id="tblCloneConditionRow" style={{ display: "none" }}>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div id="firstValue">
                                                            <SelectTypeControl ContainerID="divC_SelectTypeValue" Value="" ValueType="2" ParentShapeID={this.state.Model.ParentShapeID}
                                                                ShapeID={this.state.Model.ShapeID} IsOutputYes={this.state.Model.IsOutputYes}
                                                                DynamicFormId={this.state.Model.DynamicFormId} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Select name="ddlOperationType" id="ddlOperationType" defaultValue="" handelChange={this.handelChange}
                                                            listItem={this.state.ListOperationTypes} optionKey="Key" optionLabel="Value" />
                                                    </td>
                                                    <td>
                                                        <div id="secondValue">
                                                            <SelectTypeControl ContainerID="divC_SelectTypeValue" Value="" ValueType="2" ParentShapeID={this.state.Model.ParentShapeID}
                                                                ShapeID={this.state.Model.ShapeID} IsOutputYes={this.state.Model.IsOutputYes}
                                                                DynamicFormId={this.state.Model.DynamicFormId} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button id="btnDelete" type="button" className="btn btn-sm btn-clean btn-icon">
                                                            <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <table id="tblDCConditionModel" className="table">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "32%" }}>{Lang.ConditionForm.tbl_th_FirstConditionValue}</th>
                                                    <th style={{ width: "17%" }} >{Lang.ConditionForm.tbl_th_OperationType}</th>
                                                    <th style={{ width: "32%" }} >{Lang.ConditionForm.tbl_th_SecondConditionValue}</th>
                                                    <th style={{ width: "5%" }} >{Lang.ConditionForm.tbl_th_Delete}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.Model.Rows &&
                                                    this.state.Model.Rows.map((item, index) => {
                                                        return <tr key={index} className="text-center" >
                                                            <td>
                                                                <div id="firstValue">
                                                                    <SelectTypeControl ContainerID="divC_SelectTypeValue" Value={item.FirstConditionValue} ValueType={item.FirstConditionType}
                                                                        ParentShapeID={this.state.Model.ParentShapeID} ContainerID="divC_SelectTypeValue" ShapeID={this.state.Model.ShapeID}
                                                                        IsOutputYes={this.state.Model.IsOutputYes} DynamicFormId={this.state.Model.DynamicFormId} />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Select name="ddlOperationType" id="ddlOperationType" defaultValue={item.OperationType} handelChange={this.handelChange}
                                                                    listItem={this.state.ListOperationTypes} optionKey="Key" optionLabel="Value" />
                                                            </td>
                                                            <td>
                                                                <div id="secondValue">
                                                                    <SelectTypeControl ContainerID="divC_SelectTypeValue" Value={item.SecondConditionValue} ValueType={item.SecondConditionType}
                                                                        ParentShapeID={this.state.Model.ParentShapeID} ContainerID="divC_SelectTypeValue" ShapeID={this.state.Model.ShapeID}
                                                                        IsOutputYes={this.state.Model.IsOutputYes} DynamicFormId={this.state.Model.DynamicFormId} />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <button id="btnDelete" onClick={this.removeRow} type="button" className="btn btn-sm btn-clean btn-icon">
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
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <button id="btnAddConditionRow" onClick={this.addConditionRow} type="button" className="btn btn-danger">
                                            {Lang.ConditionForm.add}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="modal-footer">
                        <button id="btnSaveInfo" onClick={this.submitForm} data-val-group="saveCondition"
                            type="button" className="btn btn-primary font-weight-bold">
                            {Lang.Shared.apply}
                        </button>
                        <button type="button" className="btn btn-light-primary font-weight-bold" id="lnkConditionCancel" data-dismiss="modal" >
                            {Lang.Shared.cancel}
                        </button>
                    </div>
                </div>
                <div id="divC_SelectTypeValue" className="modal fade" role="dialog">
                    <SelectTypeValue processId={this.props.processId} applicationPageId={this.props.applicationPageId} containerID="divC_SelectTypeValue" ProcessControls={this.state.ProcessControls} />
                </div>
            </div >
        );
    }
}

export default ConditionForm;

