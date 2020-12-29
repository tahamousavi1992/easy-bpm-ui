import React from 'react'; 
import GetIndex from '../Pages/SingleAction/GetIndex';
import GetThreadDetail from '../Pages/Cartable/TaskManage/GetThreadDetail';
import { BrowserRouter, Route, Link, withRouter, Switch } from 'react-router-dom'
const $ = window.$; 
class FormLoaderLayout extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-column flex-root" >
                    <div className="d-flex flex-row flex-column-fluid page">
                        <div className="d-flex flex-column flex-row-fluid wrapper fullscreen-fluid">
                            <div className="content  d-flex flex-column flex-column-fluid">
                                <div className="d-flex flex-column-fluid">
                                    <div className=" container-fluid ">
                                        <Switch>      
                                            /* When calling from another page with threadId parameter or calling to continue or see a thread not to make one ! */
                                            <Route path="*/GetIndex/:threadId" render={(props) => { return <GetIndex {...props} /> }} />
                                           /* When redirecting after post to server to other app page with applicationPageId parameter or calling this page with this parameter    ! */
                                            <Route path="*/GetAppPageIndex/:applicationPageId" render={(props) => { return <GetIndex {...props} /> }} />
                                            <Route render={(props) => { return <GetIndex {...props} /> }} />
                                        </Switch>
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

export default FormLoaderLayout;

