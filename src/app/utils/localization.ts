interface Labels {
    username: string;
    password: string;
    realm: string;
    login: string;
    loadingRealms: string;
    selectRealm: string;
    dashboard: string;
}

const labels: { [key: string]: Labels } = {
    en: {
        username: 'Username',
        password: 'Password',
        realm: 'Realm',
        login: 'Login',
        loadingRealms: 'Loading realms...',
        selectRealm: 'Select a realm',
        dashboard: 'Dashboard',
    },
    ja: {
        username: 'ユーザー名',
        password: 'パスワード',
        realm: 'レルム',
        login: 'ログイン',
        loadingRealms: 'レルムを読み込んでいます...',
        selectRealm: 'レルムを選択してください',
        dashboard: 'ダッシュボード',
    },
    tw: {
        username: '用戶名',
        password: '密碼',
        realm: '領域',
        login: '登錄',
        loadingRealms: '正在加載領域...',
        selectRealm: '請選擇一個領域',
        dashboard: '儀表板',
    },
};

export const getLabels = (language: string): Labels => {
    const browserLanguage = language.split('-')[0]
    return labels[browserLanguage] || labels.en;
};
