import { useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import LabelInput from '../components/LabelInput';
import { useAuth } from '../contexts/Auth.context';
import Error from '../components/Error';
// import { useThemeColors } from '../contexts/Theme.context';

export default function Register() {
  // const { theme, oppositeTheme } = useThemeColors();
  const theme = "light";
  const oppositeTheme = "dark";
  const { error, loading, register } = useAuth();
  const navigate = useNavigate();

  const methods = useForm();
  const { getValues, handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleRegister = useCallback(
    async ({ /*name,*/ email, password }) => {
      const loggedIn = await register({/* name,*/ email, password });

      if (loggedIn) {
        navigate({
          pathname: '/',
          replace: true,
        });
      }
    },
    [register, navigate],
  );

  const validationRules = useMemo(() => ({
    // name: {
    //   required: 'Name is required',
    // },
    email: {
      required: 'Email is required',
    },
    password: {
      required: 'Password is required',
    },
    confirmPassword: {
      required: 'Password confirmation is required',
      validate: (value) => {
        const password = getValues('password');
        return password === value || 'Passwords do not match';
      },
    },
  }), [getValues]);

  return (
    <FormProvider {...methods}>
      <div className={`container bg-${theme} text-${oppositeTheme}`}>
        <form
          className='d-flex flex-column'
          onSubmit={handleSubmit(handleRegister)}
        >
          <h1>Register</h1>

          <Error error={error} />

          {/* <LabelInput
            label='Name'
            type='text'
            name='name'
            placeholder='Your Name'
            validationRules={validationRules.name}
          /> */}

          <LabelInput
            label='Email'
            type='text'
            name='email'
            placeholder='your@email.com'
            validationRules={validationRules.email}
          />

          <LabelInput
            label='Password'
            type='password'
            name='password'
            validationRules={validationRules.password}
          />

          <LabelInput
            label='Confirm password'
            type='password'
            name='confirmPassword'
            validationRules={validationRules.confirmPassword}
          />

          <div className='clearfix'>
            <div className='btn-group float-end'>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={loading}
              >
                Register
              </button>

              <button
                type='button'
                className='btn btn-light'
                onClick={handleCancel}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
        <div className='mt-3'>
          <Link replace to={"/login"}>return to login</Link>
        </div>
      </div>
    </FormProvider>
  );
}
