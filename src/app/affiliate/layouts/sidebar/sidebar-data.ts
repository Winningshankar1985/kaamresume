import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/affiliate_area/dashboard',
  },
  {
    navCap: 'Ui Components',
  },
  {
    displayName: 'Badge',
    iconName: 'archive',
    route: '/affiliate_area/ui-components/badge',
  },
  {
    displayName: 'Chips',
    iconName: 'info-circle',
    route: '/affiliate_area/ui-components/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'list-details',
    route: '/affiliate_area/ui-components/lists',
  },
  {
    displayName: 'Menu',
    iconName: 'file-text',
    route: '/affiliate_area/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'file-text-ai',
    route: '/affiliate_area/ui-components/tooltips',
  },
  {
    displayName: 'Forms',
    iconName: 'clipboard-text',
    route: '/affiliate_area/ui-components/forms',
  },
  {
    displayName: 'Tables',
    iconName: 'table',
    route: '/affiliate_area/ui-components/tables',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'login',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'brand-dribbble',
    route: '/extra/sample-page',
  },
];
