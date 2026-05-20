export const USER_ROLES = {
  CONTRIBUTOR: "contributor",
  MAINTAINER: "maintainer",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}
