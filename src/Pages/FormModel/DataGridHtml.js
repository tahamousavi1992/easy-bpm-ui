import React, { useState } from 'react';
import PagingHtml from './PagingHtml';
import UtilityService from '../../Services/UtilityService';
const $ = window.$;
export default function DataGridHtml(props) { 
    let reportUrlName = (e) => { return (e.target.closest('#divBpmsContainer[data-formId]').getAttribute('data-formId') + 'GetDataGridReport') };
    let [model, setModel] = useState({ ...props });

    let doSearch = async function (urlName, getPagingProperties) {
        let data = await new UtilityService().doSearch(async (data) => { return await new UtilityService().getData(urlName, data); }, {}, false, false, getPagingProperties);
        setModel({ ...data });
    }
    //To be used in updateItems function located in DataGridElement.js
    window['DatagridUpdateItems' + props.Id] = function (data) {
        setModel({ ...data });
    };
    let helpText = (model.HelpMessageText != null && model.HelpMessageText != '') ?
        ' <i class="fa fa-exclamation-circle" data-toggle="tooltip" title="' + model.HelpMessageText + '"></i>' : '';
    return (
        <React.Fragment>
            {
                //is not ButtonHtml.e_subtype.submit
                (model != null && model.Visibility != false) &&
                <div className="bpms-control-container" id={'divDataGrid_' + model.Id}>
                    <div className="card-head flex-wrap">
                        <div className="card-caption">
                            <h4 className="card-label-head" dangerouslySetInnerHTML={{ __html: model.Label + helpText }} >
                            </h4>
                        </div>
                        <div className="card-head-toolbar">
                            {
                                (model.ShowExcel || model.ShowPdf) &&
                                <div className="dropdown dropdown-inline ml-2">
                                    <button type="button" className="btn btn-light-primary font-weight-bolder dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Export
                                   </button>
                                    <div className="dropdown-menu dropdown-menu-sm" >
                                        <ul className="navi flex-column navi-hover py-2">
                                            {
                                                model.ShowExcel &&
                                                <li className="navi-item">
                                                    <a href="javascript:;" className="navi-link" onClick={(e) => { window.downloadFile(window[reportUrlName(e)] + `&formId=${model.DynamicFormID}&controlId=${model.Id}&format=excel`); }}>
                                                        <span className="navi-icon"><i className="la la-file-excel-o"></i></span>
                                                        <span className="navi-text">Excel</span>
                                                    </a>
                                                </li>
                                            }
                                            {
                                                model.ShowPdf &&
                                                <li className="navi-item">
                                                    <a href="javascript:;" className="navi-link" onClick={(e) => { window.downloadFile(window[reportUrlName(e)] + `&formId=${model.DynamicFormID}&controlId=${model.Id}&format=pdf`); }}>
                                                        <span className="navi-icon"><i className="la la-file-pdf-o"></i></span>
                                                        <span className="navi-text">PDF</span>
                                                    </a>
                                                </li>
                                            }

                                        </ul>
                                    </div>
                                </div>
                            }
                             
                        </div>
                    </div>
                    <div className="bpms-table bpms-table-bordered  bpms-table-default">
                        <div className="table-information table-responsive">
                            <table id={model.Id} name={model.Id} className={model.CssClass} data-type={model.Type} data-parameter={model.Parameter}
                                data-formid={model.DynamicFormID} dangerouslySetInnerHTML={{ __html: model.RenderedTemplateList }}>
                            </table>
                        </div>
                        {
                            model.PagingProperties &&
                            <PagingHtml doSearch={doSearch} {...model.PagingProperties} elementId={model.Id} />
                        }
                    </div >
                    <span htmlFor={model.Id} className="form-text text-muted"></span>
                </div>
            }

        </React.Fragment>
    );
}


