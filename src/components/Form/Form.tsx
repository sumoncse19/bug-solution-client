'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { ZodType } from 'zod';

import type { FormProps } from './type';

const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown> = ZodType<unknown>,
>({
  children,
  className,
  options,
  id,
  schema,
  onDirty,
  onSubmit,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema ? zodResolver(schema) : undefined,
  });

  useEffect(() => {
    const hasDirtyFields =
      Object.keys(methods.formState.dirtyFields).length > 0;
    onDirty?.(hasDirtyFields);
  }, [methods.formState.dirtyFields, onDirty]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    return methods.handleSubmit(onSubmit)(e);
  };

  return (
    <form className={clsx(className)} onSubmit={handleSubmit} id={id}>
      {children(methods)}
    </form>
  );
};

export { Form };
