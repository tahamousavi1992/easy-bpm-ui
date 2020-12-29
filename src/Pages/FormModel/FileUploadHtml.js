import React, { useState } from 'react';
const $ = window.$;
export default function FileUploadHtml(props) {
    let [model, setModel] = useState({ ...props });
    let helpText = (model.HelpMessageText != null && model.HelpMessageText != '') ?
        ' <i class="fa fa-exclamation-circle" data-toggle="tooltip" title="' + model.HelpMessageText + '"></i>' : '';
    return (
        <React.Fragment>
            {
                (model != null && model.Visibility != false) &&
                <div className="bpms-control-container">
                    <label dangerouslySetInnerHTML={{ __html: model.Label + helpText }}></label>
                    {
                        (model.ListDocumentDef != null && model.ListDocumentDef.length > 0) &&
                        <div className="datatable datatable-bordered datatable-head-custom datatable-default datatable-primary datatable-loaded mt-2">
                            <div className="table-information table-responsive">
                                <table className="table table-bordered" id={"divUploader_" + model.Id}>
                                    <tbody>
                                        {
                                            model.ListDocumentDef &&
                                            model.ListDocumentDef.map((def, index) => {
                                                let document = model.ListDocument.findIndex((c) => { return c.Value == def.ID }) > -1 ?
                                                    model.ListDocument.find((c) => { return c.Value == def.ID }).Key : null;
                                                return <tr key={index}>

                                                    <td style={{ width: "30%" }} >
                                                        {def.DisplayName}
                                                    </td>
                                                    {
                                                        model.IsReadonly != true &&
                                                        <td style={{ width: "50%" }}>
                                                            <input id={(model.Id + "_" + def.ID)} name={(model.Id + "_" + def.ID)} type="file" {...model.EventDataAttributes.reduce((prev, curr) => { prev[curr.AttrName] = curr.FunctionName; return prev; }, {})} data-type={model.Type}
                                                                className={model.CssClass + (def.IsMandatory ? " required-field" : "")} data-formid={model.DynamicFormID} />
                                                        </td>
                                                    }
                                                    {
                                                        document != null &&
                                                        <React.Fragment>
                                                            <td style={{ width: "10%" }}>
                                                                <a id={"download_" + document} className={model.DownloadClass} data-formid={model.DynamicFormID}
                                                                    href={props.globalProps.DownloadFileUrl + "&guid=" + document} dangerouslySetInnerHTML={{ __html: model.DownloadCaption }}>

                                                                </a>
                                                            </td>

                                                            {
                                                                model.IsReadonly != true &&
                                                                <td style={{ width: "10%" }}>
                                                                    <a id={"delete_" + document} className={model.DeleteClass} data-fileid={document} data-formid={model.DynamicFormID}
                                                                        href="javascript:;" onClick={(e) => { window.FormControl.get(model.Id + "_" + def.ID).deleteFile(e.target); }}
                                                                        dangerouslySetInnerHTML={{ __html: model.DeleteCaption }}>

                                                                    </a>
                                                                </td>
                                                            }
                                                        </React.Fragment>
                                                    }

                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                    {
                        !(model.ListDocumentDef != null && model.ListDocumentDef.length > 0) &&
                        <React.Fragment >
                            {
                                model.Multiple &&
                                <div className="input-group">
                                    <table className={model.CssClass.replace("form-control", "table")} id={"divUploader_" + model.Id}>
                                        <tbody>
                                            {
                                                model.ListDocument &&
                                                model.ListDocument.map((doc, index) => {
                                                    return <tr key={index}   >

                                                        {
                                                            model.IsReadonly != true &&
                                                            <td style={{ width: "70%" }}>
                                                                <input id={model.Id} name={model.Id} data-ismultiple={model.Multiple} type="file" {...model.EventDataAttributes.reduce((prev, curr) => { prev[curr.AttrName] = curr.FunctionName; return prev; }, {})} data-type={model.Type} data-formid={model.DynamicFormID} />
                                                            </td>
                                                        }
                                                        <td style={{ width: "15%" }}>
                                                            <a id={model.Id} className={model.DownloadClass} data-formid={model.DynamicFormID}
                                                                href={props.globalProps.DownloadFileUrl + "&guid=" + doc.Key} dangerouslySetInnerHTML={{ __html: model.DownloadCaption }}>

                                                            </a>
                                                        </td>

                                                        {
                                                            model.IsReadonly != true &&
                                                            <td style={{ width: "15%" }}>
                                                                <a id={model.Id} className={model.DeleteClass} data-fileid={doc.Key} data-formid={model.DynamicFormID}
                                                                    href="javascript:;" onClick={(e) => { window.FormControl.get(model.Id).deleteFile(e.target) }}
                                                                    dangerouslySetInnerHTML={{ __html: model.DeleteCaption }}>

                                                                </a>
                                                            </td>
                                                        }
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table >
                                    <div className="input-group text-right">
                                        <button className="btn btn-success" type="button" onClick={(e) => { window.FormControl.getByType(model.Type, model.Id).addRow(model.Id, model.DynamicFormID, model.DeleteClass, window.toB64(model.DeleteCaption)); }}>
                                            Add File
                                        </button>
                                    </div>
                                </div>

                            }
                            {
                                (!model.Multiple && model.ListDocument.length > 0) &&
                                <table>
                                    <tr>
                                        {
                                            model.IsReadonly != true &&
                                            <td style={{ width: "70%" }}>
                                                <div className="input-group">
                                                    <input id={model.Id} name={model.Id} className={model.CssClass} type="file" {...model.EventDataAttributes.reduce((prev, curr) => { prev[curr.AttrName] = curr.FunctionName; return prev; }, {})} data-type={model.Type} data-formid={model.DynamicFormID} />
                                                </div>
                                            </td>
                                        }
                                        <td style={{ width: "15%" }}>
                                            <a id={"download_" + model.ListDocument[model.ListDocument.length - 1].Key} className={model.DownloadClass} data-formid={model.DynamicFormID}
                                                href={props.globalProps.DownloadFileUrl + "&guid=" + model.ListDocument[model.ListDocument.length - 1].Key.toString()} dangerouslySetInnerHTML={{ __html: model.DownloadCaption }}>

                                            </a>
                                        </td>

                                        {
                                            model.IsReadonly != true &&
                                            <td style={{ width: "15%" }}>
                                                <a id={"delete_" + model.ListDocument[model.ListDocument.length - 1].Key} className={model.DeleteClass} data-fileid={model.ListDocument[model.ListDocument.length - 1].Key} data-formid={model.DynamicFormID}
                                                    href="javascript:;" onClick={(e) => { window.FormControl.get(model.Id).deleteFile(e.target) }}
                                                    dangerouslySetInnerHTML={{ __html: model.DeleteCaption }}>

                                                </a>
                                            </td>
                                        }

                                    </tr>
                                </table >
                            }
                            {
                                (!model.Multiple && model.ListDocument.length == 0) &&
                                <React.Fragment>
                                    {
                                        model.IsReadonly != true &&
                                        <div className="input-group">
                                            <div className="input-group-prepend"><span className="input-group-text"><i className="fa fa-upload"></i></span></div>
                                            <input id={model.Id} name={model.Id} className={model.CssClass} type="file" {...model.EventDataAttributes.reduce((prev, curr) => { prev[curr.AttrName] = curr.FunctionName; return prev; }, {})} data-type={model.Type} data-formid={model.DynamicFormID} />
                                        </div>
                                    }
                                    {
                                        model.IsReadonly == true &&
                                        <div className="input-group">
                                            <div className="input-group-prepend"><span className="input-group-text"><i className="fa fa-upload"></i></span></div>
                                            <input id={model.Id} readonly name={model.Id} className={model.CssClass} data-type={model.Type} data-formid={model.DynamicFormID} />
                                        </div>
                                    }
                                </React.Fragment>
                            }
                        </React.Fragment>
                    }
                    <span htmlFor={model.Id} className="form-text text-muted"></span>
                </div>
            }
        </React.Fragment >
    );
}


