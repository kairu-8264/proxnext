interface Labels {
    username: string;
    password: string;
    realm: string;
    login: string;
    loadingRealms: string;
    selectRealm: string;
}

const labels: { [key: string]: Labels } = {
    en: {
        username: 'Username',
        password: 'Password',
        realm: 'Realm',
        login: 'Login',
        loadingRealms: 'Loading realms...',
        selectRealm: 'Select a realm',
    },
    ja: {
        username: 'ユーザー名',
        password: 'パスワード',
        realm: 'レルム',
        login: 'ログイン',
        loadingRealms: 'レルムを読み込んでいます...',
        selectRealm: 'レルムを選択してください',
    }
};

export const getLabels = (language: string): Labels => {
    const browserLanguage = language.split('-')[0]
    return labels[browserLanguage] || labels.en;
};
