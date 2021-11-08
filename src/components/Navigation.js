import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
	render() {
		const navItemsClass = 'block w-full h-full p-2 hover:bg-white hover:text-blue-600'
		return (
			<nav className="bg-blue-600 text-white">
				<ul className="flex items-center font-semibold max-w-2xl mx-auto">
					<li>
						<Link to="/" className={navItemsClass}>Search</Link>
					</li>
					<li>
						<Link to="/map" className={navItemsClass}>
							Map
						</Link>
					</li>
					<li className="flex-1"></li>
					<li>
						<Link to="/admin" className={navItemsClass}>
							Admin
						</Link>
					</li>
				</ul>
			</nav>
		)
	}
}

export default Navigation;