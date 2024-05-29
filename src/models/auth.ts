export type RoleEnum = 'ROLE_ADMIN' | 'ROLE_CLIENT';

export type CredentialsDTO = {
  username: string;
  password: string;
  oldPassword?: string;
  newPassword?: string;
};

export type AccessTokenPayloadDTO = {
  exp: number;
  user_name: string;
  authorities: RoleEnum[];
};
