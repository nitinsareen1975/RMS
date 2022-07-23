import { Types } from '../constants/language-types';
import {
    getCurrentLanguage
  } from "../../services/languageProvider/switcher/config"
export function changeLanguage(language) {
    return async function(dispatch, getState) {
		try {
            var lang = getCurrentLanguage(language);
			dispatch({ type: Types.CHANGE_LANGUAGE, payload: lang });
		} catch (e) {
			// TODO: handle error
		}
	};
}