import React, { useState } from 'react';
import DesignCodeService from '../../../Services/DesignCodeService';
import UtilityService from '../../../Services/UtilityService';
import Select, { InnerVariableControl } from '../../../Components/Select';
import Lang from '../../../Shared/AdminLang/Lang';

class EmailForm extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.validateSetControl = this.validateSetControl.bind(this);
    }

    async componentDidMount() {
        let data = await new DesignCodeService().postLoadEmailForm(this.props);
        await this.setState({ ...data });
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        //add submit function to actionList.js save event
        this.props.setSaveFunction(this.submitForm);
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    //it is called with ActionList.js submit function
    //name parameter is name field of ActionList.js form.
    submitForm(name, funcName) {
        if (window.bpmsFormIsValid()) {

            let emailAccountID = document.querySelector('#divAddEditEmailModal #ddlEmailAccountID').value;
            let code = `<DCEmailModel>
<ID>${this.state.Model.ID}</ID> 
<ParentShapeID>${this.state.Model.ParentShapeID}</ParentShapeID>
<IsFirst>${this.state.Model.IsFirst}</IsFirst>
<ShapeID>${this.state.Model.ShapeID}</ShapeID> 
<Name>${name}</Name>
<EmailAccountID>${emailAccountID != null ? emailAccountID : ''}</EmailAccountID>
<EmailTo>${document.querySelector('#divAddEditEmailModal #EmailTo').value}</EmailTo>
<EmailSubject>${encodeURIComponent(document.querySelector('#divAddEditEmailModal #EmailSubject').value)}</EmailSubject>
<EmailBody>${encodeURIComponent(document.querySelector('#divAddEditEmailModal #EmailBody').value)}</EmailBody>
<FuncName>${funcName}</FuncName>
<IsOutputYes>${this.state.Model.IsOutputYes}</IsOutputYes>
<ActionType>${this.state.Model.ActionType}</ActionType>
</DCEmailModel>`;

            if (!this.validateSetControl()) {
                return false;
            }
            return code;
        }
    }

    validateSetControl() {
        let result = true;
        if (document.querySelector('#divAddEditEmailModal #ddlEmailAccountID').value == '') {
            UtilityService.showMessage('error', Lang.requiredMsg(Lang.EmailForm.from));
            result = false;
        }
        if (document.querySelector('#divAddEditEmailModal #EmailTo').value == '') {
            UtilityService.showMessage('error', Lang.requiredMsg(Lang.EmailForm.to));
            result = false;
        }
        if (document.querySelector('#divAddEditEmailModal #EmailSubject').value == '') {
            UtilityService.showMessage('error', Lang.requiredMsg(Lang.EmailForm.subject));
            result = false;
        }
        if (document.querySelector('#divAddEditEmailModal #EmailBody').value == '') {
            UtilityService.showMessage('error', Lang.requiredMsg(Lang.EmailForm.body));
            result = false;
        }
        return result;
    }
 
    render() {
        return (
            <div className="form" id="divAddEditEmailModal">
                {
                    this.state.Model &&
                    <React.Fragment>
                        <div className="form-group row">
                            <div className="col-lg-6">
                                <label>{Lang.EmailForm.from}</label>
                                <div className="input-group">
                                    <Select isRequired={true} validationGroup="saveActionList" requiredMsg={Lang.requiredMsg(Lang.EmailForm.from)} name="ddlEmailAccountID" id="ddlEmailAccountID" defaultValue={this.state.Model.EmailAccountID || ''}
                                        listItem={this.state.ListEmailAccounts} optionKey="Key" optionLabel="Value" />
                                </div>
                                <span htmlFor="ddlEmailAccountID" className="help-block error"></span>
                            </div>
                            <div className="col-lg-6">
                                <label>{Lang.EmailForm.to}</label>
                                <InnerVariableControl name="EmailTo" isRequired={false} value={this.state.Model.EmailTo || ''} onChange={this.insertAtEmailTo} rows="2" />
                            </div>
                        </div> 
                        <div className="form-group row">
                            <div className="col-lg-12">
                                <label>{Lang.EmailForm.subject}</label>
                                <InnerVariableControl name="EmailSubject" isRequired={false} value={this.state.Model.EmailSubject || ''} onChange={this.insertAtEmailTo} rows="2" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-lg-12">
                                <label>{Lang.EmailForm.body}</label>
                                <InnerVariableControl name="EmailBody" isRequired={false} value={this.state.Model.EmailBody || ''} onChange={this.insertAtEmailTo} rows="5" />
                            </div>
                        </div>
                    </React.Fragment>
                }
            </div >
        );
    }
}

export default EmailForm;

