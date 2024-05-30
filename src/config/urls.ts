import { URL } from "url";

const MEMBERS_AREA_URL = "https://tiomarkets-ma-staging.vercel.app/";
const PIX_MEMBERS_AREA_URL = "https://primeindex-ma-staging.vercel.app/";

// TIO Members area URLs
export const TIO_MA_DEPOSITS_PAGE = new URL(
  "/funds",
  MEMBERS_AREA_URL
).toString();

export const TIO_MA_RESET_PASSWORD_PAGE = (resetPasswordToken: string) =>
  new URL(
    `/reset-password?token=${resetPasswordToken}`,
    MEMBERS_AREA_URL
  ).toString();

export const TIO_MA_VERIFY_EMAIL_PAGE = (verifyEmailToken: string) =>
  new URL(
    `/verify-email?emailVerificationToken=${verifyEmailToken}`,
    MEMBERS_AREA_URL
  ).toString();

export const TIO_MA_OPEN_LIVE_ACCOUNT_PAGE = new URL(
  "/myaccount?tab=open-live",
  MEMBERS_AREA_URL
).toString();

export const TIO_DOWNLOAD_PLATFORM_PAGE = new URL(
  "/download-center",
  MEMBERS_AREA_URL
).toString();

// PIX Members area URLs
export const PIX_MA_DEPOSITS_PAGE = new URL(
  "/deposits",
  PIX_MEMBERS_AREA_URL
).toString();

export const PIX_MA_RESET_PASSWORD_PAGE = (resetPasswordToken: string) =>
  new URL(
    `/reset-password?token=${resetPasswordToken}`,
    PIX_MEMBERS_AREA_URL
  ).toString();
export const PIX_MA_VERIFY_EMAIL_PAGE = (verifyEmailToken: string) =>
  new URL(
    `/verify-email?emailVerificationToken=${verifyEmailToken}`,
    PIX_MEMBERS_AREA_URL
  ).toString();

export const PIX_MA_OPEN_LIVE_ACCOUNT_PAGE = new URL(
  "/myaccount",
  PIX_MEMBERS_AREA_URL
).toString();

export const PIX_DOWNLOAD_PLATFORM_PAGE = new URL(
  "/download-center",
  PIX_MEMBERS_AREA_URL
).toString();