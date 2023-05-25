import { Link } from "react-router-dom";
import "./style.css";

/*
 * @description: Side bar navigation component
 */
function Navigation(props) {
  return <div className="navigation">{props.children}</div>;
}

Navigation.Category = function NavigationCategory(props) {
  return props.role.includes(props.type) ? (
    <div className="navigation-category">
      {props.label}
      {props.children}
    </div>
  ) : null;
};

Navigation.Item = function NavigationItem(props) {
  return (
    <Link className="navigation-item" to={props.link}>
      {props.icon}
      {props.label}
    </Link>
  );
};

export { Navigation };
