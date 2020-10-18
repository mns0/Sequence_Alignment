import { setAlert } from '../actions/alert';

//Helper functions
export const sequenceValidation = (sequence) => (dispatch) => {
	sequence = sequence.toUpperCase();
	if (!/^[GCTA]*$/.test(sequence)) {
		dispatch(setAlert('Please enter a valid DNA sequence', 'danger'));
		return false;
	}
	return true;
};
