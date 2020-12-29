
import langEn from "./lang-en.js";
var lang = langEn;
switch (window.culture) {
    case 'en':
        lang = langEn;
        break; 
    default:
        lang = langEn;
        break;
}
 
window.BpmnIoLang = lang.BpmnIO;
export default lang;