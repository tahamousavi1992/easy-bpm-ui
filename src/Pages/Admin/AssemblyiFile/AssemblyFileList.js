import React, { useEffect } from 'react';
import UtilityService from '../../../Services/UtilityService';
import Lang from '../../../Shared/AdminLang/Lang';
import { setAssemblyFile, updateAssemblyFile, getAssemblyFile, deleteAssemblyFile } from '../../../State/reducers/assemblyFile';
import {useSelector, useDispatch} from 'react-redux'

export default function AssemblyFileList(props) {
    let model = useSelector((state)=> state.assemblyFile.value);
    let dispatch = useDispatch();

    useEffect(() => {
        props.setPageCaption(26, [Lang.Menu.assemblyFileList, Lang.Menu.setting], false);
        dispatch(getAssemblyFile());
        return () => { }
    }, []);


    async function uploadFile() {
        dispatch(updateAssemblyFile(UtilityService.getFormData('assemblyForm')));
    }

    async function deleteFile(fileName) {
        dispatch(deleteAssemblyFile(fileName));
    }

    return (
        <div>
            <div id="assemblyForm">
                <div className="row">
                    <div className="col-xl-12">

                        <div className="card card-custom gutter-b">
                            <div className="card-header flex-wrap border-0 pt-6 pb-0">
                                <div className="card-title">
                                    <h3 className="card-label">
                                        {Lang.AssemblyFileList.caption}
                                    </h3>
                                </div>
                                <div className="card-toolbar">
                                    <input type="file" name="FileAssembly" id="FileAssembly" onChange={() => uploadFile()} style={{ display: "none" }} />
                                    <a href="javascript:;" className="btn btn-primary font-weight-bolder" id="btnaddnewAPIAccess" onClick={() => document.getElementById('FileAssembly').click()}>
                                        {Lang.AssemblyFileList.new}
                                    </a>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                                    <div className="table-information table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        {Lang.AssemblyFileList.tbl_th_FileName}
                                                    </th>
                                                    <th>
                                                        {Lang.AssemblyFileList.tbl_th_Size}
                                                    </th>
                                                    <th>
                                                        {Lang.AssemblyFileList.tbl_th_Version}
                                                    </th>
                                                    <th>
                                                        {Lang.AssemblyFileList.tbl_th_Operation}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    model.GetList &&
                                                    model.GetList.map((item, index) => {
                                                        return <tr key={item.FileName} className="text-center" >
                                                            <td className="text-center">
                                                                {item.FileName}
                                                            </td>
                                                            <td className="text-center">
                                                                {item.Size}
                                                            </td>
                                                            <td className="text-center">
                                                                {item.Version}
                                                            </td>
                                                            <td className="text-center">
                                                                <a href="javascript:;" onClick={() => UtilityService.showConfirm(Lang.Shared.makeDelete, deleteFile, item.Name)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete}>
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

