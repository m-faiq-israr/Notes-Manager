import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {

  const [credentials, setcredentials] = useState({name: "", email: "", password: "", cpassword:"" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch("http://localhost:4000/api/user/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password})
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token in local storage and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
    } else {
      alert("invalid credentials");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12 mt-6">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 text-left font-poppins ">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-600 md:mb-8 lg:text-3xl ">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="mx-auto max-w-lg rounded-lg border-2 shadow-md ">
          <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
              <label
                htmlFor="name"
                className="mb-2 inline-block text-sm text-gray-600 font-bold sm:text-base"
              >
                Name
              </label>
              <input
                name="name"
                id='name'
                onChange={onChange}
                defaultValue={credentials.name}
                placeholder='Enter your name'
                required
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 inline-block text-sm text-gray-600 font-bold sm:text-base"
              >
                Email
              </label>
              <input
                name="email"
                type='email'
                id='email'
                onChange={onChange}
                defaultValue={credentials.email}
                placeholder='Enter your email'
                required
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 inline-block text-sm text-gray-600 font-bold sm:text-base"
              >
                Password
              </label>
              <input
                name="password"
                type='password'
                id='password'
                onChange={onChange}
                defaultValue={credentials.password}
                placeholder='********'
                minLength={5}
                required
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
            <div>
              <label
                htmlFor="cpassword"
                className="mb-2 inline-block text-sm text-gray-600 font-bold sm:text-base"
              >
                Confirm Password
              </label>
              <input
                name="cpassword"
                id='cpassword'
                type='password'
                onChange={onChange}
                defaultValue={credentials.cpassword}
                placeholder='********'
                minLength={5}
                required
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
            <button className="block rounded-lg bg-indigo-600 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-indigo-700 focus-visible:ring active:bg-gray-600 md:text-base">
              Sign Up
            </button>
          </div>
          <div className="flex items-center justify-center bg-gray-100 p-4">
            <p className="text-center text-sm text-gray-500 font-medium">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-indigo-500 transition duration-100 font-medium hover:text-indigo-600 active:text-indigo-700"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp