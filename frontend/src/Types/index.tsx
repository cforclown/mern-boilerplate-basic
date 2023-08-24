import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IUser {
  _id: string;
  username: string;
  fullname: string;
  email?: string | null;
  role: object;
  avatar?: {
    data: string;
    filename: string;
  }
}
export interface IAccessToken {
  user: IUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface IReducerActionWithPayload<T> {
  type: string,
  payload: T
}

export interface IReducerActionWithoutPayload {
  type: string;
}

export type IReducerAction<T=undefined> = T extends any ? IReducerActionWithPayload<T> : IReducerActionWithoutPayload

export type SidebarSection = 'TOP' | 'MID' | 'BOTTOM'

export interface ISidebarItem {
  label: string;
  path?: string;
  icon: IconProp;
  permissions?: Record<string, string>; // [permission]: [action]
  items?: ISidebarItem[];
  section?: SidebarSection;
}

export type ISidebarDivider = 'SIDEBAR_DIVIDER'

export interface IRouteItem {
  path: string;
  name: string;
  component?: React.LazyExoticComponent<() => JSX.Element>;
}

export const SizeBreakpointNames = [ 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl' ] as const;
export type SizeBreakpoints = typeof SizeBreakpointNames[number];

export const ColorBreakpointNames = [ 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'muted', 'white' ] as const;
export type ColorBreakpoints = typeof ColorBreakpointNames[number];
