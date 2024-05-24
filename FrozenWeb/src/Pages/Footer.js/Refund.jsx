import React from "react";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";

function Refund() {
  return (
    <div>
      <Navbar />
      <div class="container mt-8 mb-8">
        <h3>Refund Policy</h3>
        <p>Updated at 2023-04-21</p>

        <p>
          At Frozenwala, we strive to ensure your complete satisfaction with
          every purchase. If you are not entirely satisfied with your order,
          we're here to help with our refund policy.
        </p>

        <h4>Refund Eligibility:</h4>
        <p>
          1. <b>Damaged Items:</b> If you receive damaged or defective items,
          please contact us within 24hrs of delivery. We will assess the issue
          and provide a refund or replacement accordingly.
        </p>

        <p>
          2. <b>Incorrect Items:</b> In the rare event that you receive
          incorrect items, please notify us within 24hrs of delivery. We will
          arrange for the correct items to be sent to you or issue a refund.
        </p>

        <p>
          3. <b>Cancellation:</b> Orders can be canceled up to 2 hours before
          the scheduled delivery time. Any cancellations made after this time
          frame may not be eligible for a refund.
        </p>
        <h4>Refund Process:</h4>
        <p>
          1. <b>Wallet Refund:</b> Refunds for eligible orders will be processed
          within 24hrs and credited to your Frozenwala wallet. This credit can
          be used for future purchases on our website.
        </p>

        <p>
          2. <b>Adjustment in Next Order:</b> Alternatively, if you prefer, we
          can adjust the refund amount in your next order total. Just let us
          know your preference when requesting the refund.
        </p>
        <h4>How to Request a Refund:</h4>
        <p>
          To request a refund, please contact our customer support team at
          support@frozenwala.com. Provide your order details and reason for the
          refund request, and we will assist you promptly. Please note that
          refunds are subject to review and approval by Frozenwala.
        </p>
        <h4>Cancellation Policy:</h4>
        <p>
          Customers can cancel their orders up to 2 hours before the scheduled
          delivery time. To cancel an order, please log in to your Frozenwala
          account, go to your order history, and select the cancel option for
          the relevant order. For any further assistance or inquiries regarding
          refunds or cancellations, feel free to reach out to our customer
          support team at support@frozenwala.com. We're here to ensure your
          shopping experience with Frozenwala is smooth and enjoyable.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Refund;
