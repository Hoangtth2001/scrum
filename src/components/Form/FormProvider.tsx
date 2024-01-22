import React from 'react';
import {
  FieldValues,
  FormProvider as RHFProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';

type Props<T extends FieldValues> = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  form?: UseFormProps<T>;
  formReturn?: UseFormReturn<T>;
  onSubmit?: SubmitHandler<T>;
  children: React.ReactElement | React.ReactElement[];
  formReset?: T;
};

const FormProvider = <T extends FieldValues>(props: Props<T>): React.ReactNode => {
  const { children, onSubmit, form, formReset, formReturn, ...other } = props;

  const formInitial = useForm<T>({ ...form, mode: 'all' });

  const methods = formReturn ? { ...formReturn } : formInitial;

  React.useEffect(() => {
    methods.reset(formReset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formReset]);

  return (
    <RHFProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit!)} {...other}>
        {React.Children.map(children, child => {
          return child?.props?.name
            ? React.createElement<T>(child.type, {
                key: child.props.name,
                ...methods.register,
                ...child.props,
              })
            : child;
        })}
      </form>
    </RHFProvider>
  );
};

export default FormProvider;
