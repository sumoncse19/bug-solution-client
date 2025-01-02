'use client';

import { useQuery } from '@tanstack/react-query';

import { axios, setAuthBaseURL } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { clearToken } from '@/libs/utils';

const AUTH_ME_URL = '/api/auth/profile/';

export const getUser = async (): Promise<any> => {
  try {
    setAuthBaseURL();
    const response: any = await axios.get(AUTH_ME_URL);
    return response.data;
  } catch (error) {
    clearToken();
    window.location.replace('/auth/login');
    throw error;
  }
};

type QueryFnType = typeof getUser;

type UseUserOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useUserDetails = ({ config }: UseUserOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['user'],
    queryFn: () => getUser(),
  });
};
