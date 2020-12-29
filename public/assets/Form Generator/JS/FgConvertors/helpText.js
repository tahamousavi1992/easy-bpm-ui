
'use strict';

class HelpText {

    constructor(helpMessageText) {
        this.helpMessageText = helpMessageText;
    }

    static createHelperText(helpMessageText) {
        return new HelpText(helpMessageText);
    }

}

export default HelpText