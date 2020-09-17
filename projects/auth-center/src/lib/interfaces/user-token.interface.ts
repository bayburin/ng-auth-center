export interface IUserToken {
  tokenType: string;
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
}
