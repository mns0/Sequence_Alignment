// TODO
// --Clean up UI
// --Add sign in link

import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

export const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	const onChange = async (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			register({ name, email, password });
		}
	};
	// Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Fragment>
			<div className='w-full max-w-xs container mx-auto '>
				<form
					className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 '
					onSubmit={(e) => onSubmit(e)}
				>
					{/* Username input*/}

					<div className='md:flex md:items-center mb-6'>
						{' '}
						<div className='md:w-1/3'>
							<label
								className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
								htmlFor='inline-full-name'
							>
								Full Name
							</label>
						</div>
						<div className='md:w-2/3'>
							<input
								className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
								id='inline-full-name'
								type='text'
								placeholder='Jane Doe'
								name='name'
								value={name}
								onChange={(e) => onChange(e)}
							/>
						</div>
					</div>

					{/* Email input*/}

					<div className='md:flex md:items-center mb-6'>
						{' '}
						<div className='md:w-1/3'>
							<label
								className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
								htmlFor='inline-email'
							>
								Email
							</label>
						</div>
						<div className='md:w-2/3'>
							<input
								className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
								id='inline-email'
								type='text'
								placeholder='jane.doe@provider.com'
								name='email'
								value={email}
								onChange={(e) => onChange(e)}
							/>
						</div>
					</div>

					{/* Password input*/}

					<div className='md:flex md:items-center mb-6'>
						{' '}
						<div className='md:w-1/3'>
							<label
								className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
								htmlFor='inline-password'
							>
								Password
							</label>
						</div>
						<div className='md:w-2/3'>
							<input
								className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
								id='inline-password'
								type='password'
								placeholder='******************'
								name='password'
								value={password}
								minLength='6'
								onChange={(e) => onChange(e)}
							/>
						</div>
					</div>
					{/* Confirm Password input*/}

					<div className='md:flex md:items-center mb-6'>
						{' '}
						<div className='md:w-1/3'>
							<label
								className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
								htmlFor='inline-password-confirm'
							>
								Confirm Password
							</label>
						</div>
						<div className='md:w-2/3'>
							<input
								className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
								id='inline-password-confirm'
								type='password'
								placeholder='******************'
								name='password2'
								value={password2}
								onChange={(e) => onChange(e)}
								minLength='6'
							/>
						</div>
					</div>

					<div className='md:flex md:items-center'>
						<div className='md:w-1/3'></div>
						<div className='md:w-2/3'>
							<button
								className='shadow bg-teal-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
								type='submit'
								value='Register'
							>
								Sign Up
							</button>
						</div>
					</div>
				</form>
			</div>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
