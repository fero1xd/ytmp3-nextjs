import { NextPage } from 'next';
import React from 'react';
import { InputFormProps } from '../utils/types';
import Button from './Common/Button';

const InputForm: NextPage<InputFormProps> = ({
  error,
  setText,
  text,
  onSubmit,
  disabled,
}) => {
  return (
    <form className='w-full mt-24' onSubmit={onSubmit}>
      {error && <p className='text-sm text-red-500 mb-2'>{error}</p>}
      <div className='w-full flex items-center justify-center gap-4'>
        <input
          type='text'
          className='w-full bg-white dark:bg-input shadow-md border-none outline-none py-5 px-7 placeholder:opacity-50 rounded-sm focus:outline-primaryBtnHvr transition-all ease-in-out duration-500'
          placeholder='Enter URL here'
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <Button disabled={disabled}>Go!</Button>
      </div>
    </form>
  );
};

export default InputForm;
