import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ContentHtml from './ContentHtml'
import UtilityService from '../../Services/UtilityService';
import ModalForm from './ModalForm'
import BpmsConfig from '../../Shared/BpmsConfig'
const $ = window.$;
export default function UserTaskContent(props) {
    let [model, setModel] = useState({});
    const history = useHistory();
    useEffect(() => {
        //dynamic script ,defined in forms ,whill be added to page.
        let script = document.createElement('script');
        script.innerHTML = props.FormModel.ContentHtml.Helper.Script;
        document.body.appendChild(script);

        setTimeout(() => {
            try {
                window.FormControl.initBpmsEngine();
            }
            catch (ex) {
                console.log("Caught exception: " + ex);
            }
        }, 700);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    async function addGoNextStep(target) {
        await postForm(target, true);
    }

    async function addGoPreviousStep(target) {
        await postForm(target, false);
    }

    async function postForm(target, goNext) {
        if (window.bpmsFormIsValid()) {
            let url = window[getContainerFormId(target) + "GetPostUrl"];
            if (url != '') {
                if (target.getAttribute('data-type') != null) {
                    url += (url.indexOf("?") > 0 ? "&controlId=" : "?controlId=") + target.id;
                }
                if (goNext != null) {
                    url += (url.indexOf("?") > 0 ? "&goNext=" : "?goNext=") + goNext.toString().toLowerCase();
                }
                await doPostBack(target, url);
            }
        }
    }

    async function doPostBack(target, url) {
        let containerElement = target.closest('.modal-content') != null ? target.closest('.modal-content') : target.closest('#divBpmsContainer');

        let result = await new UtilityService().postData(url, UtilityService.getFormDataByElement(containerElement, null));
        UtilityService.showMessageByList(result.MessageList);
        if (result.Result) {
            if (result.RedirectUrl != null && result.RedirectUrl != "") {
                if (result.RedirectUrl == 'CartableManage')
                    history.push(BpmsConfig.currentPage() + "/MyTasks");
                else
                    window.location.href = result.RedirectUrl;
            } else {
                if (result.ReloadForm != null && result.ReloadForm != "") {
                    //result.EndAppPageID is only used in formLoader
                    props.updateForm(result.StepID, result.EndAppPageID);
                }
                else {
                    if (result.IsSubmit == true) {
                        if (target.closest('.modal.show') != null) {
                            window.FormControl.closeModal();
                            let callBackFuncName = getContainerFormId(target) + 'callBackModal';
                            if (window[callBackFuncName] != null)
                                window[callBackFuncName]();
                        }
                    }
                    if (result.ListDownloadModel != null && result.ListDownloadModel.length > 0) {
                        result.ListDownloadModel.forEach(function (item) {
                            window.BPMSCommon.downloadFileModel(item);
                        });
                    }
                }
            }
        }
        else
            if (result.RedirectUrl != null && result.RedirectUrl != "") {
                window.location.href = result.RedirectUrl;
            }
    }

    async function openPopUpForm(formId, params, callBackFunc, width, height) {
        let url = props.GetPopUpUrl + (props.GetPopUpUrl.indexOf('?') > 0 ? "&" : "?") + 'formID=' + formId + (params != '' ? ('&' + params.replaceAll(',', '&')) : '');
        setModel({ OpenPopUp: false });
        setModel({ OpenPopUp: true, OpenPopUpUrl: url, FormId: formId, CallBackFunc: callBackFunc, Width: width, Height: height });
    }

    function getContainerFormId(element) {
        let container = element.closest('#divBpmsContainer[data-formId]');
        //if element is in modal footer ,container will be null
        if (container == null)
            container = element.closest('.modal-dialog').querySelector('#divBpmsContainer');
        return container.getAttribute('data-formId');
    }

    window[props.FormModel.DynamicFormID + "openPopUpForm"] = openPopUpForm;
    window[props.FormModel.DynamicFormID + "PageParams"] = props.PageParams;
    window[props.FormModel.DynamicFormID + "GetListElementUrl"] = props.GetListElementUrl;
    window[props.FormModel.DynamicFormID + "GetControlValueUrl"] = props.GetControlValueUrl;
    window[props.FormModel.DynamicFormID + "GetConfirmResultUrl"] = props.GetConfirmResultUrl;
    window[props.FormModel.DynamicFormID + "GetOperationUrl"] = props.GetOperationUrl;
    window[props.FormModel.DynamicFormID + "GetExecuteCodeUrl"] = props.GetExecuteCodeUrl;
    window[props.FormModel.DynamicFormID + "GetDataGridElementUrl"] = props.GetDataGridElementUrl;
    window[props.FormModel.DynamicFormID + "DeleteFileUrl"] = props.DeleteFileUrl;
    window[props.FormModel.DynamicFormID + "DownloadFileUrl"] = props.DownloadFileUrl;
    window[props.FormModel.DynamicFormID + "GetPopUp"] = props.GetPopUpUrl;
    window[props.FormModel.DynamicFormID + "GetPostUrl"] = props.GetPostUrl;
    window[props.FormModel.DynamicFormID + "GetDataGridPagingUrl"] = props.GetDataGridPagingUrl;
    window[props.FormModel.DynamicFormID + "GetDataGridReport"] = props.GetDataGridReport;
    window[props.FormModel.DynamicFormID + "GetChartElementUrl"] = props.GetChartElementUrl;
    window[props.FormModel.DynamicFormID + "GetCaptchaUrl"] = props.GetCaptchaUrl;
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: props.CssFiles }} />
            <style>
                {props.FormModel.ContentHtml.Helper.StyleSheet}
            </style>
            <div id="divBpmsContainer" data-form-container="true" data-formid={props.FormModel.DynamicFormID}>
                <div className="form mt-2">
                    <input name="StepID" type="hidden" defaultValue={props.FormModel.StepID} />
                    <ContentHtml globalProps={{
                        DownloadFileUrl: props.DownloadFileUrl,
                        PostForm: postForm,
                        AddGoPreviousStep: addGoPreviousStep,
                        AddGoNextStep: addGoNextStep
                    }} {...props.FormModel.ContentHtml}></ContentHtml>
                    {
                        (props.FormModel.IsMultiStep && !props.FormModel.IsFormReadOnly) &&
                        <div className="form-group">
                            <div className="col-sm-12 text-left">
                                {
                                    !props.FormModel.IsFirstStep &&
                                    <button id="btnPreviousStep" type="submit" className="btn btn-danger" onClick={(e) => { addGoPreviousStep(e.target) }}>
                                        Previous Step
                                    </button>
                                }
                                {
                                    !props.FormModel.HasSubmitButton &&
                                    <button id="btnSaveData" type="submit" className="btn btn-success" data-val-group="nextAction" onClick={(e) => { props.FormModel.IsLasStep ? postForm(e.target) : addGoNextStep(e.target) }}>
                                        {(props.FormModel.IsLasStep ? "Save" : "Save And Next")}
                                    </button>
                                }
                            </div>
                        </div>
                    }

                    {
                        (!props.FormModel.HasSubmitButton && props.ProcessID && !props.FormModel.IsFormReadOnly) &&
                        <div className="form-group">
                            <div className="col-sm-12 text-right">
                                <button id="btnSaveData" type="submit" data-val-group="nextAction" onClick={(e) => { postForm(e.target); }} className="btn btn-success">
                                    Save
                                </button>
                            </div>
                        </div>
                    }

                    {
                        props.ScriptFiles
                    }
                </div>
            </div>
            <React.Fragment>
                {
                    model.OpenPopUp &&
                    <ModalForm openPopUpUrl={model.OpenPopUpUrl} formId={model.FormId}
                        callBackFunc={model.CallBackFunc} width={model.Width} height={model.Height}></ModalForm>
                }
            </React.Fragment>
        </div>
    );
}


