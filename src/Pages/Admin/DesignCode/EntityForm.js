import React, { useState } from 'react';
import DesignCodeService from '../../../Services/DesignCodeService';
import UtilityService from '../../../Services/UtilityService';
import Select, { VariableControl } from '../../../Components/Select';
import SelectTypeControl from './SelectTypeControl';
import SelectTypeValue from './SelectTypeValue';
import Lang from '../../../Shared/AdminLang/Lang';

class EntityForm extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.validateSetControl = this.validateSetControl.bind(this);
        this.clearEntityModelTabel = this.clearEntityModelTabel.bind(this);
        this.fillTabelEntiutyParameter = this.fillTabelEntiutyParameter.bind(this);
        this.addEntityParameters = this.addEntityParameters.bind(this);
    }

    async componentDidMount() {
        let data = await new DesignCodeService().postLoadEntityForm(this.props);
        await this.setState({ ...data });
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        //add submit function to actionList.js save event
        this.props.setSaveFunction(this.submitForm);
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    //refresh and clear parameter table
    clearEntityModelTabel() {
        document.querySelector('#divAddEditEntityModal #tblEntityParametersModel').tBodies[0].innerHTML = '';
    }

    async fillTabelEntiutyParameter() {
        let varEntityId = document.querySelector('#divAddEditEntityModal #ddlEntities').value;
        this.clearEntityModelTabel();

        if (varEntityId != '' && this.state.Model.MethodType != '') {
            switch (this.state.Model.MethodType) {
                case 3://Delete
                    this.addEntityParameters({ parameterName: "ID", required: true });
                    break;
                case 1://Create
                case 2://Update

                    let listItem = await new DesignCodeService().getEntityProperties(varEntityId);
                    for (let i = 0; i < listItem.length; i++) {
                        this.addEntityParameters({ parameterName: listItem[i].Name, required: listItem[i].Required });
                    }
                    break;
            }
        }
    }

    addEntityParameters({ parameterName = '', required = false }) {
        let _trParameter = document.querySelector('#divAddEditEntityModal #tblCloneEntityParameterModel').tBodies[0].querySelector('tr').cloneNode(true);
        //set value of controls.
        _trParameter.querySelector('#txtParameterName').value = parameterName;
        _trParameter.cells[1].innerHTML = required ? "Yes" : "No";
        //if parameter is optional,the value is set to null as default value.
        if (!required) {
            _trParameter.querySelector('#txtSelectedValueType').value = 'null';
            _trParameter.querySelector('#txtSelectedValueType').setAttribute('data-value', 'null')
        }
        document.querySelector('#divAddEditEntityModal #tblEntityParametersModel').tBodies[0].appendChild(_trParameter);
    }

    //it is called with ActionList.js submit function
    //name parameter is name field of ActionList.js form.
    submitForm(name, funcName) {
        if (window.bpmsFormIsValid()) {
            let containerDiv = document.getElementById('divAddEditEntityModal');
            let rows = '';
            document.querySelector('#divAddEditEntityModal #tblEntityParametersModel').tBodies[0].querySelectorAll('tr').forEach(function (item) {
                let parameterName = item.querySelector('#txtParameterName').value;
                let valueType = item.querySelector('#txtSelectedValueType').getAttribute('data-type');
                let value = item.querySelector('#txtSelectedValueType').getAttribute('data-value');
                rows +=
                    `<DCEntityParametersModel>
<ParameterName>${parameterName}</ParameterName>
<ValueType>${valueType}</ValueType>
<Value>${value}</Value>
</DCEntityParametersModel>`;
            });
            let code = `<DCEntityModel>
<ID>${this.state.Model.ID}</ID> 
<ParentShapeID>${this.state.Model.ParentShapeID}</ParentShapeID>
<IsFirst>${this.state.Model.IsFirst}</IsFirst>
<ShapeID>${this.state.Model.ShapeID}</ShapeID> 
<Name>${name}</Name>
<FuncName>${funcName}</FuncName>
<IsOutputYes>${this.state.Model.IsOutputYes}</IsOutputYes>
<ActionType>${this.state.Model.ActionType}</ActionType>
<MethodType>${this.state.Model.MethodType}</MethodType>
<EntityDefID>${containerDiv.querySelector('#ddlEntities').value}</EntityDefID>
<Rows>${rows}</Rows>
</DCEntityModel>`;

            if (!this.validateSetControl()) {
                return false;
            }
            return code;
        }
    }

    validateSetControl() {
        let result = true;
        document.querySelector('#divAddEditEntityModal #tblEntityParametersModel').tBodies[0].querySelectorAll('tr').forEach(function (item, index) {
            if (item.querySelector('#txtSelectedValueType').getAttribute('data-type') == '') {
                UtilityService.showMessage('error', `Selecting the value in line ${index + 1} is required..`);
                result = false;
            }
        });
        return result;
    }

    render() {
        return (
            <div className="form" id="divAddEditEntityModal">
                {
                    this.state.Model &&
                    <React.Fragment>
                        <div className="form-group row">
                            <div className="col-lg-6">
                                <label>{Lang.EntityForm.entity}</label>
                                <div className="input-group">
                                    <Select name="ddlEntities" id="ddlEntities" defaultValue={this.state.Model.EntityDefID || ''} handelChange={this.fillTabelEntiutyParameter}
                                        listItem={this.state.ListEntities} optionKey="ID" optionLabel="DisplayName" />
                                </div>
                                <span htmlFor="ddlEntities" className="help-block error"></span>
                            </div>
                        </div>
                        <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                            <div className="table-information table-responsive">
                                <table id="tblCloneEntityParameterModel" style={{ display: "none" }}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input id="txtParameterName" readOnly={true} defaultValue="" type="text" className="form-control text-left" />
                                            </td>
                                            <td>
                                            </td>
                                            <td>
                                                <SelectTypeControl ContainerID="divE_SelectTypeValue" Value={""} ValueType={2}
                                                    ParentShapeID={this.state.Model.ParentShapeID} ShapeID={this.state.Model.ShapeID}
                                                    IsOutputYes={this.state.Model.IsOutputYes} DynamicFormId={this.state.DynamicFormId} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table id="tblEntityParametersModel" className="table">
                                    <thead>
                                        <tr>
                                            <th>{Lang.EntityForm.tbl_th_Parameter}</th>
                                            <th>{Lang.EntityForm.tbl_th_Required}</th>
                                            <th>{Lang.EntityForm.tbl_th_Value}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.Model.Rows &&
                                            this.state.Model.Rows.map((item, index) => {
                                                return <tr key={index} className="text-center" >

                                                    <td>
                                                        <input id="txtParameterName" readOnly={true} defaultValue={item.ParameterName} type="text" class="form-control text-left" />
                                                    </td>
                                                    <td>
                                                        {item.IsRequired ? "Yes" : "No"}
                                                    </td>
                                                    <td>
                                                        <SelectTypeControl ContainerID="divE_SelectTypeValue" Value={item.Value} ValueType={item.ValueType}
                                                            ParentShapeID={this.state.Model.ParentShapeID} ShapeID={this.state.Model.ShapeID}
                                                            IsOutputYes={this.state.Model.IsOutputYes} DynamicFormId={this.state.DynamicFormId} />
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </React.Fragment>
                }
                <div id="divE_SelectTypeValue" className="modal fade" role="dialog">
                    <SelectTypeValue processId={this.props.ProcessId} applicationPageId={this.props.ApplicationPageId} containerID="divE_SelectTypeValue" ProcessControls={this.state.ProcessControls} />
                </div>
            </div >
        );
    }
}

export default EntityForm;

