import React, { useState } from 'react';
import DesignCodeService from '../../../Services/DesignCodeService';
import UtilityService from '../../../Services/UtilityService';
import Select, { VariableControl } from '../../../Components/Select';
import SelectTypeControl from './SelectTypeControl';
import SelectTypeValue from './SelectTypeValue';
import Lang from '../../../Shared/AdminLang/Lang';

class SetVariableForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.validateSetVaraible = this.validateSetVaraible.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.addVariableRow = this.addVariableRow.bind(this);
    }

    async componentDidMount() {
        let data = await new DesignCodeService().postLoadSetVariableForm(this.props);
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

    async addVariableRow() {
        let cloneRow = document.getElementById('tblCloneSetVariableRow').querySelector('tr').cloneNode(true);
        document.getElementById('tblSetVariable').tBodies[0].appendChild(cloneRow);
        cloneRow.querySelector('#btnDelete').onclick = this.removeRow;
    }

    //it is called with ActionList.js submit function
    //name parameter is name field of ActionList.js form.
    submitForm(name, funcName) {
        if (window.bpmsFormIsValid()) {
            let containerDiv = document.getElementById('divAddEditSetVariableModal');
            let rows = '';
            containerDiv.querySelector('#tblSetVariable').tBodies[0].querySelectorAll('tr').forEach(function (item) {
                let variableName = item.querySelector('#txtVariableName').value;
                let value = item.querySelector('#txtSelectedValueType').getAttribute('data-value');
                let valueType = item.querySelector('#txtSelectedValueType').getAttribute('data-type');

                rows +=
                    `<DCRowSetVariableModel>
<VaribleName>${variableName}</VaribleName>
<ValueType>${valueType}</ValueType>
<Value>${value}</Value>
</DCRowSetVariableModel>`;
            });

            let code = `<DCSetVariableModel>
<ID>${this.state.Model.ID}</ID>
<ParentShapeID>${this.state.Model.ParentShapeID}</ParentShapeID>
<IsFirst>${this.state.Model.IsFirst}</IsFirst>
<ShapeID>${this.state.Model.ShapeID}</ShapeID>
<Name>${name}</Name>
<FuncName>${funcName}</FuncName>
<IsOutputYes>${this.state.Model.IsOutputYes}</IsOutputYes>
<ActionType>${this.state.Model.ActionType}</ActionType>
<Rows>${rows}</Rows>
</DCSetVariableModel>`;
            if (!this.validateSetVaraible()) {
                return false;
            }
            return code;
        }
    }

    validateSetVaraible() {
        let result = true;
        document.getElementById('tblSetVariable').tBodies[0].querySelectorAll('tr').forEach(function (item) {
            if (item.querySelector('#txtVariableName').value == '') {
                UtilityService.showMessage('error', `Variable is required.`);
                result = false;
            }

            if (item.querySelector('#txtSelectedValueType').getAttribute('data-type') == '') {
                UtilityService.showMessage('error', `Value is required.`);
                result = false;
            }
        });
        return result;
    }

    render() {
        return (
            <div className="form" id="divAddEditSetVariableModal">
                {
                    this.state.Model &&
                    <React.Fragment>
                        <div className="bpms-table bpms-table-bordered  bpms-table-default">
                            <div className="table-information table-responsive">
                                <table id="tblCloneSetVariableRow" style={{ display: "none" }}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <VariableControl name="txtVariableName" isRequired={true} value="" />
                                            </td>
                                            <td>
                                                <SelectTypeControl ContainerID="divSV_SelectTypeValue" Value='' ValueType='2'
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
                                <table id="tblSetVariable" className="table">
                                    <thead>
                                        <tr>
                                            <th>{Lang.SetVariableForm.variable}</th>
                                            <th>{Lang.SetVariableForm.value}</th>
                                            <th style={{ width: "5%" }} >{Lang.SetVariableForm.delete}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.Model.Rows &&
                                            this.state.Model.Rows.map((item, index) => {
                                                return <tr key={index} className="text-center" >
                                                    <td>
                                                        <VariableControl name="txtVariableName" isRequired={true} value={item.VaribleName} />
                                                    </td>
                                                    <td>
                                                        <SelectTypeControl ContainerID="divSV_SelectTypeValue" Value={item.Value} ValueType={item.ValueType}
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
                        <div className="form-group row">
                            <div className="col-lg-6">
                                <button id="btnAddSetVariableRow" onClick={this.addVariableRow} type="button" className="btn btn-danger">
                                    {Lang.SetVariableForm.add}
                                </button>
                            </div>
                        </div>
                    </React.Fragment>
                }
                <div id="divSV_SelectTypeValue" className="modal fade" role="dialog">
                    <SelectTypeValue processId={this.props.ProcessId} applicationPageId={this.props.ApplicationPageId} containerID="divSV_SelectTypeValue" ProcessControls={this.state.ProcessControls} />
                </div>
            </div>
        );
    }
}

export default SetVariableForm;

