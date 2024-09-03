import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Hulderhaugen
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className={classes["collapse-menu"]}>
            <Link className={classes["collapsed-links"]} to="/">
              <span>Home</span>
            </Link>
            <Link className={classes["collapsed-links"]} to="/game">
              <span>Game</span>
            </Link>
            <Link className={classes["collapsed-links"]} to="/dota2">
              <span>Dota2</span>
            </Link>
            <Link className={classes["collapsed-links"]} to="/taskManager">
              <span>Task Manager</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
