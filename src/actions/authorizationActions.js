export const AUTHORIZATION = 'AUTHORIZATION';

export const authorization = (userName, userSocialActivity) => ({
    type: AUTHORIZATION,
    userName, userSocialActivity
});