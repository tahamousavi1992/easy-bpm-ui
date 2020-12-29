import React from 'react';
const $ = window.$;
class Paging extends React.Component {
    constructor() {
        super();
        this.loadSearchForm = this.loadSearchForm.bind(this);
    }
    componentDidMount() {

    }

    componentWillUnmount() {

    }
    loadSearchForm(event, doSearch, pageIndex) {
        doSearch(false, null, {
            PageIndex: pageIndex,
            SortColumn: this.props.SortColumn,
            SortType: this.props.SortType
        });
    }
    render() {
        let message = `page ${this.props.StartPage} - from ${this.props.EndPage} to ${this.props.RowsCount} `;
        let rows = [];
        for (let i = this.props.StartPage; i <= this.props.EndPage; i++) {
            if (this.props.PageIndex == i) {

                rows.push((<li key={i}>
                    <a className="bpms-table-pager-link bpms-table-pager-link-number bpms-table-pager-link-active">{i}</a>
                </li>));
            }
            else {
                rows.push((<li key={i}>
                    <a className="bpms-table-pager-link bpms-table-pager-link-number"
                        onClick={(event) => this.loadSearchForm(event, this.props.doSearch, i)}>{i}</a>
                </li>));

            }
        }
        return (
            <div>
                {
                    (this.props.RowsCount > this.props.PageSize) &&
                    <div className="bpms-table-pager bpms-table-paging-loaded">
                        <ul className="bpms-table-pager-nav mb-5 mb-sm-0">
                            {
                                this.props.HasPreviousPage &&
                                <li>
                                    <a title="Previous" onClick={(event) => this.loadSearchForm(event, this.props.doSearch, this.props.PageIndex - 1)}
                                        className="bpms-table-pager-link bpms-table-pager-link-prev bpms-table-pager-link-disabled" ><i className="fa fa-angle-right"></i></a>
                                </li> &&
                                <li></li>
                            } 
                            <li style={{ display: "none" }}>
                                <input type="text" className="bpms-table-pager-input form-control" title="Page Number" />
                            </li>
                            {rows}

                            {
                                this.props.HasNextPage &&
                                <li></li> &&
                                <li>
                                    <a title="Next" onClick={(event) => this.loadSearchForm(event, this.props.doSearch, this.props.PageIndex + 1)}
                                        className="bpms-table-pager-link bpms-table-pager-link-next" > <i className="fa fa-angle-left"></i></a>
                                </li>
                            }

                        </ul>
                        <div className="bpms-table-pager-info">
                            <span className="bpms-table-pager-detail">{message}</span>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Paging;

