
class InputGroup {
    constructor(fontIconCssClass, element) {
        this.fontIconCssClass = fontIconCssClass;
        this.element = element;
    }

    static createInputGroup(fontIconCssClass, element) {
        return new InputGroup(fontIconCssClass, element);
    }
}

export default InputGroup