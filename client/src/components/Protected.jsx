import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({ children, redirectedPath }) => {
  const { admin, error } = useSelector((state) => state.auth);
  console.log(admin, error);

  if (!admin || Object.keys(admin).length === 0 || error === "Unauthorized") {
    return <Navigate to={redirectedPath} />;
  }

  return children ? children : <Outlet />;
};

export default Protected;
