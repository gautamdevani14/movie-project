import React from "react";
import notfound from "/404.gif";
const NotFound = () => {

  return (
    <div className='w-full h-full flex justify-center items-center'>
      
      <img className="sm:h-[80%] object-cover" src={notfound} alt="" />
    </div>
  );
};

export default NotFound;
