import React from "react";
import registerMockup from "../../mockupData/account.json";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center my-5">
      <p className="text-[35px] my-5">Register</p>
      {registerMockup?.register?.map((field: any) => (
        <input
          className="w-80 h-9 my-2 px-2 border outline-none text-sm border-black"
          placeholder={field}
          key={field}
          name={field}
        />
      ))}
      <input
        type="submit"
        className="w-80 h-9 bg-black text-sm text-white my-2"
        value={"Sign In"}
      />
    </div>
  );
};

export default Register;
