import React from 'react';
const $ = window.$;
class SelectTypeControl extends React.Component {
    constructor() {
        super();
        let id = Math.floor(Math.random() * 100);
        this.state = { id: id};
    }
    async componentDidMount() {
        document.querySelector(`#linkSelectedValueType[data-id="${this.state.id}"]`).
            setAttribute('onclick', `window.openSelectTypeValue(this.closest('.input-group').querySelector('#txtSelectedValueType'), '${this.props.ContainerID}')`);
    }

    render() {
        return (
            <div className="input-group">
                <input id="txtSelectedValueType" className="form-control" type="text" autoComplete="off" readOnly="readonly"
                    data-value={this.props.Value} data-type={this.props.ValueType} defaultValue={this.props.Value} data-isselecttypevalue="true"
                    data-shapeid={this.props.ShapeID} data-dynamicformid={this.props.DynamicFormId} data-parentshapeid={this.props.ParentShapeID} data-isoutputyes={this.props.IsOutputYes} />
                <div className="input-group-append">
                    <span className="input-group-text">
                        <a id="linkSelectedValueType" data-id={this.state.id}
                            href="javascript:;" style={{ text_decoration: "none" }}>
                            <i className="fa fa-plus"></i>
                        </a>
                    </span>
                </div>
            </div>
        );
    }
}

export default SelectTypeControl;

