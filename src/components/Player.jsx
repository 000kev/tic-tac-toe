import { useState } from "react";

export default function Player({ name, symbol, isActive, onNameChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setName] = useState(name);

  const handleEditClick = () => {
    setIsEditing((previous_state) => !previous_state);
    if (isEditing) onNameChange(symbol, playerName);
  };
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {!isEditing && <span className="player-name">{playerName}</span>}
        {isEditing && (
          <input
            type="text"
            required
            value={playerName}
            onChange={handleChange}
          ></input>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>
        {!isEditing && "Edit"}
        {isEditing && "Save"}
      </button>
    </li>
  );
}
