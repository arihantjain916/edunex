"use client";
import { useState } from "react";
import { sendDatatoLoginApi } from "../../utils/authapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import {SetCookie} from '../../utils/setCookie';

// delete

const SignIn = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const apidata = await sendDatatoLoginApi(formData);
    if (apidata.success) {
      toast.success(apidata.message);
      setFormData({ username: "", password: "" });
      SetCookie(apidata.token);
      console.log(apidata.token);
      
      router.push("/");
    } else {
      toast.error(apidata.response.data.error);
    }

    setLoading(false);
  };

  return (
    <>
      <ToastContainer position="bottom-right" />

      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=htmlFormat&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <a className="block text-blue-600" href="#">
                <span className="sr-only">Home</span>
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG Path */}
                </svg>
              </a>

              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                LogIn to EduNex
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Welcome back! Log in to access your personalized learning
                journey.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mt-8 grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {" "}
                      Password{" "}
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                      type="submit"
                      className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="flex gap-2 justify-center items-center">
                            <img
                              src="/Icons/fidget-spinner.png"
                              alt="loader"
                              className="w-9 animate-spin"
                            />
                            <span className="text-xl">logginig...</span>
                          </div>
                        </>
                      ) : (
                        "Login"
                      )}
                    </button>
                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                      Don't have an account?{" "}
                      <a
                        href="/auth/register"
                        className="text-gray-700 underline"
                      >
                        Register
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default SignIn;
