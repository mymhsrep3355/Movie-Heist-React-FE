import React from "react";
// import logo from '../../assets/Movieheist.png'
import AppHeader from "../../components/AppHeader";
const Help = () => {
  return (
    <div className="w-full h-screen">
      <div>
      <AppHeader></AppHeader>
      <div className=" bg-slate-900 flex ml-4 mr-4 justify-between">
        <div className=" my-auto py-4 h-[420px] max-w-[500px] w-2/5 mx-auto bg-black/70 rounded-lg flex">
        <div className=" max-w-[330px] mx-auto py-14">
          <h1>HELP? `LOGIN`</h1>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
        </div>
        <div className="my-auto py-4 h-[420px] max-w-[500px] w-2/5 mx-auto bg-black/70 rounded-lg flex">
        <div className=" max-w-[330px] mx-auto py-14">
        <h1>HELP? `SIGN UP`</h1>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Help;
