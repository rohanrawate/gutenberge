import { AppConfigGlobal } from './types/app-config.type';

const gutenbergeBaseUrl = 'http://skunkworks.ignitesol.com:8000';

export const config: AppConfigGlobal = {
    api: {
        getBooks: {
            url: `${gutenbergeBaseUrl}/books`,
        },
    }
};
