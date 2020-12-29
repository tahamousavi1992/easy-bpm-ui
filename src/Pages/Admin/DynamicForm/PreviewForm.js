import React from 'react';
import DynamicFormService from '../../../Services/DynamicFormService';
import UtilityService from '../../../Services/UtilityService';
import { Link } from "react-router-dom"
import BpmsConfig from '../../../Shared/BpmsConfig'
import UserTaskContent from '../../FormModel/UserTaskContent'
export default class PreviewForm extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.updateForm = this.updateForm.bind(this);
        document.body.classList.add('aside-minimize');
         
    }
    async componentDidMount() {
        document.getElementById('sk_aside').remove();
        document.querySelector('.flex-row-fluid.wrapper').style.paddingLeft = '0px';
        document.getElementById('sk_subheader').style.left = '6px';
        document.getElementById('bpms_header').style.left = '6px';
         
        this.updateForm();
    } 
    async updateForm() {
        let data = await new DynamicFormService().getPreviewForm(this.props.match.params.formId);
        let pageTitle = data.Model != null ? data.Model.FormModel.FormName : "";
        this.props.setPageCaption(-1, [pageTitle], false);
        UtilityService.showMessageByList(data.MessageList);
        if (data.Result) {
            await this.setState({ Model: null });
            await this.setState({ ...data }); 
            if (document.getElementsByTagName('form').length > 0)
                document.getElementsByTagName('form')[0].onsubmit = function () {
                    return false;
                };
            //load validation
            window.initialFunctions();
            window.bpmsInitialValidation('');
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-xl-12" id="divBpmsParentContainer">
                    {
                        this.state.Model &&
                        <div className="card card-custom gutter-b">
                            <div className="card-header flex-wrap border-0 pt-6 pb-0">
                                <div className="card-title">
                                    <h3 className="card-label">
                                        {this.state.Model.FormModel.FormName}
                                    </h3>
                                </div>
                            </div>
                            <div className="card-body">
                                {
                                    this.state.Model != null &&
                                    <UserTaskContent updateForm={this.updateForm} {...this.state.Model}></UserTaskContent>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

