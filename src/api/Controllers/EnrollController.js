const Course = require("../Models/Course");
const Order = require("../Models/Order");
const SSLCommerzPayment = require("sslcommerz-lts");
const { ObjectId } = require("mongodb");
class EnrollController {
  static enroll = async (req, res) => {
    const { course, paymentMethod, cancelUrl, successUrl } = req.body;
    try {
      const selectedCourse = await Course.findById(course);
      if (!selectedCourse || selectedCourse.isDeleted) {
        return res
          .status(404)
          .json({ status: false, message: "Course not found." });
      }
      const enrolledCourse = await Order.findOne({
        course: course,
        user: req.user._id,
      });

      if (enrolledCourse) {
        if (enrolledCourse.status === "success") {
          return res
            .status(409)
            .json({ status: false, message: "Already enrolled." });
        } else {
          await enrolledCourse.deleteOne();
        }
      }

      const startDate = new Date(selectedCourse.startDate).getTime();
      const currentTime = Date.now();
      if (currentTime > startDate) {
        return res
          .status(403)
          .json({ status: false, message: "Enrollment time over." });
      }

      // proceed enrollment

      const transactionId = new ObjectId().toString();
      const backendUrl = `${req.protocol}://${req.get("host")}`;
      const data = {
        total_amount: selectedCourse.price,
        product_amount: selectedCourse.price,
        currency: "BDT",
        tran_id: transactionId, // use unique tran_id for each api call
        product_category: "course",
        success_url: `${backendUrl}/payment/init?redirect${successUrl}&token=${transactionId}`,
        fail_url: cancelUrl,
        cancel_url: cancelUrl,
        payment_method: paymentMethod,
        product_name: selectedCourse.name,
        cus_name: req.user.name,
        cus_email: req.user.email,
        cus_phone: req.user.phoneNumber || "01313386709",
        emi_option: 0,
        shipping_method: "NO",
        product_profile: "non-physical-goods",
      };

      const sslcz = new SSLCommerzPayment(
        process.env.sslcommerze_store,
        process.env.sslcommerze_password,
        false
      );
      sslcz.init(data).then(async (apiResponse) => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        if (GatewayPageURL) {
          const order = new Order({
            user: req.user._id,
            course: course,
            paymentMethod: paymentMethod,
            amount: selectedCourse.price,
            transactionId: transactionId,
          });

          await order.save();
        }

        return res.status(201).json({
          status: true,
          url: GatewayPageURL,
          apiResponse: apiResponse,
        });
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error.",
        error: error.message,
      });
    }
  };
  static redirect = async (req, res) => {
    const { redirect, token } = req.query;
    res.redirect(`${redirect}?token=${token}`);
  };

  static verify = async (req, res) => {
    const { token } = req.params;
    try {
      const order = await Order.findOne({ transactionId: token });

      if (!order) {
        return res
          .status(404)
          .json({ status: false, message: "Transaction id invalid." });
      }
      if (order.status === "success") {
        return res
          .status(409)
          .json({ status: false, message: "Already enrolled." });
      }

      order.status = "success";
      await order.save();
      return res.status(200).json({
        status: true,
        message: "Enrollment successfull.",
        order: order,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error.",
        error: error.message,
      });
    }
  };
}

module.exports = EnrollController;
