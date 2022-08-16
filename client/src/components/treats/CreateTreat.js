import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Typography } from "@mui/material";
import axios from "axios";
import "./CreateTreat.css";
import { createTreat } from "../../actions/TreatActions";

const CreateTreat = (treatReport) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();

  const [ammount, setAmmount] = useState("");
  const [comments, setComments] = useState("");

  const { user } = useSelector((state) => state.user);
  let payBtn = false

  const submitHandler = async (e) => {
    
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const paymentData = {
        amount : ammount
      }
      const { data } = await axios.post(
        "/api/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        payBtn = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const treat = {
            paymentInfo: {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            },
            ammount: ammount,
            comments: comments,
            treatReport: treatReport.treat
          };

          dispatch(createTreat(treat));

          alert.success("Treat made succesfully");

          navigate("/me/treats");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn = false;
      alert.error(error.response.data.message);
    }
  };
  return (
    <Fragment>
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Treat</Typography>
          <div className="treatInput">
            <input
              type="number"
              placeholder="Treat ammount"
              required
              value={ammount}
              onChange={(e) => setAmmount(e.target.value)}
            />
            <textarea
              placeholder="Comments(optional)"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              cols="30"
              rows="2"
            ></textarea>
          </div>
          <Typography>Card Info</Typography>
          <div>
            {/* <CreditCardIcon /> */}
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            {/* <EventIcon /> */}
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            {/* <VpnKeyIcon /> */}
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${ammount}`}
            disabled={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default CreateTreat;
