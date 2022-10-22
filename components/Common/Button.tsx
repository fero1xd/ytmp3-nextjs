import { NextPage } from 'next';
import { ButtonProps } from '../../utils/types';

const Button: NextPage<ButtonProps> = ({ className, children, ...rest }) => {
  return (
    <button
      className={`font-inter bg-primaryBtn font-semibold px-10 py-5 rounded-md flex items-center relative text-white disabled:bg-primaryBtnHvr 
    hover:bg-primaryBtnHvr transition-colors duration-700 drop-shadow-lg ${
      className ? className : ''
    }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
