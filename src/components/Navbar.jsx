import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
			<Link className="nav-link" to="/agenda-selector"> Agenda Selector </Link>
				<Link to="/home">
					<span className="navbar-brand mb-0 h1">Go Home</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">and this button?</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};