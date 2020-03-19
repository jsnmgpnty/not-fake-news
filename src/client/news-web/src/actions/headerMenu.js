export const IS_NAV_MENU_OPEN = 'IS_NAV_MENU_OPEN';

const toggleNavMenu = (payload) => ({ type: IS_NAV_MENU_OPEN, payload });

export {
  toggleNavMenu,
};
