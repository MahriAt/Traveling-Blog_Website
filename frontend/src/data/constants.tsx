export const getAuthorSession = () => {
    const session = localStorage.getItem("authorSession");

    if (!session) {
        return false;
    }

    const data = JSON.parse(session);

    if (Date.now() > data.expiresAt) {
        localStorage.removeItem("authorSession");
        return false;
    }

    return data.isAuthenticated;
};