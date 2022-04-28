import * as React from 'react';
import './node.css';

const Node = (props) => {
	const extraClassName = props.isFinish
		? 'node-finish'
		: props.isStart
		? 'node-start'
		: props.isWall
		? 'node-wall'
		: '';
	return (
		<div className='node'>
			<div
				id={`node-${props.row}-${props.col}`}
				className={`node ${extraClassName}`}
			></div>
		</div>
	);
};

export default Node;
