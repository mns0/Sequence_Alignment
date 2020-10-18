//TODO: Link search button

import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<div className='flex'>
			<ul className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
				<li className='nav-item'>
					<Link to='/'>
						<button
							className='flex items-center rounded shadow  ml-2 mr-2 bg-gray-700 px-3 py-1 text-white hover:bg-gray-600 text-sm'
							onClick={logout}
						>
							Logout
						</button>
					</Link>
				</li>
			</ul>
		</div>
	);

	const guestLinks = (
		<div className='flex'>
			<ul className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
				<li className='nav-item'>
					<Link to='/register'>
						<button className='flex items-center rounded shadow bg-gray-700 px-3 py-1 text-white hover:bg-gray-600 text-sm'>
							Sign up
						</button>
					</Link>
				</li>

				<li className='nav-item'>
					<Link to='/login'>
						<button className='flex ml-2 mr-2 items-center rounded shadow bg-blue-700 px-3 py-1 text-white hover:bg-blue-600 text-sm'>
							Login
						</button>
					</Link>
				</li>
			</ul>
		</div>
	);

	//flex items-center justify-between flex-wrap bg-teal-500 p-6
	return (
		<nav className='flex  justify-between items-center p-1 border-b-1  shadow-lg  border-grey-800 bg-grey-100'>
			{/*LOGO */}
			<div className='flex font-mono text-lg text-gray-800 text-center'>
				<h1 className='align-text-bottom'> Sequence Alignment App</h1>
				<div>
					<svg className='fill-current text-gray-800 inline-block h-8 ml-3  '>
						<path
							id='lineAB'
							d='M 0 0 l 0 100'
							stroke='Gray'
							strokeWidth='1'
							fill='none'
						/>
					</svg>
				</div>
			</div>

			{/*Login Register / Logout Buttons */}
			{!loading && (
				<Fragment> {isAuthenticated ? authLinks : guestLinks}</Fragment>
			)}
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
