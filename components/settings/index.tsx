import React from "react";

const Settingpage = ({ username }: { username: String }) => {
  return (
    <>
      <div>{username}</div>

      <div>
        <label
          htmlFor="UserEmail"
          className="block text-xs font-medium text-gray-700"
        >
          {" "}
          Email{" "}
        </label>

        <input
          type="email"
          id="UserEmail"
          placeholder="john@rhcp.com"
          className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
        />
      </div>
    </>
  );
};

export default Settingpage;
