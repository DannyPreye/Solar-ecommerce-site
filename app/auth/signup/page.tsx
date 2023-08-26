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
        .email("Enter a valid email")
        .required("Email is required"),
    fullName: yup.string().required("Full name  is required"),
    password: yup
        .string()
        .matches(
            /[a-zA-Z0-9]{8}/,
            `Your password must be strong.
             We advise a combination of
              letters and numbers`
        )
        .min(8, "Password should be of minimum 8 charactes")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    referalCode: yup.string(),
});
const Login = () => {
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            referalCode: "",
        },
        onSubmit: async (values) => {
            try {
                const res = await axios.post("/api/user/register", {
                    ...values,
                });
            } catch (error) {}
        },
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
                            Create Account!
                        </h1>
                        <p className='text-c1c'>
                            Fill in the required information to get started.
                        </p>
                    </div>
                    <div className='grid gap-4'>
                        <InputField
                            className='w-full  '
                            id='fullName'
                            name='fullName'
                            label='Full Name'
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.fullName &&
                                Boolean(formik.errors.fullName)
                            }
                            helperText={
                                formik.touched.fullName
                                    ? formik.errors.fullName
                                    : ""
                            }
                        />

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
                            id='referalCode'
                            name='referalCode'
                            label='Referal Code'
                            value={formik.values.referalCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        <InputField
                            id='password'
                            name='password'
                            label='Password'
                            type={"password"}
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
                        <InputField
                            helperText={
                                formik.touched.confirmPassword
                                    ? formik.errors.confirmPassword
                                    : ""
                            }
                            value={formik.values.confirmPassword}
                            id='confirmPassword'
                            label='Confirm Password'
                            name='confirmPassword'
                            type={"password"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.confirmPassword &&
                                Boolean(formik.errors.confirmPassword)
                            }
                        />

                        <Button
                            className='bg-c2a capitalize font-semibold hover:bg-c2b'
                            variant='contained'
                            fullWidth
                            type='submit'
                        >
                            Sign up
                        </Button>
                        <div className='w-full grid gap-4'>
                            <p className='text-center font-semibold text-c1b'>
                                Or
                            </p>
                            <Button
                                type='submit'
                                className='bg-c4a hover:bg-c4b font-semibold capitalize w-full'
                                variant='contained'
                                endIcon={<Google />}
                            >
                                Sign up with Google
                            </Button>
                        </div>
                        <div className='flex mt-3 justify-between items-center'>
                            <span className='text-c1c text-[12px] md:text-inherit'>
                                Already registered ?
                            </span>
                            <Link className='text-c2a' href={"/auth/login"}>
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
