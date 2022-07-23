import { Types } from '../constants/language-types';
import config, {
    getCurrentLanguage
  } from "../../services/languageProvider/switcher/config";
const initialState = {
    language: getCurrentLanguage()
};
export default function languageReducer(state = initialState, action) {
    switch (action.type) {
        case Types.CHANGE_LANGUAGE:
            return {...state, language: action.payload}
        default:
            return state;
    }
}