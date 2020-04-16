import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { getLanguage } from '@/utils/cookies';
import enLocale from './en';
import zhLocale from './zh';
Vue.use(VueI18n);
const messages = {
    en: {
        ...enLocale
    },
    zh: {
        ...zhLocale
    }
};
export const getLocale = () => {
    const cookieLanguage = getLanguage();
    if (cookieLanguage) {
        return cookieLanguage;
    }
    return 'en';
};
const i18n = new VueI18n({
    locale: getLocale(),
    messages
});
export default i18n;
//# sourceMappingURL=index.js.map