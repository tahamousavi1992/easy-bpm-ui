import React from 'react';
import SingleActionService from '../../Services/SingleActionService';
import UtilityService from '../../Services/UtilityService';
import UserTaskContent from '../FormModel/UserTaskContent'
import RequestDetail from './RequestDetail'
export default class GetIndex extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.updateForm = this.updateForm.bind(this);
    }
    async componentDidMount() {
        this.updateForm(null);
    }

    async updateForm(stepId, endAppPageID) {
        let data = await new SingleActionService().getIndex({
            stepID: stepId,
            threadId: this.props.match.params.threadId,
            applicationPageId: (this.state.Model != null ? this.state.Model.ApplicationID : this.props.match.params.applicationPageId),
            threadTaskID: (this.state.Model != null ? this.state.Model.ThreadTaskID : null),
            formId: endAppPageID,
        });
        let pageTitle = data.Model != null ? data.Model.FormModel.FormName : "";
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
                        this.state.ThreadDetailModel != null &&
                        <RequestDetail {...this.state.ThreadDetailModel} />
                    }
                    {
                        this.state.Model &&
                        <React.Fragment>
                            {
                                this.state.ShowCardBody &&
                                <div className="card card-custom gutter-b">
                                    <div className="card-header">
                                        <h3 className="card-title">
                                            {this.state.Model.FormModel.FormName}
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        {
                                            this.state.Model != null &&
                                            <UserTaskContent updateForm={this.updateForm} {...this.state.Model}></UserTaskContent>
                                        }
                                    </div>
                                </div>
                            }
                            {
                                !this.state.ShowCardBody &&
                                <UserTaskContent updateForm={this.updateForm} {...this.state.Model}></UserTaskContent>
                            }
                        </React.Fragment>
                    }
                </div>
            </div>
        );
    }
}
