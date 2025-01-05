export const SALT = 10;
export enum Gender {
  MALE,
  FEMALE,
}
export const USERS_GENDER = {
  0: "Male",
  1: "Female",
};

export const DEFAULT_IMAGE_PATH = "/uploads/avatar.jpg";

export const DEFAULT_ADMIN_IMAGE_PATH = "/uploads/Mask group.png";

export const PASSWORD_VALIDATION =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-])/;
