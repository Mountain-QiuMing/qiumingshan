import { useForm } from 'react-hook-form';
import { FormErrorMessage, Input, Button, FormControl, Text, Link } from '@chakra-ui/react';
import ThemeSwitch from '@/components/theme-switch';
import { css } from '@emotion/react';
import { Register } from 'shared/interface/user/register.interface';
import Bg from 'assets/images/bg.webp';
import { apiRegister } from '@/api/user/register.api';
import NextLink from 'next/link';
import { toast } from '@/utils/toast';

const defaultValues: Register = {
  email: '123456',
  username: '123456',
  password: '123456',
};

export default () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Register>({ defaultValues: defaultValues });

  const onSubmit = handleSubmit(async value => {
    const res = await apiRegister(value);
    if (res.status) {
      toast.success('注册成功，您现在可以去登录了');
    }
  });

  return (
    <div css={registerPageStyle}>
      <header>
        <ThemeSwitch />
      </header>
      <form>
        <Text fontSize="4xl" align="center">
          秋名山
        </Text>
        <FormControl mt={6} isInvalid={!!errors.email}>
          <Input
            id="email"
            placeholder="邮箱"
            {...register('email', {
              required: '请输入邮箱',
            })}
          />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={!!errors.username}>
          <Input
            id="username"
            placeholder="用户名"
            {...register('username', {
              required: '请输入用户名',
              minLength: { value: 4, message: '请输入 6 - 12 位的用户名，不能输入特殊字符' },
            })}
          />
          <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={!!errors.password}>
          <Input
            id="password"
            placeholder="密码"
            {...register('password', {
              required: '请输入密码',
              minLength: { value: 4, message: '请输入 6 - 12 位的用户名，不能输入特殊字符' },
            })}
          />
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>
        <Button mt={6} type="button" isLoading={isSubmitting} onClick={onSubmit} width="100%">
          注册
        </Button>
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <Link as={NextLink} href="/login">
            已有账号？去登录
          </Link>
        </div>
      </form>
    </div>
  );
};

const registerPageStyle = css`
  height: 100vh;
  width: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-image: url(${Bg.src});
  background-size: cover;
  background-position: center center;
  color: #ffffff;
  header {
    position: absolute;
    width: 100%;
    align-self: flex-start;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
  }
  form {
    width: 350px;
    padding: 30px 20px 40px;
    border-radius: 2px;
    margin-top: -100px;
    background: linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%);
  }
`;
