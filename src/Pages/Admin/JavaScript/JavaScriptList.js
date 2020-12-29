import React from 'react';
import JavaScriptService from '../../../Services/JavaScriptService';
import UtilityService from '../../../Services/UtilityService';
import Lang from '../../../Shared/AdminLang/Lang';
class JavaScriptList extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.doSearch = this.doSearch.bind(this);
        this.delete = this.delete.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    async componentDidMount() {
        this.props.setPageCaption(27, [Lang.Menu.JavaScriptList, Lang.Menu.management], false);
        this.doSearch();
    }

    async doSearch() {
        let data = await new JavaScriptService().getList();
        this.setState({ GetList: data });
    }

    async uploadFile() {
        let result = await new JavaScriptService().update(UtilityService.getFormData('styleSheetForm'));
        UtilityService.showMessage(result.ResultType, result.Message);
        this.doSearch();
    }

    async delete(fileName) {
        let result = await new JavaScriptService().delete(fileName);
        UtilityService.showMessage(result.ResultType, result.Message);
        this.doSearch();
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    render() {
        return (
            <div>
                <div id="styleSheetForm">
                    <div className="row">
                        <div className="col-xl-12">

                            <div className="card card-custom gutter-b">
                                <div className="card-header flex-wrap border-0 pt-6 pb-0">
                                    <div className="card-title">
                                        <h3 className="card-label">
                                            {Lang.JavaScriptList.caption}
                                        </h3>
                                    </div>
                                    <div className="card-toolbar">
                                        <input type="file" name="FileJs" id="FileJs" onChange={() => this.uploadFile()} style={{ display: "none" }} />
                                        <button type="button" className="btn btn-primary font-weight-bolder" id="btnaddnewStyle" onClick={() => document.getElementById('FileJs').click()}>
                                            {Lang.JavaScriptList.new}
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                                        <div className="table-information table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            {Lang.JavaScriptList.tbl_th_FileName}
                                                        </th>
                                                        <th>
                                                            {Lang.JavaScriptList.tbl_th_Size}
                                                        </th>
                                                        <th>
                                                            {Lang.JavaScriptList.tbl_th_Operation}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.GetList &&
                                                        this.state.GetList.map((item, index) => {
                                                            return <tr key={item.index} className="text-center" >
                                                                <td className="text-center">
                                                                    {item.FileName}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.Size}
                                                                </td>
                                                                <td className="text-center">
                                                                    <a onClick={() => UtilityService.showConfirm(Lang.Shared.makeDelete, this.delete, item.Name)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete}>
                                                                        <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JavaScriptList;

