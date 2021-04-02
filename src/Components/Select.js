import React from 'react';
const $ = window.$;
class Select extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            (this.props.defaultValue != null ?
                <select disabled={this.props.disabled} onChange={this.props.handelChange} multiple={this.props.multiple == true} style={this.props.style} defaultValue={this.props.defaultValue} name={this.props.name} id={this.props.id} className={this.props.isRequired ? ("form-control required-field " + (this.props.className || '')) : ("form-control " + (this.props.className || ''))}
                    data-val={this.props.isRequired ? "true" : ""} data-val-group={this.props.validationGroup} data-val-required={this.props.requiredMsg} data-val-group="saveVariableForm" >
                    <option value="">{this.props.defaultOption ? this.props.defaultOption : "Select an option"}</option>
                    {
                        this.props.listItem && this.props.listItem.map((item, index) => {
                            return <option key={index} value={item[this.props.optionKey]}
                            >{item[this.props.optionLabel]}
                            </option>
                        })

                    }
                </select>
                :
                <select disabled={this.props.disabled} style={this.props.style} multiple={this.props.multiple == true} onChange={this.props.handelChange} value={this.props.value || ''} name={this.props.name} id={this.props.id} className={this.props.isRequired ? ("form-control required-field " + (this.props.className || '')) : ("form-control " + (this.props.className || ''))}
                    data-val={this.props.isRequired ? "true" : ""} data-val-required={this.props.requiredMsg} data-val-group={this.props.validationGroup}>
                    <option value="">{this.props.defaultOption ? this.props.defaultOption : "Select an option"}</option>
                    {
                        this.props.listItem && this.props.listItem.map((item, index) => {
                            return <option key={index} value={item[this.props.optionKey]}
                            >{item[this.props.optionLabel]}
                            </option>
                        })
                    }
                </select>
            )
        );
    }
}
class VariableControl extends React.Component {
    constructor() {
        super();
    }
    async componentDidMount() {
        document.querySelectorAll('.varListOpener a').forEach((item) => {
            item.setAttribute('onclick', 'window.openVariableList(this); return false');
        });
    }
    render() {
        return (
            <div className='input-group varListOpener'>
                <input id={this.props.name} name={this.props.name} defaultValue={this.props.value} onChange={this.props.onChange}
                    className={this.props.isRequired ? "form-control required-field" : "form-control"} type='text' autoComplete='off' readOnly='readonly' />
                <span onClick={(e) => { window.clearVariableInput(e.target); }} className='form-control-feedback fa fa-times-circle-o'></span>
                <div className='input-group-append'>
                    <span className='input-group-text'>
                        <a href='#' style={{ text_decoration: "none" }}>
                            <i className='fa fa-plus'></i>
                        </a>
                    </span>
                </div>
            </div>
        );
    }
}

class InnerVariableControl extends React.Component {
    constructor() {
        super();
    }
    async componentDidMount() {
        document.querySelectorAll('.varListOpener a').forEach((item) => {
            item.setAttribute('onclick', 'window.openVariableList(this); return false');
        });
    }
    render() {
        return (
            <div className='input-group varListOpener'>
                <textarea id={this.props.name} name={this.props.name} data-isinner={true} defaultValue={this.props.value} rows={this.props.rows}
                    className={this.props.isRequired ? "form-control required-field" : "form-control"} type='text' autoComplete='off' />
                <div className='input-group-append'>
                    <span className='input-group-text'>
                        <a href='#' style={{ text_decoration: "none" }}>
                            <i className='fa fa-plus'></i>
                        </a>
                    </span>
                </div>
            </div>
        );
    }
}


class RadioList extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            (this.props.defaultValue != null ?
                <React.Fragment>
                    {
                        this.props.listItem && this.props.listItem.map((item, index) => {
                            return <React.Fragment key={index}>
                                <div className="radio-inline">
                                    <label className="radio">
                                        <input type="radio" name={this.props.name} defaultChecked={this.props.defaultValue == item[this.props.optionKey]} id={this.props.id}
                                            defaultValue={item[this.props.optionKey]} onChange={this.props.handelChange} style={this.props.style} /><span></span>{item[this.props.optionLabel]}
                                    </label>
                                </div>
                            </React.Fragment>
                        })

                    }
                </React.Fragment>
                :
                <React.Fragment>
                    {
                        this.props.listItem && this.props.listItem.map((item, index) => {
                            return <React.Fragment key={index}>
                                <div className="radio-inline">
                                    <label className="radio">
                                        <input type="radio" name={this.props.name} checked={this.props.value == item[this.props.optionKey]} id={this.props.id}
                                            value={item[this.props.optionKey]} onChange={this.props.handelChange} style={this.props.style} />
                                        <span></span>{item[this.props.optionLabel]}
                                    </label>
                                </div>
                            </React.Fragment>
                        })

                    }
                </React.Fragment>
            )
        );
    }
}

class CheckBox extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            (this.props.defaultChecked != null ?
                <React.Fragment>
                    <div className="checkbox-inline">
                        <label className="checkbox">
                            <input type="checkbox" name={this.props.name} defaultChecked={this.props.defaultChecked} id={this.props.id}
                                defaultValue={this.props.defaultValue || true} onChange={this.props.handelChange} style={this.props.style} /><span></span>{this.props.label}
                        </label>
                    </div>
                </React.Fragment>
                :
                <React.Fragment>
                    <div className="checkbox-inline">
                        <label className="checkbox">
                            <input type="checkbox" name={this.props.name} checked={this.props.checked} id={this.props.id}
                                value={this.props.value || true} onChange={this.props.handelChange} style={this.props.style} />
                            <span></span>{this.props.label}
                        </label>
                    </div>
                </React.Fragment>
            )
        );
    }
}
export { Select as default, VariableControl, RadioList, CheckBox, InnerVariableControl }


