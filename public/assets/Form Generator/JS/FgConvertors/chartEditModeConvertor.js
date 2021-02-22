'use strict';
import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";
import FgChartEditMode from "../FgElementsEditMode/chartEditMode.js"
import FgChart from "../FgElements/chart.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgChartEditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
    }

    //convert from json element to jquery object 
    toJQueryObject(fgChartElementEditMode) {
        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgChartElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // chart
        let fgChart = fgChartElementEditMode.fgElement;

        // Add label   
        FgUtilityConvertor.addFgElementLabel(elPlaceholderJqObj, fgChart);

        let chartJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgChartElementEditMode)
            .attr("data-chartType", fgChart.chartType)
            .attr("data-chartDataSet", fgChart.chartDataSet)
            .attr("data-chartLabelDataField", fgChart.chartLabelDataField)
            .attr("data-parameter", fgChart.parameter)
            .attr("data-displayLegend", fgChart.displayLegend)
            .attr("data-isSmooth", fgChart.isSmooth)
            .attr("data-colorType", fgChart.colorType)
            .attr("data-pieColorName", fgChart.pieColorName)
            .attr("data-chartFillListLabel", fgChart.chartFillListLabel);
        FgCommon.setVisibilityCodeObjectToElement(chartJQueryObject, fgChart.expressionVisibilityCode);
        chartJQueryObject.append('<div class="panel-body" style="min-height: 31px;"></div>');
        elementContainerJqObj.append(chartJQueryObject);

        return elementContainerJqObj;
    }
    //convert from jquery element to json object 
    fromJQueryObject(chartElementContainer) {
        // Get fgElement 
        let chartElement = FgUtilityConvertor.getFgElChild(chartElementContainer);

        if (FgUtilityConvertor.getFgElType(chartElement) !== FgChart.getType())
            console.error("The type of this element isn't Chart for converting to fgChart.");

        let fgChart = FgChart.createChart(chartElement.attr("id"),
            FgUtilityConvertor.getFgElLabel(chartElementContainer),
            chartElement.attr("class"),
            chartElement.attr("data-chartType"),
            chartElement.attr("data-chartDataSet"),
            chartElement.attr("data-chartLabelDataField"),
            chartElement.attr("data-chartFillListLabel"),
            chartElement.attr("data-parameter"),
            chartElement.attr("data-displayLegend"),
            chartElement.attr("data-isSmooth"),
            chartElement.attr("data-colorType"),
            chartElement.attr("data-pieColorName"),
            FgCommon.getVisibilityCodeObjectFromElement(chartElement));

        let chartEditMode = FgChartEditMode.createChart(fgChart,
            chartElementContainer.attr('class'),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(chartElementContainer)
        );

        return chartEditMode;
    }

    // Fill setting pop up by TextBox attributes
    generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab, coddingTab, scriptTab) {
        // Class name
        baseSettingTab
            .append(FgCommon.createClassNameDiv_EditPopUp(element)) // class of element        
            .append(FgCommon.createLabelElementDiv_EditPopUp(type, element))  // label of element
            .append(FgCommon.createElementIdDiv_EditPopUp(element))
            .append(FgChartEditModeConvertor.createChartType_EditPopUp(element))
            .append(FgChartEditModeConvertor.createBindingFillLabelComboDiv_EditPopUp(element))
            .append(FgChartEditModeConvertor.createChartLabelDataFieldDiv_EditPopUp(element))
            .append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element))//expression Visibility Code
            .append(FgChartEditModeConvertor.createDisplayLegendFieldDiv_EditPopUp(element))//display legend
            .append(FgChartEditModeConvertor.createSmoothFieldDiv_EditPopUp(element))//is smooth
            .append(FgChartEditModeConvertor.createPieColorType_EditPopUp(element))//Pie color type
            .append(FgChartEditModeConvertor.createPieColorDataFieldDiv_EditPopUp(element))
            .append(FgChartEditModeConvertor.createPieColorDiv_EditPopUp(element));

        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);

        //bindingTab initialize
        bindingTab.append(FgChartEditModeConvertor.createBindingDataSetDiv_EditPopUp(element)); // Fill of element 
        bindingTab.append(FgCommon.createBindingVariableParamsDiv_EditPopUp(element));  //BindingVariable 
        var colsList = bindingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(bindingTab, colsList, 1);

        initCombooTree();
        jscolor.installByClassName("jscolor");

        FgChartEditModeConvertor.chartType_onChange();
    }

    // Update textbox atrributes and other properties like label and font icon
    updateElement_EditPopUp(element, type) {

        // Update class attribute of element
        FgCommon.updateCssClassAttributes_EditPopUp(element);

        // Update label of element
        FgCommon.updateLabelElement_EditPopUp(element);

        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);

        // Update binding attribute of element
        FgCommon.updateBindingAttribute_EditPopUp(element);

        //update chartType
        element.attr('data-chartType', document.getElementById(idElementEditForm.chartType).value);
        //update colorType
        element.attr('data-colorType', document.getElementById(idElementEditForm.ddlChartPieColorType).value);
        //display legend
        element.attr('data-displayLegend', document.getElementById(idElementEditForm.displayLegend).checked);
        //display legend
        element.attr('data-isSmooth', document.getElementById(idElementEditForm.chartIsSmooth).checked);
        //update chartType
        element.attr('data-chartLabelDataField', document.getElementById(idElementEditForm.chartLabelDataField).value);
        //
        element.attr('data-chartFillListLabel', document.getElementById(idElementEditForm.bindingChartFillListLabel).value);
        //Update ChartDataSet
        FgChartEditModeConvertor.updateChartDataSet(element);
        //Update Pie color
        FgChartEditModeConvertor.updateChartPieColor(element);
        // Update parameter attribute of element
        FgCommon.updateBindingParameter_EditPopUp(element);
    }

    //create a dropdown list for binding label data variable.
    static createBindingFillLabelComboDiv_EditPopUp(element) {
        let bindingFillElement = element.attr("data-chartFillListLabel");
        let elementAttribute = FgCommon.createInputControl(idElementEditForm.bindingChartFillListLabel, bindingFillElement);
        elementAttribute.attr("type", "text");
        elementAttribute.attr("data-isListVariable", "true");
        elementAttribute.attr("readonly", "readonly");
        let formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.chartBindingFillLabelComboDiv, "fa fa-text-width", null, "col-sm-6");
        formGroup.find('.input-group').append(FgCommon.createAddVariableButton(idElementEditForm.addVariableLinkForFillList, idElementEditForm.bindingChartFillListLabel));
        return formGroup;
    }

    static createChartLabelDataFieldDiv_EditPopUp(element) {
        let value = element.attr("data-chartLabelDataField");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.chartLabelDataField, value, null, null, "text-left");
        var col6 = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.chartLabelDataFieldDiv, "fa fa-css3");
        return col6;
    }

    static createChartType_EditPopUp(element) {
        var chartType = element.attr("data-chartType");
        var elementAttribute = FgCommon.createDropDownHtmlElement(idElementEditForm.chartType, chartType, true,
            [
                { text: "Bar", value: "Bar" },
                { text: "Line", value: "Line" },
                { text: "Area", value: "Area" },
                { text: "Pie", value: "Pie" },
                { text: "Radar", value: "Radar" }
            ]);
        elementAttribute.attr("type", "text");
        elementAttribute.get(0).onchange = FgChartEditModeConvertor.chartType_onChange;
        var col6 = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.chartType, "fa fa-text-width", null, "col-sm-6");
        return col6;
    }

    static createPieColorType_EditPopUp(element) {
        var colorType = element.attr("data-colorType");
        var elementAttribute = FgCommon.createDropDownHtmlElement(idElementEditForm.ddlChartPieColorType, colorType, true,
            [
                { text: lang.FG.colorType_Automatic, value: "Automatic" },
                { text: lang.FG.colorType_Field, value: "Field" },
                { text: lang.FG.colorType_List, value: "List" },
            ]);
        elementAttribute.attr("type", "text");
        elementAttribute.get(0).onchange = FgChartEditModeConvertor.colorType_onChange;
        var col6 = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.colorType, "fa fa-text-width", null, "col-sm-6");
        return col6;
    }

    //display legend
    static createDisplayLegendFieldDiv_EditPopUp(element) {
        let displayLegend = element.attr('data-displayLegend') == "true";
        let objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.displayLegendLabel, checked: displayLegend, id: idElementEditForm.displayLegend });
        let checkbox = FgCommon.createCustomOption(objCustomOption, true);

        var col6 = FgCommon.createDefaultColForPopup();
        col6.append(checkbox);
        FgCommon.addLabelToCheckBox(col6, objCustomOption);

        return col6;
    }

    //display legend
    static createSmoothFieldDiv_EditPopUp(element) {
        let isSmooth = element.attr('data-isSmooth') == "true";
        let objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.smoothLabel, checked: isSmooth, id: idElementEditForm.chartIsSmooth });
        let checkbox = FgCommon.createCustomOption(objCustomOption, true);

        var col6 = FgCommon.createDefaultColForPopup();
        col6.append(checkbox);
        FgCommon.addLabelToCheckBox(col6, objCustomOption);

        return col6;
    }

    //binding 
    static createBindingDataSetDiv_EditPopUp(element) {
        let bindingChartDataSet = element.attr("data-chartDataSet");
        let divContainer = document.createElement('div');
        divContainer.innerHTML = `<a href="javascript:;" class="btn btn-primary font-weight-bolder"  id="btnAddNewBindingRow" onclick="addBindingDataSetRow(); return false;">
 ${lang.FG.chartnewDataSet}</a>`;
        var elementAttribute = FgChartEditModeConvertor.createBimdindDataSetTableControl(idElementEditForm.tableBindingDataSet, bindingChartDataSet);
        divContainer.innerHTML += '<div class="bpms-table bpms-table-bordered  bpms-table-default mt-2"><div class="table-information table-responsive">' + elementAttribute.outerHTML + '</div></div>';
        let formGroup = FgCommon.createDefaultColForElementAttributeWithoutInputGroup_EditPopUp(divContainer, "col-sm-12");
        return formGroup;
    }

    static createBimdindDataSetTableControl(inputId, ParamValues) {
        let tblParam = document.createElement('table');
        tblParam.id = inputId;
        tblParam.className = 'table table-bordered';
        tblParam.createTHead().classList;
        let tHeadRow = tblParam.tHead.insertRow(-1);
        tHeadRow.className = 'text-center';
        tHeadRow.insertCell().innerHTML = lang.FG.chartDataSetTableDataSet;
        tHeadRow.cells[0].style.width = "30%";
        tHeadRow.insertCell().innerHTML = lang.FG.chartDataSetTableField;
        tHeadRow.insertCell().innerHTML = lang.FG.chartDataSetTableColour;
        tHeadRow.insertCell().innerHTML = lang.FG.chartDataSetTableLabel;
        tHeadRow.insertCell().innerHTML = lang.FG.chartDataSetTableOperation;
        tHeadRow.innerHTML = replaceAll(tHeadRow.innerHTML, 'td', 'th');
        tblParam.createTBody();

        if (ParamValues != null && ParamValues != '') {
            for (let i = 0; i < ParamValues.split(',').length; i++) {
                let _code = ParamValues.split(',')[i];
                if (_code != '' && _code.split(':').length == 4) {
                    let tBodiesRow = tblParam.tBodies[0].insertRow(-1);
                    tBodiesRow.className = 'text-center';

                    let variableName = _code.split(':')[0];
                    let variableField = _code.split(':')[1];
                    let color = _code.split(':')[2];
                    let label = _code.split(':')[3];

                    tBodiesRow.insertCell(0).innerHTML = `<select id="${idElementEditForm.bindingChartVariableDataSet}" name="ddlParamControls" class="form-control"></select>`;
                    FgChartEditModeConvertor.setVariableDataOption(tBodiesRow.cells[0].querySelector('#' + idElementEditForm.bindingChartVariableDataSet), variableName);
                    tBodiesRow.insertCell(1).innerHTML = `<input id="${idElementEditForm.bindingChartVariableDataSetField}" type="text" class="form-control" style="direction:ltr;" value="${variableField}" />`;
                    tBodiesRow.insertCell(2).innerHTML = `<input id="${idElementEditForm.bindingChartColorDataSet}" type="text" class="form-control jscolor" value="${color}" />`;
                    tBodiesRow.insertCell(3).innerHTML = `<input id="${idElementEditForm.bindingChartLabelDataSet}" type="text" class="form-control" style="direction:ltr;" value="${label}" />`;
                    tBodiesRow.insertCell(4).innerHTML = ` <a href="#" class="delete-row btn btn-sm btn-clean btn-icon" title="${lang.FG.delete}"><span class="svg-icon svg-icon-md"><i class="fad fa-trash-alt"></i></span></a>`;
                }
            }
        }

        return tblParam;
    }

    static addBindingDataSetRow() {
        let tblBindingDataSet = document.getElementById(idElementEditForm.tableBindingDataSet);
        let tBodiesRow = tblBindingDataSet.tBodies[0].insertRow(-1);
        tBodiesRow.className = 'text-center';

        tBodiesRow.insertCell(0).innerHTML = `<select id="${idElementEditForm.bindingChartVariableDataSet}" type="text" value="" class="form-control" ></select>`;
        tBodiesRow.insertCell(1).innerHTML = `<input id="${idElementEditForm.bindingChartVariableDataSetField}" type="text" class="form-control" style="direction:ltr;" value="" />`;
        tBodiesRow.insertCell(2).innerHTML = `<input id="${idElementEditForm.bindingChartColorDataSet}" type="text" class="form-control jscolor" value="" />`;
        tBodiesRow.insertCell(3).innerHTML = `<input id="${idElementEditForm.bindingChartLabelDataSet}" type="text" class="form-control" style="direction:ltr;" value="" />`;
        tBodiesRow.insertCell(4).innerHTML = `<a href="#" class="delete-row btn btn-sm btn-clean btn-icon btn-icon-md" title="${lang.FG.delete}"><span class="svg-icon svg-icon-md"><i class="fad fa-trash-alt"></i></span></a>`;
        FgChartEditModeConvertor.setVariableDataOption(tBodiesRow.cells[0].querySelector('#' + idElementEditForm.bindingChartVariableDataSet), '');
        jscolor.installByClassName("jscolor");

        //Setting each row's input according to chart type.
        FgChartEditModeConvertor.chartType_onChange();
    }

    static setVariableDataOption(select, value) {
        window["addVariableDataOption"]($(select), value);
        return select;
    }

    static updateChartDataSet(element) {
        let tblParam = document.getElementById(idElementEditForm.tableBindingDataSet);
        let savedData = '';
        for (let i = 1; i < tblParam.rows.length; i++) {
            let variable = tblParam.rows[i].cells[0].querySelector(`#${idElementEditForm.bindingChartVariableDataSet}`).value;
            let variableField = tblParam.rows[i].cells[1].querySelector(`#${idElementEditForm.bindingChartVariableDataSetField}`).value;
            let color = tblParam.rows[i].cells[2].querySelector('#' + idElementEditForm.bindingChartColorDataSet).value;
            let label = tblParam.rows[i].cells[3].querySelector('#' + idElementEditForm.bindingChartLabelDataSet).value;
            savedData += variable + ":" + variableField + ":" + color + ":" + label + ',';
        }
        element.attr("data-chartDataSet", savedData.trim(','));
    }

    //start:Pie Color Region
    static createPieColorDataFieldDiv_EditPopUp(element) {
        let value = element.attr("data-pieColorName");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.chartPieColorFieldName, value, null, null, "text-left");
        var col6 = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.chartPieColorFieldName, "fa fa-css3");
        return col6;
    }

    static chartType_onChange() {

        let chartType = document.getElementById(idElementEditForm.chartType).value;
        if (chartType == 'Line' || chartType == 'Area') {
            document.getElementById(idElementEditForm.chartIsSmooth).closest('.col-sm-6').style.display = '';
        }
        else {
            document.getElementById(idElementEditForm.chartIsSmooth).closest('.col-sm-6').style.display = 'none';
        }
        if (chartType == 'Pie') {
            //Add readonly attribute DataSet color and label
            document.getElementById(idElementEditForm.ddlChartPieColorType).closest('.col-sm-6').style.display = '';

            document.querySelectorAll(`#${idElementEditForm.tableBindingDataSet} tbody tr`).forEach((item) => {
                item.querySelector(`#${idElementEditForm.bindingChartColorDataSet}`).style.display = 'none';
                item.querySelector(`#${idElementEditForm.bindingChartLabelDataSet}`).style.display = 'none';
            });
        }
        else {
            document.getElementById(idElementEditForm.ddlChartPieColorType).closest('.col-sm-6').style.display = 'none';

            //Remove readonly attribute from DataSet color and label
            document.querySelectorAll(`#${idElementEditForm.tableBindingDataSet} tbody tr`).forEach((item) => {
                item.querySelector(`#${idElementEditForm.bindingChartColorDataSet}`).style.display = '';
                item.querySelector(`#${idElementEditForm.bindingChartLabelDataSet}`).style.display = '';
            });
        }
        FgChartEditModeConvertor.colorType_onChange();
    }

    static colorType_onChange() {
        let chartType = document.getElementById(idElementEditForm.chartType).value;
        let colorType = document.getElementById(idElementEditForm.ddlChartPieColorType).value;
        document.getElementById(idElementEditForm.chartPieColorFieldName).closest('.col-sm-6').style.display = 'none';
        document.getElementById(idElementEditForm.chartTablePieColor).closest('.col-sm-6').style.display = 'none';
        if (chartType == 'Pie') {
            if (colorType == 'Field') {

                document.getElementById(idElementEditForm.chartPieColorFieldName).closest('.col-sm-6').style.display = '';
            }
            if (colorType == 'List') {
                document.getElementById(idElementEditForm.chartTablePieColor).closest('.col-sm-6').style.display = '';
            }
        }
    }

    //table pie color
    static createPieColorDiv_EditPopUp(element) {
        let divContainer = document.createElement('div');
        divContainer.innerHTML = `<a href="javascript:;" class="btn btn-primary font-weight-bolder"  id="btnAddNewPieColor" return false;">
  ${lang.FG.chartNewPieChart}</a>`;
        var elementAttribute = FgChartEditModeConvertor.createPieColorTableControl(element.attr("data-pieColorName"));
        divContainer.innerHTML += '<div class="bpms-table bpms-table-bordered  bpms-table-default bpms-table-primary bpms-table-loaded mt-2"><div class="table-information table-responsive">' + elementAttribute.outerHTML + '</div></div>';
        let formGroup = FgCommon.createDefaultColForElementAttributeWithoutInputGroup_EditPopUp(divContainer, "col-sm-6");
        formGroup.get(0).querySelector('#btnAddNewPieColor').onclick = FgChartEditModeConvertor.addPieColorRow;
        return formGroup;
    }

    static createPieColorTableControl(ParamValues) {
        let tblParam = document.createElement('table');
        tblParam.id = idElementEditForm.chartTablePieColor;
        tblParam.className = 'table table-bordered';
        tblParam.createTHead();
        let tHeadRow = tblParam.tHead.insertRow(-1);
        tHeadRow.className = 'text-center';
        tHeadRow.insertCell().innerHTML = lang.FG.chartPieColorTableColour;
        tHeadRow.cells[0].style.width = "80%";
        tHeadRow.insertCell().innerHTML = lang.FG.chartPieColorTableOperation;
        tHeadRow.innerHTML = replaceAll(tHeadRow.innerHTML, 'td', 'th');
        tblParam.createTBody();

        if (ParamValues != null && ParamValues != '') {
            for (let i = 0; i < ParamValues.split(',').length; i++) {
                let color = ParamValues.split(',')[i];
                if (color != '') {
                    let tBodiesRow = tblParam.tBodies[0].insertRow(-1);
                    tBodiesRow.className = 'text-center';
                    tBodiesRow.insertCell(0).innerHTML = `<input id="${idElementEditForm.chartTableInputPieColor}" type="text" class="form-control jscolor" value="${color}" />`;
                    tBodiesRow.insertCell(1).innerHTML = ` <a href="#" class="delete-row btn btn-sm btn-clean btn-icon" title="${lang.FG.delete}"><span class="svg-icon svg-icon-md"><i class="fad fa-trash-alt"></i></span></a>`;
                }
            }
        }

        return tblParam;
    }

    static addPieColorRow() {
        let tblBindingDataSet = document.getElementById(idElementEditForm.chartTablePieColor);
        let tBodiesRow = tblBindingDataSet.tBodies[0].insertRow(-1);
        tBodiesRow.className = 'text-center';

        tBodiesRow.insertCell(0).innerHTML = `<input id="${idElementEditForm.chartTableInputPieColor}" type="text" class="form-control jscolor" value="" />`;
        tBodiesRow.insertCell(1).innerHTML = `<a href="#" class="delete-row btn btn-sm btn-clean btn-icon btn-icon-md" title="${lang.FG.delete}"><span class="svg-icon svg-icon-md"><i class="fad fa-trash-alt"></i></span></a>`;
        jscolor.installByClassName("jscolor");
    }

    static updateChartPieColor(element) {
        let tblParam = document.getElementById(idElementEditForm.chartTablePieColor);
        let chartType = document.getElementById(idElementEditForm.chartType).value;
        let colorType = document.getElementById(idElementEditForm.ddlChartPieColorType).value;
        let savedData = '';
        if (chartType == 'Pie') {
            if (colorType == 'Field') {
                savedData = document.getElementById(idElementEditForm.chartPieColorFieldName).value;
            }
            if (colorType == 'List') {
                for (let i = 1; i < tblParam.rows.length; i++) {
                    let color = tblParam.rows[i].cells[0].querySelector('input').value;
                    savedData += color + ',';
                }
            }
        }
        element.attr("data-pieColorName", savedData.trim(','));
    }
   //end:Pie Color Region
}
window["addBindingDataSetRow"] = FgChartEditModeConvertor.addBindingDataSetRow;
export default FgChartEditModeConvertor