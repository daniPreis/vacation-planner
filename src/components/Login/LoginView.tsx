import { useMutation } from 'react-query';
import { AuthInterface } from '../../interfaces/auth.interface';
import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '@src/components/Application';
import './LoginView.scss';
import FormField from '@src/components/Shared/FormField/FormField';
import Button from '@src/components/Shared/Button/Button';

const baseUrl = 'http://vacationplannerv2-be-dev3.eba-pisehxks.us-east-1.elasticbeanstalk.com';

const LoginView = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const mutation = useMutation((auth: AuthInterface) => {
    return axios.post<{ authToken: { tokenKey: string } }>(`${baseUrl}/auth/token`, auth);
  }, {
    onSuccess: (data) => {
      setUser({ token: data.data.authToken.tokenKey });
      navigate('/absences');
    },
  });

  const methods = useForm<AuthInterface>();

  return (
    <FormProvider {...methods} >
      <form onSubmit={methods.handleSubmit((data) => mutation.mutate(data))} className={'loginForm'}>
        <FormField name={'username'} label={'Username'} />
        <FormField name={'password'} label={'Passwort'} />
        <Button label={'Anmelden'} />
      </form>
    </FormProvider>
  );
};

export default LoginView;
