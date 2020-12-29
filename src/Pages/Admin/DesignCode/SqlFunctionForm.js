import React, { useState } from 'react';
import DesignCodeService from '../../../Services/DesignCodeService';
import UtilityService from '../../../Services/UtilityService';
import Select, { VariableControl } from '../../../Components/Select';
import SelectTypeControl from './SelectTypeControl';
import SelectTypeValue from './SelectTypeValue';
import Lang from '../../../Shared/AdminLang/Lang';

class SqlFunctionForm extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.validateSqlFunction = this.validateSqlFunction.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.addSqlFunctionParameterRow = this.addSqlFunctionParameterRow.bind(this);
    }

    async componentDidMount() {
        let data = await new DesignCodeService().postLoadSqlFunctionForm(this.props);
        await this.setState({ ...data });
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        //add submit function to actionList.js save event
        this.props.setSaveFunction(this.submitForm);
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async removeRow(event) {
        event.target.closest('tr').remove();
    }

    async addSqlFunctionParameterRow() {
        let cloneRow = document.getElementById('tblCloneRow').querySelector('tr').cloneNode(true);
        cloneRow.querySelector('#btnDelete').onclick = this.removeRow;
        document.getElementById('tblParameterModel').tBodies[0].appendChild(cloneRow);
    }

    //it is called with ActionList.js submit function
    //name parameter is name field of ActionList.js form.
    submitForm(name, funcName) {
        if (window.bpmsFormIsValid()) {
            let rows = '';
            document.getElementById('tblParameterModel').tBodies[0].querySelectorAll('tr').forEach(function (item) {
                let valueType = item.querySelector('#txtSelectedValueType').getAttribute('data-type');
                let value = item.querySelector('#txtSelectedValueType').getAttribute('data-value');
                rows +=
                    `<DCRowSqlParameterModel>
<ValueType>${valueType}</ValueType>
<Value>${value}</Value>
<Name>${item.querySelector('#txtName').value}</Name>
</DCRowSqlParameterModel>`;
            });
            let RetVariableName = document.querySelector('#divAddEditSqlFunctionModal #txtRetVariableName').value;
            let MethodType = document.querySelector('#divAddEditSqlFunctionModal #ddlMethodType').value;
            let code = `<DCSqlFunctionModel>
<ID>${this.state.Model.ID}</ID> 
<ParentShapeID>${this.state.Model.ParentShapeID}</ParentShapeID>
<IsFirst>${this.state.Model.IsFirst}</IsFirst>
<ShapeID>${this.state.Model.ShapeID}</ShapeID> 
<Name>${name}</Name>
<Query>${encodeURIComponent(document.querySelector('#divAddEditSqlFunctionModal #Query').value)}</Query>
<RetVariableName>${RetVariableName != null ? RetVariableName : ''}</RetVariableName>
<MethodType>${MethodType}</MethodType>
<FuncName>${funcName}</FuncName>
<IsOutputYes>${this.state.Model.IsOutputYes}</IsOutputYes>
<ActionType>${this.state.Model.ActionType}</ActionType>
<Rows>${rows}</Rows>
</DCSqlFunctionModel>`;

            if (!this.validateSqlFunction()) {
                return false;
            }
            return code;
        }
    }

    validateSqlFunction() {
        let result = true;
        if (document.querySelector('#divAddEditSqlFunctionModal #ddlMethodType').value == '') {
            UtilityService.showMessage('error', `Method Type is required.`);
            result = false;
        }

        document.getElementById('tblParameterModel').tBodies[0].querySelectorAll('tr').forEach(function (item, index) {
            if (item.querySelector('#txtSelectedValueType').getAttribute('data-type') == '') {
                UtilityService.showMessage('error', `Selecting the value in line ${index + 1} is required.`);
                result = false;
            }
            if (item.querySelector('#txtName').value.trim() == '') {
                UtilityService.showMessage('error', `Selecting name in line ${index + 1} is required.`);
                result = false;
            }
        });
        return result;
    }

    render() {
        return (
            <div className="form" id="divAddEditSqlFunctionModal">
                {
                    this.state.Model &&
                    <React.Fragment>
                        <div className="form-group row">
                            <div className="col-lg-6">
                                <label>{Lang.SqlFunctionForm.retVariableName}</label>
                                <VariableControl name="txtRetVariableName" value={this.state.Model.RetVariableName} />
                            </div>

                            <div className="col-lg-6">
                                <label>{Lang.SqlFunctionForm.methodType}</label>
                                <div className="input-group">
                                    <Select isRequired={true} validationGroup="saveActionList" requiredMsg={Lang.regexMsg(Lang.SqlFunctionForm.methodType)} name="ddlMethodType" id="ddlMethodType" defaultValue={this.state.Model.MethodType || ''}
                                        listItem={this.state.ListMethodTypes} optionKey="Key" optionLabel="Value" />
                                </div>
                                <span htmlFor="ddlMethodType" className="help-block error"></span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-lg-12">
                                <label>{Lang.SqlFunctionForm.query}</label>
                                <div className="input-group">
                                    <textarea rows="4" onChange={this.handelChange} defaultValue={this.state.Model.Query || ''} name='Query' id='Query' className="form-control required-field" data-val-required={Lang.regexMsg(Lang.SqlFunctionForm.query)} data-val="true" data-val-group="saveActionList" >

                                    </textarea>
                                </div>
                                <span htmlFor="Query" className="help-block error"></span>
                            </div>
                        </div>
                        <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                            <div className="table-information table-responsive">
                                <table id="tblCloneRow" style={{ display: "none" }}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input id="txtName" type="text" className="form-control" autoComplete="off" />
                                            </td>
                                            <td>
                                                <SelectTypeControl ContainerID="divSF_SelectTypeValue" Value={""} ValueType={2}
                                                    ParentShapeID={this.state.Model.ParentShapeID} ShapeID={this.state.Model.ShapeID}
                                                    IsOutputYes={this.state.Model.IsOutputYes} DynamicFormId={this.state.DynamicFormId} />
                                            </td>
                                            <td>
                                                <button id="btnDelete" type="button" className="btn btn-sm btn-clean btn-icon">
                                                    <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table id="tblParameterModel" className="table">
                                    <thead>
                                        <tr>
                                            <th>{Lang.SqlFunctionForm.tbl_th_Parameter}</th>
                                            <th>{Lang.SqlFunctionForm.tbl_th_Value}</th>
                                            <th>{Lang.SqlFunctionForm.tbl_th_Delete}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.Model.Rows &&
                                            this.state.Model.Rows.map((item, index) => {
                                                return <tr key={index} className="text-center" >

                                                    <td>
                                                        <input id="txtName" defaultValue={item.Name} type="text" className="form-control" autoComplete="off" />
                                                    </td>
                                                    <td>
                                                        <SelectTypeControl ContainerID="divSF_SelectTypeValue" Value={item.Value} ValueType={item.ValueType}
                                                            ParentShapeID={this.state.Model.ParentShapeID} ShapeID={this.state.Model.ShapeID}
                                                            IsOutputYes={this.state.Model.IsOutputYes} DynamicFormId={this.state.DynamicFormId} />
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
                        <button type="button" className="btn btn-primary font-weight-bolder" id="btnAddParameterRow" onClick={this.addSqlFunctionParameterRow}>
                            {Lang.SqlFunctionForm.addParameter}
                        </button>
                    </React.Fragment>
                }
                <div id="divSF_SelectTypeValue" className="modal fade" role="dialog">
                    <SelectTypeValue processId={this.props.ProcessId} applicationPageId={this.props.ApplicationPageId} containerID="divSF_SelectTypeValue" ProcessControls={this.state.ProcessControls} />
                </div>
            </div >
        );
    }
}

export default SqlFunctionForm;

