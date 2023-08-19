"use client";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";
import Link from "next/link";
import InputField from "@/components/form/InputField";

const validationSchema = yup.object({
    email: yup
        .string()
        .email("Email is not valid")
        .required("Email is requireds"),
});
const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: () => {},
        validationSchema,
    });
    return (
        <div
            className='container mx-auto px-5 flex
             flex-col items-center my-12'
        >
            <form
                className='border-2 w-full rounded-[12px] mb-12
                    max-w-[600px] flex flex-col items-center px-5 py-[64px]'
                onSubmit={formik.handleSubmit}
            >
                <div className='w-full max-w-[400px]'>
                    <div className='mb-[30px]'>
                        <h1 className='font-bold  font-poppin text-c1a text-[32px]'>
                            Welcome Back!
                        </h1>
                        <p className='text-c1c'>
                            Welcome back. Please enter your details
                        </p>
                    </div>
                    <div className='grid gap-4'>
                        <InputField
                            className='w-full  '
                            id='email'
                            name='email'
                            label='Email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email ? formik.errors.email : ""
                            }
                        />
                        <InputField
                            className='w-full  '
                            id='password'
                            name='password'
                            label='Password'
                            type='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password
                                    ? formik.errors.password
                                    : ""
                            }
                        />
                        <div className='flex justify-end w-full'>
                            <Link
                                className=' hover:text-c2b text-c2a font-semibold'
                                href={"/auth/forgot-password"}
                            >
                                Forgot Password
                            </Link>
                        </div>
                        <Button
                            className='bg-c2a rounded-full capitalize font-semibold hover:bg-c2b'
                            variant='contained'
                            fullWidth
                            type='submit'
                        >
                            Login
                        </Button>
                        <div className='w-full grid gap-4'>
                            <p className='text-center font-semibold text-c1b'>
                                Or
                            </p>
                            <Button
                                className='bg-c4a rounded-full hover:bg-c4b font-semibold capitalize w-full'
                                variant='contained'
                                endIcon={<Google />}
                            >
                                Login with Google
                            </Button>
                        </div>
                        <div className='flex mt-3 justify-between items-center'>
                            <span className='text-c1c md:text-inherit text-[12pxs]'>
                                Don&apos;t have an account?
                            </span>
                            <Link className='text-c2a' href={"/auth/signup"}>
                                Create account
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
