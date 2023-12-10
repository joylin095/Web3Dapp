import { NavLink } from "react-router-dom";

function NavPage() {
  return (
    <div className="list-group list-group-horizontal">
      <NavLink className="list-group-item" to="/">
        Mint
      </NavLink>
      <NavLink className="list-group-item" to="/Upload">
        Upload
      </NavLink>
      <NavLink className="list-group-item" to="/Profile">
        Profile
      </NavLink>
    </div>
  );
}

export default NavPage;
