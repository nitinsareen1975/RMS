import detectBrowserLanguage from 'detect-browser-language'

import moment from 'moment';
import 'moment/locale/fr';
const config = {
  //defaultLanguage: 'english',
  options: [{
      languageId: 'english',
      locale: 'en',
      text: 'English',
    },
    {
      languageId: 'french',
      locale: 'fr',
      text: 'French',
    },
  ],
};

export function getCurrentLanguage(lang) {

  let userLang = "";
  if(!lang){
    userLang = localStorage.getItem("userLang");
    if(!userLang){
        let langStr = detectBrowserLanguage();
        langStr = langStr && langStr.split("-")[0];
        config.options.forEach(language => {
          if (language.locale === langStr) {
            userLang = language.languageId;
          }
        });
    }
    //console.log("lang :" + userLang);
  }
  else{
    userLang = lang;
  }
  let selecetedLanguage = config.options[0];
  config.options.forEach(language => {
    if (language.languageId === userLang) {
      selecetedLanguage = language;
    }
  });
  
  localStorage.setItem("userLang",selecetedLanguage.languageId);
  moment.locale(selecetedLanguage.locale);
  return selecetedLanguage;
}
export default config;