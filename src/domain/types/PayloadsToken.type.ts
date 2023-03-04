export type PayloadToken = {
  auth_id: string;
  user_id: string;
  access_level: number;
};

export enum PERMISSION {
  ADM = 1,
  USR = 0
}
