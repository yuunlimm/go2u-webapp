import React from "react";

const listGroup = ({
  valueProperty,
  textProperty,
  userType,
  selectedType,
  onItemSelected
}) => {
  return (
    <ul className="list-group">
      {userType.map(type => (
        <li
          onClick={() => onItemSelected(type)}
          key={type[valueProperty]}
          className={
            type === selectedType ? "list-group-item active" : "list-group-item"
          }
        >
          {type[textProperty]}
        </li>
      ))}
    </ul>
  );
};

listGroup.defaultProps = {
  textProperty: "type",
  valueProperty: "_id"
};
export default listGroup;
