"use client";

import { useState } from "react";
import { sendDataToContactApi } from "../../utils/contactapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const apiData = await sendDataToContactApi(formData);
    if (apiData.success) {
      setformData({
        name: "",
        email: "",
        message: "",
        phone: "",
      });
      toast.success(apiData.message);
    } else {
      toast.error(apiData.response?.data?.error || "Something went wrong");
    }
    console.log(formData);
  };
  return (
    <>
      <ToastContainer position="bottom-right" />
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <p className="max-w-xl text-lg">
                Send us message if you discover any bug on our website or you
                have any problem.
              </p>
              <p className="max-w-xl text-lg">
                Your feedback is valuable for us.
              </p>
              <div className="mt-8">
                <a href="#" className="text-2xl font-bold text-pink-600">
                  {" "}
                  9672670732{" "}
                </a>
                <address className="mt-2 not-italic">
                  Teerthanker Mahaveer University, Moradabad, Uttart Pradesh
                </address>
              </div>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form action="#" className="space-y-4">
                <div>
                  <label className="sr-only" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Name"
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setformData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Email address"
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setformData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Phone Number"
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setformData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="sr-only" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Message"
                    rows={8}
                    id="message"
                    defaultValue={""}
                    value={formData.message}
                    onChange={(e) =>
                      setformData({ ...formData, message: e.target.value })
                    }
                  />
                </div>
                <div className="mt-4">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    Send Enquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
