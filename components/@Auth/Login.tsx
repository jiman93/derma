import { wrapper } from '../../store/store';
import { withSessionSsr } from '../../../lib/session';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { emptyLayout } from '../../store/pageConfigSlice';

import React from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  LoadingOverlay,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { LoginBody } from '../../definitions/Auth';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const selector = useSelector((state) => state) as any;

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      // username: 'hafiz.zaini',
      // password: 'HFch!lli#$',
    },

    // validate: {
    //   username: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });

  const handleSubmit = () => {
    // console.log('values', form.values);
  };

  const handleForgotPassword = () => {
    console.log('selector', selector);
    console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    console.log('process.env.CLIENT_API_URL', process.env.CLIENT_API_URL);
    console.log('process.env.API_URL', process.env.API_URL);
  };

  return (
    <>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Sign In
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Your Email / Username"
              placeholder="Email / Username"
              required
              {...form.getInputProps('username')}
            />
            <PasswordInput
              label="Enter Password"
              placeholder="Password"
              required
              mt="md"
              {...form.getInputProps('password')}
            />
            <Group position="apart" mt="md">
              <Checkbox label="Remember me" />
              <Anchor<'a'>
                onClick={(event) => {
                  event.preventDefault();
                  handleForgotPassword();
                }}
                href="#"
                size="sm"
              >
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export const getServerSideProps = withSessionSsr(
  wrapper.getServerSideProps((store) => async ({ req }) => {
    store.dispatch(emptyLayout());
    req.session.destroy();

    return {
      props: {},
    };
  })
);

export default LoginPage;
