import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from 'helpers';
import { authActions } from 'store/store';


import { Button, Input, Spinner } from '@nextui-org/react';

export function Login() {
    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);
    const authError = useSelector(x => x.auth.error);

    useEffect(() => {
        // redirect to home if already logged in
        if (authUser) history.navigate('/home');
    }, []);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ email, password }) {
        return dispatch(authActions.login({ email, password }));
    }


    return (
        <div className='flex flex-row justify-center'>
            <div className='col'>
                <h3 className='text-2xl'>Login</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-5'>
                        <Input
                            required
                            type="email" label="Email" placeholder="Enter your email" {...register('email')}
                            validationState={errors.email ? "invalid" : ""}
                            errorMessage={errors.email ? errors.email.message : ""}
                        />
                        <Input
                            required
                            {...register('password')}
                            label="Password"
                            type="password"
                            placeholder='Password'

                        />
                        <Button type='submit' spinner={spinner()} isLoading={isSubmitting} >Login</Button>
                    </div>
                </form>

                {/* {authError &&
                      <Alert
                      color="failure"
                      icon={HiInformationCircle}
                    >
                      <span>
                        <p>
                          <span className="font-medium me-2">
                            Error!
                          </span>
                           {authError.message}
                        </p>
                      </span>
                    </Alert>
                } */}
            </div>
        </div>
    );


}

// https://nextui.org/docs/components/button#loading
function spinner() {
    return(
        <svg
        className="animate-spin h-5 w-5 text-current"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="currentColor"
        />
      </svg>
    );
}

/*
return (
        <div className='flex flex-row justify-center'>
            
            <form className="flex flex-col gap-4 w-lg-1/4" onSubmit={handleSubmit(onSubmit)}>
                <p className='text-3xl'>Login</p>
                <hr/>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="email1"
                        value="Your email"
                    />
                    </div>
                    <TextInput
                
                    id="email1"
                    {...register('email')}
                    placeholder="example@email.com"
                    type="email"
                    helperText={errors.email?.message}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="password1"
                        value="Your password"
                    />
                    </div>
                    <TextInput
                    {...register('password')}
                    id="password1"
                    type="password"
                    helperText={errors.password?.message}
                    />
                </div>

                <Button type="submit">
                    {isSubmitting && <Spinner className='me-4'></Spinner>}
                    Login
                </Button>

                {authError &&
                      <Alert
                      color="failure"
                      icon={HiInformationCircle}
                    >
                      <span>
                        <p>
                          <span className="font-medium me-2">
                            Error!
                          </span>
                           {authError.message}
                        </p>
                      </span>
                    </Alert>
                }
            </form>

            
        </div>
    )
*/