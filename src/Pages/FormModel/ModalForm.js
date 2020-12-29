import React from 'react';
import UtilityService from '../../Services/UtilityService';
import UserTaskContent from './UserTaskContent'

class ModalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    async componentDidMount() {
        let result = await new UtilityService().getData(this.props.openPopUpUrl, {});
        this.setState({ ...result });
        let modalId = 'divModel' + this.props.formId;
        UtilityService.showMessageByList(result.MessageList);
        if (result.Result) {
            //if the modal is in another modal ,it will move it to body
            window.openModal(modalId, true);

            if (this.props.height != null)
                document.getElementById(modalId).querySelector('.modal-body').style.height = `${this.props.height}px`;
            if (this.props.width != null)
                document.getElementById(modalId).querySelector('.modal-body').style.width = `${this.props.width}px`;
            //after saving run callback
            window[this.props.formId + 'callBackModal'] = this.props.callBackFunc;

            //load validation
            window.initialFunctions();
            window.bpmsInitialValidation('');
            window.FormControl.initBpmsEngine();

            document.querySelectorAll('[data-isFooter="true"]').forEach(function (item) {
                item.closest('.modal-dialog').querySelector('.modal-footer').appendChild(item);
            })
        }
    }

    render() {
        return (
            <div>
                <div id={(this.state.Model != null ? ("divModel" + this.state.Model.FormModel.DynamicFormID) : "")} data-callback="" className="modal fade " role="dialog" aria-labelledby="exampleModalSizeLg" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{((this.state.Model != null && this.state.Model.FormModel != null) ? this.state.Model.FormModel.FormName : "")}</h5>
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
                                <div className="form" id="divBpmsParentContainer">
                                    {
                                        this.state.Model &&
                                        <UserTaskContent {...this.state.Model}></UserTaskContent>
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalForm;
