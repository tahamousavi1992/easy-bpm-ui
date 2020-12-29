import React, { useState } from 'react';
const $ = window.$;
export default function ButtonHtml(props) {
 
    return (
        <React.Fragment>
            { 
                (props.Visibility != false && !props.IsReadonly || props.subtype != 1) &&
                <button id={props.Id} name={props.Id}
                    {...(props.HasConfirm ? "data-hasConfirm='true' data-confirmText='" + props.ConfirmText + "'" : "")}
                    {...(props.HasExpressionConfirm ? ({ 'data-hasexpressionconfirm': true, 'data-expressionconfirmhasfalseaction': props.ExpressionConfirmHasFalseAction.toString(), 'data-expressionconfirmparams': props.GetParameter, 'data-expressionconfirmtext': props.ExpressionConfirmText }) : {})}
                    onClick={(event) => { if (!props.HasPostBack) { } else { (props.IsLastStep == true || props.IsMultiStep != true ? props.globalProps.PostForm(event.target) : props.globalProps.AddGoNextStep(event.target)) } }}
                    type={props.SubTypeName} data-val-group={props.ValidationGroup} className={props.CssClass + " bpms-control-container"}
                    {...props.EventDataAttributes.reduce((prev, curr) => { prev[curr.AttrName] = curr.FunctionName; return prev; }, {})}
                    data-type={props.Type} data-formid={props.DynamicFormID} dangerouslySetInnerHTML={{ __html: props.Label }}>
                </button>
            }
        </React.Fragment >
    );
}


