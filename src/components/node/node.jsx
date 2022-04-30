import * as React from 'react';
import './node.css';

const Node = (props) => {
	const variant = props.finish
		? 'node-finish'
		: props.start
		? 'node-start'
		: props.wall
		? 'node-wall'
		: '';
	return (
		<div
			id={`node-${props.row}-${props.col}`}
			className={`node ${variant}`}
			onMouseDown={() => props.mouseDown(props.row, props.col)}
			onMouseEnter={() => props.mouseEnter(props.row, props.col)}
			onMouseUp={() => props.mouseUp()}
		></div>
	);
};

export default Node;
