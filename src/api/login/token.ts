

export function getToken() {
    return 'Bearer ' + localStorage.getItem("token") || '';
}
