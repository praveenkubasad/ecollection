module.exports = Object.freeze({
  UNAUTHORIZED: "Unauthorized",
  SPECIFY_VALID_TOKEN: "Please specify valid token",
  SPECIFY_VALID_HEADER: "Please specify valid auth header",
  FAILED: "failed",
  OTP_ALREADY_SENT:
    "We've already sent an OTP to the registered email, please try resend endpoint to get a new OTP.",
  ACCESS_TOKEN_EXPIRED: "Access token expired",
  INVALID_AUTH_TYPE: "Unsupported type of authentication",
  INVALID_PASSWORD:
    "Password should have 1 uppercase letter, 1 special character, 1 number, 1 lowercase letter",
  EMAIL_IN_USE: "Email already in use",
  REGISTER_FAILED: "Failed to register",
  USER_NOT_EXISTS: "User doesn't exists",
  TRY_LATER: "please try later",
  INVALID_EMAIL_PASSWORD: "Email or password is invalid",
  INCORRECT_PASSWORD: "You have entered an incorrect password",
  INVALID_TOKEN: "Invalid/malformed token",
  INVALID_EXPIRED_VERIFY_TOKEN: "Verification token expired/invalid",
  UNABLE_TO_VERIFY: "Failed to verify your account",
  ACCOUNT_ALREADY_VERIFIED: "Account already verified",
  OLD_PASSWORD_IS_SAME: "Old password can not be new password",
  PASSWORD_CHANGE_FAILED: "Failed to change your password",
  INVALID_EXPIRED_OTP: "OTP is invalid/expired, please request for new OTP",
  TOKEN_REFRESH_FAILED: "Failed to refresh tokens",
  INVALID_MALFORMED_REFRESH_TOKEN: "Invalid/malformed refresh token",
  ACC_DELETE_FAILED: "Failed to deleted your account",
  FETCH_USERS_FAILED: "Failed to fetch users",
  FETCH_ADMINS_FAILED: "Failed to fetch admins",
  FACEBOOK_LOGIN_FAILED: "Failed to login with Facebook",
  FACEBOOK_GOOGLE_FAILED: "Failed to login with Google",
  USER_ACCESS_ALREADY: "User already has access",
  ACCESS_DISABLE_FAILED: "Failed to disable user access",
  ACCESS_ENABLE_FAILED: "Failed to enable user access",
  FB_REGISTER_FAILED: "Failed to register with Facebook",
  GOOGLE_REGISTER_FAILED: "Failed to register with Google",
  EMAIL_IN_USE_BY_OTHER_PROVIDER: "Email is used by other type of signin",
  ACCOUNT_NOT_VERIFIED:
    "Account not verified, please check your email and verify your account",
  ACC_DISABLED:
    "Your account has been disabled access for suspicious activity, please contact support for more information",
  LOGIN_NOT_ALLOWED: "You are not allowed to login here",
  ACC_UNDER_REVIEW:
    "Your account is under review, please contact support for more information.",
  LOGIN_FAILED: "Login failed",
  SESSION_EXPIRED: "Session expired, please login",
  OAUTH_LOGIN_FAILED: "Failed to get data from oauth server",
  OAUTH_TOKEN_REFRESH_ERROR: "Failed to refresh token, oauth server error",
  OPERATION_NOT_PERMITTED: "You are not permitted to perform this operation",
  ACC_VERIFICATION_PENDING_BY_TEAM:
    "Your account is not verified by our team, please contact support for more information",
  PASSWORD_DOES_NOT_CONTAIN_NUMBER: "password must contain at least one number",
  PASSWORD_DOES_NOT_CONTAIN_LOWERCASE:
    "password must contain at least one lowercase letter",
  PASSWORD_DOES_NOT_CONTAIN_UPPERCASE:
    "password must contain at least one uppercase letter",
  PASSWORD_DOES_NOT_CONTAIN_SPECIAL_CHAR:
    "password must contain at least one special character",
  USER_DATA_UPDATE_FAILED: "Failed to update user data",
  INTERNAL_SERVER_ERROR: "Internal server error",
  INVALID_USERNAME: "Invalid username",
  USERNAME_IN_USE: "Username taken",
  USER_EXISTS: "User already exists, Please use different mobile number",
  ACCOUNT_DOES_NOT_EXIST: "Account Does not exists, please provide valid data",
  //INTERNAL_SERVER_ERROR:"something went wrong, Please try after some time"
  Not_AUTHORIZED_ERROR: "Not authorized error"
});
