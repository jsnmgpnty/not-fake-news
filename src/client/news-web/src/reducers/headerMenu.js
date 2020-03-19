import {
  IS_NAV_MENU_OPEN,
} from '../actions/headerMenu';

const initialState = {
  isNavMenuOpen: false,
};

const headerMenu = (state = initialState, action) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case IS_NAV_MENU_OPEN:
      return { ...state, isNavMenuOpen: action.payload };
    default:
      return state;
  }
};

export default headerMenu;
