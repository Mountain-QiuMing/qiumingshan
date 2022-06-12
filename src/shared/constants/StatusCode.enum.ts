export enum StatusCode {
  /** 系统繁忙 */
  TIMEOUT = -1,
  /** 成功 */
  SUCCESS = 0,

  /** 无此用户 */
  INVALID_USER = 10000,

  /** 用户信息已失效 */
  NO_USER = 10001,

  /** 参数格式有误 */
  INVALID_PARAMETER = 10002,
}