import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Contexts/AutoContext/AuthContext';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();


    // useAuth context
    const { signinUser } = useContext(AuthContext);


    const onSubmit = data => {
        signinUser(data.email, data.password)
            .then((user) => {
                console.log('user sign in ', user);
            })
            .catch((error) => {
                console.log(error);
            })

    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        className="input"
                        placeholder="Email" />


                    <label className="label">Password</label>
                    <input type="password"
                        {...register('password', { required: true, minLength: 6 })}
                        className="input"
                        placeholder="Password" />

                    {errors.password?.type === "required" && (
                        <p className='text-red-500'>First name is required</p>
                    )}

                    {errors.password?.type === "minLength" && (
                        <p className='text-red-500'>Password must be 6 character</p>
                    )}

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn bg-lime-300 mt-4">Login</button>
                    <p className='text-sm'><small>Do you have no account <Link className='text-lime-600 btn btn-link' to={'/register'}>Register</Link></small> </p>
                </fieldset>
            </form>

            <SocialLogin></SocialLogin>

        </div>
    );
};

export default Login;