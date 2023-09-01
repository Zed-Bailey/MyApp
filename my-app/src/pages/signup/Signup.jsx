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



export function Signup() {
    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);
    const authError = useSelector(x => x.auth.error);

    useEffect(() => {
        // redirect to home if already logged in
        if (authUser) history.navigate('/home');
    }, []);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ username, email, password }) {
        return dispatch(authActions.register({username, email, password }));
    }

    return (
        <div className='flex flex-row'>
            
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <p className='text-3xl'>Signup</p>
                <hr/>

                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="username1"
                        value="Your username"
                    />
                    </div>
                    <TextInput
                    id="username1"
                    {...register('username')}
                    placeholder="Username"
                    />
                    {errors.username && <span className='text-red-600 text-sm'>{errors.username?.message}</span>}
                </div>

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
                    />
                    {errors.email && <span className='text-red-600 text-sm'>{errors.email?.message}</span>}
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
                    />
                    {errors.password && <span className='text-red-600 text-sm'>{errors.password?.message}</span>}
                </div>

                <Button type="submit">
                    {isSubmitting && <Spinner className='me-4'></Spinner>}
                    Register
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