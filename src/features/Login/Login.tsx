import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {loginTC} from "./auth-reducer";
import {Navigate} from "react-router-dom";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}


export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: values => {
            const errors: FormikErrorType = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password.length) {
                errors.password = 'Password Required'
            } else if (values.password.length < 5) {
                errors.password = 'Must be more 4 symbols'
            }

            console.log('values ', values)
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    });

    if(isLoggedIn){
        return <Navigate to={'/'}/>
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To log in get registered
                            <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                                here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>

                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                error={!!formik.touched.email && !!formik.errors.email}
                                // name="email"
                                // onChange={formik.handleChange}
                                // value={formik.values.email}
                                // onBlur={formik.handleBlur}
                                {...formik.getFieldProps('email')}
                            />

                            {formik.touched.email && formik.errors.email &&
                                <div style={{color: "red"}}>{formik.errors.email}</div>}

                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                error={!!formik.touched.password && !!formik.errors.password}
                                // name="password"
                                // onChange={formik.handleChange}
                                // value={formik.values.password}
                                // onBlur={formik.handleBlur}
                                {...formik.getFieldProps('password')}
                            />

                            {formik.touched.password && formik.errors.password &&
                                <div style={{color: "red"}}>{formik.errors.password}</div>}

                            <FormControlLabel
                                label={'Remember me'}
                                control={
                                    <Checkbox
                                        onChange={formik.handleChange}
                                        checked={formik.values.rememberMe}
                                        name={'rememberMe'}
                                    />}

                            />

                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </form>

                </FormControl>
            </Grid>
        </Grid>
    )
}