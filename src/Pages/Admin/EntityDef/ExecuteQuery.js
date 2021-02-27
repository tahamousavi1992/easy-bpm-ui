import React, { useState } from 'react';
import EntityDefService from '../../../Services/EntityDefService';
import UtilityService from '../../../Services/UtilityService';
import Select from '../../../Components/Select';
import Lang from '../../../Shared/AdminLang/Lang';
const $ = window.$;
class ExecuteQuery extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.run = this.run.bind(this);

    }

    async componentDidMount() {
        //load data 
        await this.fillForm(this.props.addEditId);
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
    }

    async fillForm(entityId) {
        let data = await new EntityDefService().executeQuery(entityId);
        this.setState({ ...data });
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event, this.state)); }

    async run(event) {
        let result = await new EntityDefService().executeQuery(this.state.EntityId, this.state.Query);
        if (result.ResultType != null)
            UtilityService.showMessage(result.ResultType, result.Message);
        else
            this.setState({ ...result });
    }


    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-xxlg modal-windows" role="document" id="addEditEntityModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.ExecuteQuery.caption}</h5>
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
                        {
                            this.state.Data &&
                            <div className="form">
                                <div className="form-group row">
                                    <div className="col-lg-10">
                                        <label>{Lang.ExecuteQuery.query}</label>
                                        <div className="input-group">
                                            <textarea name="Query" id="Query" className="form-control" rows="5" value={this.state.Query || ''} onChange={this.handelChange}></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <button type="button" className="btn btn-success font-weight-bold" onClick={this.run} style={{ position: 'absolute', bottom: 0 }}>
                                            {Lang.ExecuteQuery.Run}
                                        </button>
                                    </div>
                                </div>
                                <div className="datatable datatable-bordered datatable-head-custom datatable-default  ">
                                    <div className="table-information table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    {
                                                        this.state.Columns &&
                                                        this.state.Columns.map((item, index) => {
                                                            return <th key={index} className="text-center">
                                                                {item.ColumnName}
                                                            </th>
                                                        })
                                                    }

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.Data &&
                                                    this.state.Data.map((item, index) => {
                                                        return <tr key={index} className="text-center" >
                                                            {
                                                                this.state.Columns.map((column, cindex) => {
                                                                    return <td key={cindex} className="text-center">
                                                                        {item[column.ColumnName]}
                                                                    </td>
                                                                })
                                                            }
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">
                            {Lang.Shared.cancel}
                        </button>
                    </div>
                </div >
            </div >
        );
    }
}

export default ExecuteQuery;

