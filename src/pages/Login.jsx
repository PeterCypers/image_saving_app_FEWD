import { FormProvider, useForm } from 'react-hook-form';
import LabelInput from '../components/LabelInput';
import { useCallback } from 'react';
import { useAuth } from '../contexts/Auth.context';
import { useNavigate } from 'react-router';
import Error from '../components/Error';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const validationRules = {
  email: {
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
  },
};

export default function Login() {
  const { login, error, loading, isAuthed } = useAuth();
  const navigate = useNavigate();

  //voor offline gebruik: second.user@hotmail.com -> demo user bestaat enkel in de online-versie
  const methods = useForm({
    defaultValues: {
      email: 'demo.user@hotmail.com',
      password: '12345678'
    }
  });

  const {
    reset,
    handleSubmit
  } = methods;

  const handleCancel = useCallback(() => reset(), [reset]);

  const handleLogin = useCallback(
      async ({ email, password }) => {
        const loggedIn = await login(email, password);

        if (loggedIn) {
          navigate({
            pathname: '/',
            replace: true
          });
        }
      }
    ,[login]);

  if(isAuthed){
    return <Navigate replace to={'/'} />
  }

  return (
      <FormProvider {...methods}>
        <div className='container'>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className='d-flex flex-column'>
            <h1 data-cy='login_h1'>Sign in</h1>

            <Error error={error} />
            {/* {(error) && <div  className="text-danger">{error}</div>} */}

            <LabelInput
              label='email'
              type='text'
              name='email'
              placeholder='your@email.com'
              validationRules={validationRules.email}
              data-cy='email_input'
            />

            <LabelInput
              label='password'
              type='password'
              name='password'
              validationRules={validationRules.password}
              data-cy='password_input'
            />

            <div className='clearfix'>
              <div className='btn-group float-end'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  disabled={loading}
                  data-cy='login_btn'
                >
                  Sign in
                </button>

                {/* <button
                  type='button'
                  className='btn btn-light'
                  onClick={handleCancel}
                >
                  Cancel
                </button> */}
              </div>
            </div>
          </form>
          <div className='mt-3'>
            <Link replace to={"/register"}>register new account</Link>
          </div>
        </div>
      </FormProvider>
  );
}
