'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgChart extends FgElement {
    constructor(id, label, cssClass, chartType, chartDataSet, chartLabelDataField, chartFillListLabel, parameter, displayLegend, isSmooth, colorType, pieColorName, expressionVisibilityCode) {
        super(id, FgChart.getType(), cssClass, label, expressionVisibilityCode);
        this.chartLabelDataField = chartLabelDataField;//which field of dataset is label
        this.chartDataSet = chartDataSet;
        this.chartType = chartType;
        this.chartFillListLabel = chartFillListLabel;//which variable is dataset for label
        this.parameter = parameter;
        this.displayLegend = displayLegend;
        this.isSmooth = isSmooth;
        this.colorType = colorType;
        //It may be FieldName or list of color hex ot nothing in automatic type.
        this.pieColorName = pieColorName;
    }

    static createChart(id, label, cssClass, chartType, chartDataSet, chartLabelDataField, chartFillListLabel, parameter, displayLegend, isSmooth, colorType, pieColorName, expressionVisibilityCode) {
        return new FgChart(id, label, cssClass, chartType, chartDataSet, chartLabelDataField, chartFillListLabel, parameter, displayLegend, isSmooth, colorType, pieColorName, expressionVisibilityCode);
    }

    static getType() {
        return FG_ElementTypeEnum.CHART;
    }
}

export default FgChart