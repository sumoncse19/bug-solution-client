// 'use client';

// import { useMutation, useQueryClient } from '@tanstack/react-query';

// import { axios, setAuthBaseURL } from '@/lib/axios';
// import type { MutationConfig } from '@/lib/react-query';

// const UPDATE_USER_URL = '/api/auth/profile/update/';

// export type UpdateUserDTO = {
//   first_name?: string;
//   last_name?: string;
//   username?: string;
//   email?: string;
//   enterprise_name?: string;
//   about_me?: string;
//   profile_image?: File;
//   language_code?: string;
//   current_password?: string;
//   new_password?: string;
//   default_team?: number;
// };

// export const updateUser = async (data: UpdateUserDTO): Promise<any> => {
//   try {
//     setAuthBaseURL();

//     const formData = new FormData();
//     Object.entries(data).forEach(([key, value]) => {
//       if (value !== undefined) {
//         formData.append(key, value instanceof File ? value : value.toString());
//       }
//     });

//     const response = await axios.patch(UPDATE_USER_URL, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('User update error:', error);
//     throw error;
//   }
// };

// type UseUpdateUserOptions = {
//   config?: MutationConfig<typeof updateUser>;
// };

// export const useUpdateUser = ({ config }: UseUpdateUserOptions = {}) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['user'] });
//     },
//     ...config,
//     mutationFn: updateUser,
//   });
// };
