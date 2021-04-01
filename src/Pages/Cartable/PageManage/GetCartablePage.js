import React from 'react';
import CartablePageService from '../../../Services/CartablePageService';
import UtilityService from '../../../Services/UtilityService';
import { Link } from "react-router-dom"
import BpmsConfig from '../../../Shared/BpmsConfig'
import UserTaskContent from '../../FormModel/UserTaskContent'
class GetCartablePage extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.updateForm = this.updateForm.bind(this);
    }
    async componentDidMount() {
        this.updateForm();
    }
    async componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.applicationPageId !== this.props.match.params.applicationPageId) {
            this.updateForm(nextProps.match.params.applicationPageId);
        }
    }

    //applicationPageId is only for nextProps.match.params.applicationPageId
    async updateForm(applicationPageId) {
        applicationPageId = (applicationPageId != null ? applicationPageId : this.props.match.params.applicationPageId);
        let data = await new CartablePageService().getIndex(applicationPageId);
        let pageTitle = data.Model != null ? data.Model.FormModel.FormName : "";
        this.props.setPageCaption(applicationPageId, [pageTitle], false);
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

export default GetCartablePage;