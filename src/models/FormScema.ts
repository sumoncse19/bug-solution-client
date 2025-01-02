import { z } from 'zod';

// Utility function to get image dimensions
const getImageDimensions = (
  file: File,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const { width, height } = img;
      URL.revokeObjectURL(img.src); // Free up memory
      resolve({ width, height });
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
};

// Validation schema for user information
export const userInfoSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    currentPassword: z.string(),
    // .min(12, 'Confirm your current password before setting a new one.'),
    newPassword: z
      .string()
      .min(12, 'Enter your new password. 12 characters minimum'),
    confirmPassword: z
      .string()
      .min(12, 'Password must be at least 12 characters minimum'),
    image: z
      .custom<File>(
        (file) => file && ['image/png', 'image/jpeg'].includes(file.type),
        {
          message: 'Only PNG and JPEG files are allowed',
        },
      )
      .refine(
        async (file) => {
          if (!file) return false;
          const { width, height } = await getImageDimensions(file);
          return width >= 400 && height >= 400;
        },
        {
          message: 'Minimum resolution is 400x400',
        },
      ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'Current password cannot be the same as the new password',
    path: ['newPassword'],
  });
// .refine((data) => data.currentPassword.length < 0, {
//   message: 'Confirm your current password before setting a new one.',
//   path: ['currentPassword'],
// });

export type UserInfoDataType = z.infer<typeof userInfoSchema>;
