// import './utils/vegemite';
// import './utils/binarySearch';
// import './utils/minMoves2-462';
import './utils/linkedList';
import React from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';

const ReactGridLayout = WidthProvider(RGL);

class NoDraggingLayout extends React.PureComponent {
	static defaultProps = {
		className: 'layout',
		isDraggable: false,
		isResizable: false,
		items: 20,
		cols: 12,
		rowHeight: 30,
		onLayoutChange: function () {}
	};

	constructor(props) {
		super(props);

		const layout = this.generateLayout();
		this.state = { layout };
	}

	generateDOM() {
		return _.map(_.range(this.props.items), function (i) {
			return (
				<div
					key={i}
					style={{
						// backgroundColor: 'red',
						height: Math.ceil(Math.random() * 4) + 1
					}}
				>
					<span className='text'>{i}</span>
				</div>
			);
		});
	}

	generateLayout() {
		const p = this.props;
		return _.map(new Array(p.items), function (item, i) {
			var y = _.result(p, 'y') || Math.ceil(Math.random() * 4) + 1;
			return {
				x: (i * 4) % 12,
				y: Math.floor(i / 6) * y,
				w: 4,
				h: y,
				i: i.toString()
			};
		});
	}

	onLayoutChange(layout) {
		this.props.onLayoutChange(layout);
	}

	render() {
		return (
			<ReactGridLayout
				// layout={this.state.layout}
				onLayoutChange={this.onLayoutChange}
				{...this.props}
			>
				{this.generateDOM()}
			</ReactGridLayout>
		);
	}
}

export default function App() {
	return <NoDraggingLayout></NoDraggingLayout>;
}
