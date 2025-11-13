export interface NavLink {
  name: string;
  description: string;
  icon: string;
  route: string;
  permission?: string[];
  type: 'header' | 'item';
  children?: NavLink[];
  color?: string | undefined;
}

export interface NavSectionTitle {
  heading: string;
}

export interface NavGroup {
  name: string;
  description: string;
  icon: string;
  route: string;
  permission?: string[];
  type: 'header' | 'item';
  children?: MenuItem[];
  color?: string | undefined;
}

export declare type NavMenuItems = (NavLink | NavGroup | NavSectionTitle)[];
