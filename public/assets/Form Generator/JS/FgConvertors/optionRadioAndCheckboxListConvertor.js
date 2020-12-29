
'use strict';
import AbstractConvertorFactory from "./abstractConvertorFactory.js"
import { OptionRadioAndCheckboxList, optionRadioAndCheckboxListTypeEnum } from "../FgElements/radioAndCheckboxList/optionRadioAndCheckboxList.js"

class OptionRadioAndCheckboxListConvertor extends AbstractConvertorFactory {

    toJQueryObject(optionRadioAndCheckboxListElement) {

        let input = $(document.createElement('input')).val(optionRadioAndCheckboxListElement.value).prop("checked", optionRadioAndCheckboxListElement.checked);      

        var optionlabel = $(document.createElement("label"))
            .append(input)
            .append($(document.createElement('span')))
            .append(optionRadioAndCheckboxListElement.label);


        switch (optionRadioAndCheckboxListElement.type) {
            case optionRadioAndCheckboxListTypeEnum.radio:
                optionlabel.addClass("radio");
                input.attr("type", "radio");
                input.attr("name", optionRadioAndCheckboxListElement.groupName);
                break;
            case optionRadioAndCheckboxListTypeEnum.checkbox:
                input.attr("type", "checkbox");
                if (optionRadioAndCheckboxListElement.isSwitch)
                    optionlabel.addClass("switch");
                else
                    optionlabel.addClass("checkbox");
                break;
        }

        return optionlabel;
    }

    fromJQueryObject(jQueryElement) {
        let input = jQueryElement.find('input');
        let label = input.closest('label');
        return OptionRadioAndCheckboxList.createOptionRadioAndCheckboxList(input.attr('type'), jQueryElement.text(), input.val(), input.is(":checked"), input.attr('name'), label.hasClass('switch'));
    }

}

export default OptionRadioAndCheckboxListConvertor