import clsx from 'clsx';
import * as React from 'react';

class Footer extends React.Component {
	render() {
		return (
			<footer className={clsx(
				"absolute bottom-0 right-0 left-0 bg-blue-600",
				this.props.className
			)}>
				<div className="flex items-center justify-center space-x-8 h-full text-gray-100">
					<h1 className="">2021 - Cory Evans</h1>
					<a href="https://github.com/CoryEvans2324/SystemsDesignAppFrontend"
						className="underline"
					>Source</a>
				</div>
			</footer>
		)
	}
}

export default Footer;