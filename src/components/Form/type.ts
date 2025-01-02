import type React from 'react';
import type {
  FieldValues,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';

interface FormProps<TFormValues extends FieldValues, Schema> {
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  schema?: Schema;
  className?: string;
  id?: string;
  onDirty?: (isDirty: boolean) => void;
  onSubmit: SubmitHandler<TFormValues>;
}

export type { FormProps };
