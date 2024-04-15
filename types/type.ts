export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type SideNavItemGroup = {
  title: string;
  menuList: SideNavItem[]
}

export interface UpdateUserData {
  name?: string;
  last_name?: string;
}

export interface ImageProps {
  id: string;
  url: string;
}

export interface UserProps {
  id: string;
  name: string;
  last_name: string;
  email: string;
  roles: string[];
  created_at: string;
  updated_at: string;
}

export interface ReportProps {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  location: string;
  department: string;
  user: UserProps;
  images: ImageProps[];}