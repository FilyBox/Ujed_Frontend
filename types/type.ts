import { FetchEventResult } from "next/dist/server/web/types";

import type { JSX } from "react";

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type SideNavItemGroup = {
  title: string;
  menuList: SideNavItem[];
};

export type NavBarItemGroup = {
  key: string;
  path: string;
};

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
  role: string;
  created_at: string;
  updated_at: string;
}

export interface LocationProps {
  faculty: string;
  building: string;
  classroom: string;
}

export interface ReportProps {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  location: LocationProps;
  department: string;
  user: UserProps;
  images: ImageProps[];
}

export interface ReportPropsTable {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  department: string;
}

export interface Table2Props {
  reports: ReportPropsTable[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onDataChange?: () => void;
}

export interface ListProps {
  reports: ReportProps[];
  onDataChange?: () => void;
}
