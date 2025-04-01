import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link className="nav-link" to="/contacts">
					Agenda de contactos
				</Link>
				<Link to="/home">
					<span className="navbar-brand mb-0 h1">Este va al Home</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Este botón que hará?</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};