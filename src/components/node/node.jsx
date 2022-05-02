import * as React from 'react';
import './node.css';

const Node = (props) => {

	const variant = props.finish
		? 'node-finish'
		: props.start
		? 'node-start'
		: props.stop
		? 'node-stop'
		: props.wall
		? 'node-wall'
		: '';
	return (
		<div style={{ height: `${props.rows}px`, width: `${props.rows}px`}}
			id={`node-${props.row}-${props.col}`}
			className={`node ${variant}`}
			// mouse events
			onMouseDown={() => props.mouseDown(props.row, props.col)}
			onMouseEnter={() => props.mouseEnter(props.row, props.col)}
			onMouseUp={() => props.mouseUp()}
			//touch events
			onTouchStart={() => props.touchStart(props.row, props.col)}
			onTouchMove={() => props.touchMove(props.row, props.col)}
			onTouchEnd={() => props.touchEnd(props.row, props.col)}
		></div>
	);
};

export default Node;
