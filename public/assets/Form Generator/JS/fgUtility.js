
class FgUtility {

    //
    static getJqueryObjectByTagName(tagName) {
        return $(document.createElement(tagName));
    }
    // omit Keys in JSON.stringify that don't have value
    static replacer(key, value) {
        if (value == "") return undefined;
        else return value;
    }
}

export default FgUtility
