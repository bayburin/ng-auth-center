import { IUserToken } from './user-token.interface';

export interface ICurrentUser {
  tn: number;
  dept: number;
  fio: string;
  room: string;
  tel: string;
  email: string;
  comment: string;
  duty: string;
  status: string;
  datereg: string;
  duty_code: number;
  fio_initials: string;
  category: number;
  id_tn: number;
  login: string;
  dept_kadr: number;
  ms: number;
  tn_ms: number;
  adLogin: string;
  mail: string;
  surname: string;
  firstname: string;
  middlename: string;
  initials_family: string;
  family_with_initials: string;
  is_chief: boolean;
  token: IUserToken;
}
