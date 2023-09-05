import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import { history } from "helpers";
import { authActions } from "store/store";

import { Button, PasswordInput, TextInput, Alert } from "@mantine/core";
import { IconAlertCircle } from '@tabler/icons-react';
export function Login() {
  const dispatch = useDispatch();
  const authUser = useSelector((x) => x.auth.user);
  const authError = useSelector((x) => x.auth.error);

  useEffect(() => {
    // redirect to home if already logged in
    if (authUser) history.navigate("/home");
  }, []);

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ email, password }) {
    return dispatch(authActions.login({ email, password }));
  }

  return (
    <div className="flex flex-row justify-center">
      <div className="col">
        <h3 className="text-2xl">Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <TextInput
              placeholder="example@email.com"
              label="Email"
              withAsterisk
              required
              type="email"
              {...register("email")}
              error={errors.email ? errors.email.message : ""}
            />

            <PasswordInput
              required
              {...register("password")}
              placeholder="Password"
              label="Password"
              withAsterisk
            />


            <Button type="submit" className="bg-blue-500" loading={isSubmitting}>
              Login
            </Button>

          </div>
        </form>

        {authError && 
          <Alert icon={<IconAlertCircle size={25} />} title="Bummer!" color="red">
          {authError.message}
        </Alert>
        }
      </div>
    </div>
  );
}
