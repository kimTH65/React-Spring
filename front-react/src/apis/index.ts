import { SignInRequestDto, SignUpRequestDto } from './request/auth';

const DOMAIN = 'http://localhost:4000';
const API_DOMAIN = `${DOMAIN}/api/v1`;

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const signInRequest = (requestBody: SignInRequestDto) => {
    // 여기에 로그인 요청 처리 로직 추가
};

export const signUpRequest = (requestBody: SignUpRequestDto) => {
    // 여기에 회원가입 요청 처리 로직 추가
};
``
