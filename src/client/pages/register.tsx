import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import ThemeSwitch from '../components/theme-switch';
import { css } from '@emotion/react';

export default () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise(resolve => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve(null);
      }, 3000);
    });
  }

  return (
    <div css={registerPageStyle}>
      <header>
        <ThemeSwitch />
      </header>
      <form>
        <Input
          id="name"
          placeholder="用户名"
          {...register('name', {
            required: '请输入用户名',
            minLength: { value: 4, message: '请输入 6 - 12 位的用户名，不能输入特殊字符' },
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        <Button mt={4} colorScheme="teal" type="button" isLoading={isSubmitting} onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </form>
    </div>
  );
};

const registerPageStyle = css`
  header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
  }
`;
