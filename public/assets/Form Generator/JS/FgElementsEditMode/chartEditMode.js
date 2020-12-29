'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js";
class FgChartEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.div, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createChart(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgChartEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }
}

export default FgChartEditMode


