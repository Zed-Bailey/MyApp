import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from 'helpers';
import { authActions } from 'store/store';

import { Button, Label, TextInput } from 'flowbite-react';

import { Spinner } from 'flowbite-react';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

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
    
}
