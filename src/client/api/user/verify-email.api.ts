import { request } from '..';

interface VerifyEmailParams {
  accessToken: string;
}

export function apiVerifyEmail(data: VerifyEmailParams) {
  return request('post', `/auth/verify-email?accessToken=${data.accessToken}`);
}

export function apiSendVerifyEmail() {
  return request('post', `/auth/send-verify-email`);
}
