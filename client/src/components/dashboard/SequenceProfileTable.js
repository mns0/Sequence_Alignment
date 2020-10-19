import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Alignments = ({ alignments }) => {
	const allAlignments =
		alignments &&
		alignments.map((ali) => (
			<tr key={ali._id}>
				<td className='border px-8 py-4'>{ali.sequence}</td>
				<td className='border px-8 py-4'>
					<Moment format='YYYY/MM/DD'>{moment.utc(ali.date)}</Moment>
				</td>
				<td className='border px-8 py-4'>{ali.sequenceMatch}</td>
				<td className='border px-8 py-4'>{ali.evalue}</td>
				<td className='border px-8 py-4'>
					{ali.hspstart} : {ali.hspend}
				</td>

				<td className='border px-8 py-4'>
					{ali.hspquery}
					<br />
					{ali.hspsbjct}
				</td>
			</tr>
		));
	return (
		<Fragment>
			<h2 className='my-2'>Alignments</h2>
			<table className='shadow-lg bg-white'>
				<thead>
					<tr>
						<th className='bg-blue-100 border text-left px-8 py-4'>
							Query Sequence
						</th>
						<th className='bg-blue-100 border text-left px-8 py-4'>
							Date (YYYY/MM/DD)
						</th>
						<th className='bg-blue-100 border text-left px-8 py-4'>
							Matched Protien
						</th>
						<th className='bg-blue-100 border text-left px-8 py-4'>E-Value</th>
						<th className='bg-blue-100 border text-left px-8 py-4'>
							Hit Sequence Start : Hit Sequence End (NT Number)
						</th>
						<th className='bg-blue-100 border text-left px-8 py-4'>
							Matched Sequence (Query top: Hit bottom)
						</th>

						<th />
					</tr>
				</thead>
				<tbody>{allAlignments}</tbody>
			</table>
		</Fragment>
	);
};

Alignments.propTypes = {
	alignments: PropTypes.array.isRequired,
};

export default connect(null, {})(Alignments);
