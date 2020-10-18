import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadUser, runAlignment } from '../../actions/auth';
import { sequenceValidation } from '../../utils/validationHelpers';
import Alignments from './SequenceProfileTable';

const Dashboard = ({ auth: { user }, runAlignment, sequenceValidation }) => {
	const [formData, setFormData] = useState({
		inputSequence: '',
	});

	const { inputSequence } = formData;

	const onChange = async (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (sequenceValidation(inputSequence)) {
			runAlignment(inputSequence);
		}
	};

	useEffect(() => {
		loadUser();
	}, [loadUser]);

	const storedAlignments = user && user.alignments;

	return (
		<Fragment>
			<div className='w-full  container p-10'>
				<p className='font-mono text-lg text-gray-800 text-center'>
					Hello {user && user.name}
				</p>

				<p className='font-mono text-sm text-gray-800 text-center'>
					Please enter the query sequence below:
				</p>

				<form className='w-full max-w' onSubmit={(e) => onSubmit(e)}>
					<div className='flex items-center border-b border-teal-500 py-2'>
						<input
							className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
							type='text'
							name='inputSequence'
							placeholder='Input Sequence to Align'
							value={inputSequence}
							onChange={(e) => onChange(e)}
							required
						/>
						<button
							className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
							type='submit'
						>
							Input Sequence
						</button>
					</div>
				</form>

				{storedAlignments !== null ? (
					<Fragment>
						<Alignments alignments={storedAlignments} />
					</Fragment>
				) : (
					<Fragment></Fragment>
				)}
			</div>
		</Fragment>
	);
};

Dashboard.propTypes = {
	sequenceValidation: PropTypes.func.isRequired,
	runAlignment: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {
	loadUser,
	runAlignment,
	sequenceValidation,
})(Dashboard);
