// 'use client';

// import { getCookie } from 'cookies-next';
// import { configureAuth } from 'react-query-auth';

// import { getUser } from '@/app/api/User/getUser';
// import { login, register, signOut } from '@/components/Auth/api';
// import type { LoginDTO, RegisterDTO, SignOutDTO } from '@/components/Auth/type';

// async function registerFn(data: RegisterDTO) {
//   const response = await register(data);
//   window.location.replace('/auth/verify');
//   return response;
// }

// async function userFn() {
//   const token = getCookie('ascent_u_access_token');
//   if (token) {
//     const data = await getUser();
//     return data;
//   }
//   return null;
// }

// async function loginFn(data: LoginDTO) {
//   const response = await login(data);
//   window.location.replace('/dashboard');
//   return response;
// }
// async function logoutFn(data: unknown) {
//   const signOutData: SignOutDTO = { refresh_token: data as string };
//   const response = await signOut(signOutData);

//   window.location.replace('/auth/login');
//   return response;
// }

// const authConfig = {
//   registerFn,
//   userFn,
//   loginFn,
//   logoutFn,
// };

// export const { useUser, useLogin, useRegister, useLogout } =
//   configureAuth(authConfig);
