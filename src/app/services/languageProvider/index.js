import Enlang from './entries/en-US';
import Frlang from './entries/fr_FR';
import { addLocaleData } from 'react-intl';

const AppLocale = {
  en: Enlang,
  fr: Frlang
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.fr.data);

export default AppLocale;
