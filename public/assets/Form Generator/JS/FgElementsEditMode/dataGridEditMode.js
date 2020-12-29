
'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js"
class FgDataGridEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.table, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createDataGrid(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgDataGridEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgDataGridEditMode