
export function getToken() {
    return localStorage.getItem("token") || '';
}

export function setToken(token?: string | null) {
    if (token) {
        localStorage.setItem('token', 'Bearer ' + token);
    }
    else {
        localStorage.removeItem('token');
    }
}

export function getUserName() {
    return localStorage.getItem("userName");
}

export function setUserName(userName?: string | null) {
    if (userName) {
        localStorage.setItem('userName', userName);
    }
    else {
        localStorage.removeItem('userName');
    }
}

export function getRole() {
    return localStorage.getItem("role");
}

export function setRole(role?: string | null) {
    if (role) {
        localStorage.setItem('role', role);
    }
    else {
        localStorage.removeItem('role');
    }
}

export function RoleToInt(role: string | undefined) {
    switch (role) {
        case 'user':
            return 0;
        case 'tech':
            return 1;
        case 'admin':
            return 2;
        default:
            return -1;
    }
}