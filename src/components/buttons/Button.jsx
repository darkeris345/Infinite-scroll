import "./Button.scss";

const Button = ({ handleLike, label, isActive }) => {
  const btnClass = isActive ? "button active" : "button";

  return (
    <button className={btnClass} onClick={handleLike}>
      {label}
    </button>
  );
};

export default Button;
