import React from 'react';

const Button = ({ bsClasses, clicked, disabled, children }) => {
  let btnClass = 'btn';
  return (
    <button
      className={[btnClass, bsClasses].join(' ')}
      onClick={clicked}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
