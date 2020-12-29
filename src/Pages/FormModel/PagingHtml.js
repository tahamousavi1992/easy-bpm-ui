import React from 'react';
const $ = window.$;
class PagingHtml extends React.Component {
    constructor() {
        super();
        this.loadSearchForm = this.loadSearchForm.bind(this);
    }
    componentDidMount() {

    }

    componentWillUnmount() {

    }
    loadSearchForm(event, doSearch, pageIndex) {
        let formId = event.target.closest('#divBpmsContainer[data-formId]').getAttribute('data-formId');
        let urlName = window[formId + 'GetDataGridPagingUrl'];
        let pageParams = window[formId + 'PageParams']
        let params = window.FormControl.get(this.props.elementId).getParams();
        ////distinct parameters 
        if (pageParams != null) {
            for (var i = 0; i < pageParams.split('&').length; i++) {
                let exParamArr = pageParams.split('&')[i].split('=');
                if (params[exParamArr[0]] == null) {
                    params[exParamArr[0]] = exParamArr[1];
                }
            }
        }
        doSearch(urlName, {
            PageIndex: pageIndex,
            SortColumn: this.props.SortColumn,
            SortType: this.props.SortType,
            ...params,
        });
    }
    render() {
        let message = `page ${this.props.StartPage} - from ${this.props.EndPage} to ${this.props.RowsCount} `;
        let rows = [];
        for (let i = this.props.StartPage; i <= this.props.EndPage; i++) {
            if (this.props.PageIndex == i) {

                rows.push((<li key={i}>
                    <a className="datatable-pager-link datatable-pager-link-number datatable-pager-link-active">{i}</a>
                </li>));
            }
            else {
                rows.push((<li key={i}>
                    <a className="datatable-pager-link datatable-pager-link-number"
                        onClick={(event) => this.loadSearchForm(event, this.props.doSearch, i)}>{i}</a>
                </li>));

            }
        }
        return (
            <div>
                {
                    (this.props.RowsCount > this.props.PageSize) &&
                    <div className="datatable-pager datatable-paging-loaded">
                        <ul className="datatable-pager-nav mb-5 mb-sm-0">
                            {
                                this.props.HasPreviousPage &&
                                <li>
                                    <a title="Previous" onClick={(event) => this.loadSearchForm(event, this.props.doSearch, this.props.PageIndex - 1)}
                                        className="datatable-pager-link datatable-pager-link-prev datatable-pager-link-disabled" ><i className="fa fa-angle-right"></i></a>
                                </li> &&
                                <li></li>
                            }

                            <li style={{ display: "none" }}>
                                <input type="text" className="datatable-pager-input form-control" title="Page Number" />
                            </li>
                            {rows}

                            {
                                this.props.HasNextPage &&
                                <li></li> &&
                                <li>
                                    <a title="Next" onClick={(event) => this.loadSearchForm(event, this.props.doSearch, this.props.PageIndex + 1)}
                                        className="datatable-pager-link datatable-pager-link-next" > <i className="fa fa-angle-left"></i></a>
                                </li>
                            }

                        </ul>
                        <div className="datatable-pager-info">
                            <span className="datatable-pager-detail">{message}</span>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default PagingHtml;

