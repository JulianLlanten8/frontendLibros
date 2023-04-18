const clearSession = () => {
    localStorage.clear();
    sessionStorage.clear();
};

const guardsRoute = (to, from, next) => {
    if (sessionStorage.getItem('token')) {
        const token = sessionStorage.getItem('token');
        const current_date = new Date();
        const expires_at = new Date(token.expires_at);
        if (current_date.getTime() > expires_at.getTime()) {
            clearSession();
            next({ name: 'login' });
        }
        next();
    } else {
        next({ name: 'login' });
    }
};

const guardsLogin = (to, from, next) => {
    if (sessionStorage.getItem('token')) {
        const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : { expires_at: '' };
        const current_date = new Date();
        const expires_at = new Date(token.expires_at);
        if (current_date.getTime() > expires_at.getTime()) {
            clearSession();
            next();
        }
        next({ name: 'semanales' });
    } else {
        next();
    }
};

const checkRole = (to, from, next) => {
    const USER = JSON.parse(sessionStorage.getItem('USER'));
    if (USER) {
        const ROLES = USER.permisos.roles;
        const ROLES_META = to.meta;
        let hasRole = false;
        for (const key in ROLES_META) {
            if (ROLES_META[key]) {
                if (ROLES.includes(key)) {
                    hasRole = true;
                }
            }
        }
        if (hasRole) {
            next();
        }
    } else {
        next({ name: 'login' });
    }
};

export { clearSession, guardsRoute, guardsLogin, checkRole };
