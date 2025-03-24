interface Labels {
    username: string;
    password: string;
    realm: string;
    login: string;
    loadingRealms: string;
    selectRealm: string;
    dashboard: string;
    loginError: string;
    vmList: string;
    ctList: string;
    status: string;
    name: string;
    cpuUsage: string;
    node: string;
    memoryUsage: string;
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
        loginError: 'Login failed',
        vmList: 'VM List',
        ctList: 'CT List',
        status: 'Status',
        name: 'Name',
        node: 'Node',
        cpuUsage: 'CPU Usage',
        memoryUsage: 'Memory Usage',
    },
    ja: {
        username: 'ユーザー名',
        password: 'パスワード',
        realm: 'レルム',
        login: 'ログイン',
        loadingRealms: 'レルムを読み込んでいます...',
        selectRealm: 'レルムを選択してください',
        dashboard: 'ダッシュボード',
        loginError: 'ログインに失敗しました',
        vmList: 'VMリスト',
        ctList: 'CTリスト',
        status: 'ステータス',
        name: '名前',
        node: 'ノード',
        cpuUsage: 'CPU使用率',
        memoryUsage: 'メモリ使用量',
    },
    tw: {
        username: '用戶名',
        password: '密碼',
        realm: '領域',
        login: '登錄',
        loadingRealms: '正在加載領域...',
        selectRealm: '請選擇一個領域',
        dashboard: '儀表板',
        loginError: '登錄失敗',
        vmList: 'VM列表',
        ctList: 'CT列表',
        status: '狀態',
        name: '名稱',
        node: '節點',
        cpuUsage: 'CPU使用率',
        memoryUsage: '內存使用量',
    },
};

export const getLabels = (language: string): Labels => {
    const browserLanguage = language.split('-')[0]
    return labels[browserLanguage] || labels.en;
};
