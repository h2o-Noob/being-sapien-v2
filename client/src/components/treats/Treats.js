import { Fragment, React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myTreats } from "../../actions/TreatActions";
import Loader from "../layout/loader/Loader";
import TreatCard from "./TreatCard";
import "./Treats.css"

const Treats = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myTreats());
  }, []);

  const { treats, loading } = useSelector((state) => state.myTreats);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {treats.length == 0 ? (
              <h2 className="reportsHeading">No Treats found</h2>
            ) : (
              <h2 className="reportsHeading">Treats</h2>
            )}
          <div className="treats">
            {treats &&
              treats.map((treat) => (
                <TreatCard key={treat._id} treat={treat} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Treats;
