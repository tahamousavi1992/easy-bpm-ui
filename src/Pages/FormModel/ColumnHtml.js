import React, { useState } from 'react';
import ButtonHtml from './ButtonHtml'
import DataGridHtml from './DataGridHtml'
import ImageHtml from './ImageHtml'
import LinkHtml from './LinkHtml'
import TitleHtml from './TitleHtml'
import HtmlCodeHtml from './HtmlCodeHtml'
import WordCaptchaHtml from './WordCaptchaHtml'
import CaptchaHtml from './CaptchaHtml'
import CheckBoxHtml from './CheckBoxHtml'
import DatePickerHtml from './DatePickerHtml'
import DropDownHtml from './DropDownHtml'
import CheckBoxListHtml from './CheckBoxListHtml'
import RadioButtonListHtml from './RadioButtonListHtml'
import ComboSearchHtml from './ComboSearchHtml'
import DownloadLinkHtml from './DownloadLinkHtml'
import FileUploadHtml from './FileUploadHtml'
import CkeditorHtml from './CkeditorHtml'
import TextBoxHtml from './TextBoxHtml'
import FormHtml from './FormHtml'
import ChartHtml from './ChartHtml'
const $ = window.$;
export default function ColumnHtml(props) {

    return (
        <React.Fragment>
            {
                props.Visibility != false &&
                <div className={props.CssClass} id={props.Id} data-type={props.Type} data-formid={props.DynamicFormID}>
                    <div className="form-group">
                        { 
                            props.children.map((item, index) => {
                                return <React.Fragment key={index} >
                                    {
                                        item.Type == "DROPDOWNLIST" &&
                                        <DropDownHtml globalProps={props.globalProps}  {...item} />
                                    }
                                    {
                                        item.Type == "TEXTBOX" &&
                                        <TextBoxHtml globalProps={props.globalProps}  {...item} /> 
                                    }
                                    {
                                        item.Type == "RADIOBUTTONLIST" &&
                                        <RadioButtonListHtml globalProps={props.globalProps}  {...item} />
                                    }
                                    {
                                        item.Type == "CHECKBOXLIST" &&
                                        <CheckBoxListHtml globalProps={props.globalProps}  {...item} />
                                    }
                                    {
                                        item.Type == "CHECKBOX" &&
                                        <CheckBoxHtml globalProps={props.globalProps}  {...item} />
                                    }
                                    {
                                        item.Type == "IMAGE" &&
                                        <ImageHtml globalProps={props.globalProps}  {...item} />
                                    }
                                    {
                                        item.Type == "LINK" &&
                                        <LinkHtml globalProps={props.globalProps}  {...item} />
                                    }
                                    {
                                        item.Type == "CAPTCHA" &&
                                        <CaptchaHtml globalProps={props.globalProps}  {...item} />
                                    }
                                    {
                                        item.Type == "TITLE" &&
                                        <TitleHtml globalProps={props.globalProps}  {...item} />
                                    }
                                    {
                                        item.Type == "DATEPICKER" &&
                                        <DatePickerHtml globalProps={props.globalProps}  {...item} />
                                    }
                                    {
                                        item.Type == "CKEDITOR" &&
                                        <CkeditorHtml globalProps={props.globalProps}  {...item} /> 
                                    }
                                    {
                                        item.Type == "HTMLCODE" &&
                                        <HtmlCodeHtml globalProps={props.globalProps}  {...item} />
                                    }
                                    {
                                        item.Type == "FILEUPLOAD" &&
                                        <FileUploadHtml globalProps={props.globalProps}  {...item} />
                                    }
                                    {
                                        item.Type == "BUTTON" &&
                                        <ButtonHtml globalProps={props.globalProps}  {...item} />
                                    }
                                    {
                                        item.Type == "DOWNLOADLINK" &&
                                        <DownloadLinkHtml globalProps={props.globalProps}  {...item} />
                                    }
                                    {
                                        item.Type == "COMBOSEARCH" &&
                                        <ComboSearchHtml globalProps={props.globalProps}  {...item} />
                                    }
                                    {
                                        item.Type == "DATAGRID" &&
                                        <DataGridHtml globalProps={props.globalProps}  {...item} />
                                    }
                                    {
                                        item.Type == "FORM" &&
                                        <FormHtml globalProps={props.globalProps}  {...item} /> 
                                    }
                                    {
                                        item.Type == "CHART" &&
                                        <ChartHtml globalProps={props.globalProps}  {...item} />  
                                    }
                                    {
                                        item.Type == "WORDCAPTCHA" &&
                                        <WordCaptchaHtml globalProps={props.globalProps}  {...item} />
                                    }
                                </React.Fragment>
                            })
                        }
                    </div>
                </div>
            }
        </React.Fragment >
    );
}


