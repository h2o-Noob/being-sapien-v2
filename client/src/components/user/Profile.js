import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    isAuthenticated ? navigate("/account") : navigate("/login");
  }, [useNavigate(), isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              { user ? <img src={user.avatar.url} alt={user.name} /> : null}
              <Link to="/me/update">Edit Profile</Link>
              <Link to="/password/update">Change Password</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                {user ? <p>{user.name}</p> : null}
              </div>
              <div>
                <h4>Email</h4>
                {user ? <p>{user.email}</p> : null}
              </div>
              <div>
                <h4>Joined On</h4>
                {user ? <p>{String(user.createdAt).substr(0, 10)}</p> : null}
              </div>

              <div>
                <Link to="/me/reports">My Reports</Link>
                <Link to="/me/treats">My Treats</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
