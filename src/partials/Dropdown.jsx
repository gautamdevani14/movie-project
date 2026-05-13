import React from "react";

const Dropdown = ({ title, options, func }) => {
  return (
    <div className="select sm:mb-0 mb-2">
      <select defaultValue="" onChange={func} name="format" id="format">
        <option value="" disabled>
          {title}
        </option>

        {options.map((o, i) => (
          <option className="text-black" key={i} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
