export const getCommonActionsTypeByName = (name: String) => ({
    loginState: `${name}/LOGIN`,
    firstFetch: `${name}/FIRST_FETCH`,
    create: `${name}/CREATE`,
    update: `${name}/UPDATE`,
    delete: `${name}/DELETE`,
    changePage: `${name}/CHANGE_PAGE`,
});
