
'use strict';
import AbstractConvertorFactory from "./abstractConvertorFactory.js"
import FgElementContainerConvertor from "./elementContainerConvertor.js"
import FgElementEditModeFactory from "../FgElementsEditMode/elementEditModeFactory.js"
import { FgElement, FG_ElementTypeEnum } from "../FgElements/fgElement.js";



class ElementEditModeConvertor extends AbstractConvertorFactory {

    constructor() {
        super();
        this.ContainerConvertor = new FgElementContainerConvertor();
    }

    toFgElementJson(fgElementEditMode) {
        return JSON.stringify(fgElementEditMode.fgElement);
    }

    fromFgElementJson(fgElementJson) {       

        // Parse json into fgElement
        let fgElement = JSON.parse(fgElementJson);
        let fgElementEditMode;

        if (fgElement.type === FG_ElementTypeEnum.COLUMN) {
            fgElementEditMode = FgElementEditModeFactory.toCreateByType(fgElement.type)(fgElement, fgElement.cssClass);
        }
        else {
            // Get new instance by fgElement
            fgElementEditMode = FgElementEditModeFactory.toCreateByType(fgElement.type)(fgElement);
        }
        //return new FgElementEditModeFactory().toCreate(fgElement);

        return fgElementEditMode;
    }

    toJQueryObject(fgElement) {
    }

    fromJQueryObject(jQueryElement) {
    }

}

export { ElementEditModeConvertor, FgElementContainerConvertor }