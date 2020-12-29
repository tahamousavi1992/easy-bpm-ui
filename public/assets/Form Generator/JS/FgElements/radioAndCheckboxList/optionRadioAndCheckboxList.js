
'use strict';

class OptionRadioAndCheckboxList {

    constructor(type, label, value, checked = false, groupName, isSwitch) {
        this.type = type;
        this.label = label;
        this.value = value;
        this.checked = checked;
        this.groupName = groupName;
        this.isSwitch = isSwitch;
    }

    static createOptionRadioAndCheckboxList(type, label, value, checked, groupName, isSwitch) {
        return new OptionRadioAndCheckboxList(type, label, value, checked, groupName, isSwitch);
    }

}

var optionRadioAndCheckboxListTypeEnum = {
    radio: 'radio',
    checkbox: 'checkbox'
};

export { OptionRadioAndCheckboxList, optionRadioAndCheckboxListTypeEnum }