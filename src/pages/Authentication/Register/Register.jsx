import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { AuthContext } from '../../../Contexts/AutoContext/AuthContext';
import UseAuth from '../../../hooks/UseAuth';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {

    const { createUser } = UseAuth();


    const { register, handleSubmit, formState: { errors } } = useForm();



    const onSubmit = data => {
        createUser(data.email, data.password)
            .then((user) => {
                console.log('user created', user);

            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="card  w-full max-w-sm shrink-0 ">
            <div className="card-body">
                <h1 className="text-4xl font-bold">Create an Account</h1>
                <p>Register with Profast</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* email field */}
                        <label className="label">Email</label>
                        <input type="email"
                            {...register('email', { required: true })}
                            className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                        }

                        <label className="label">Password</label>
                        <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
                        }

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn bg-lime-500 text-white mt-4">Register</button>
                    </fieldset>
                    <p><small>Already have an account? <Link className="btn btn-link   text-lime-500" to="/login">Login</Link></small></p>
                </form>

                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;