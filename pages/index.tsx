import type { NextPage } from 'next';
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { AudioInfo } from '../utils/types';
import { getAudioInfo } from '../utils/api';
import InputForm from '../components/InputForm';
import { getVideoId } from '../utils/helpers';
import AudioInfoCard from '../components/AudioInfoCard';

const Home: NextPage = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [audioInfo, setAudioInfo] = useState<AudioInfo>();
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text) {
      return setError('Please enter a valid Url');
    }

    const id = getVideoId(text);
    if (id) {
      setDisabled(true);
      try {
        const { data } = await getAudioInfo(id);
        console.log(data);

        setText('');
        setError(null);
        setAudioInfo(data);
      } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 429) {
          setError('You are being rate limited');
        } else {
          setError('An error occured. Please try again');
        }
      }
      setDisabled(false);
    } else {
      setError('Please enter a valid Url');
    }
  };

  return (
    <div className='h-screen bg-darkAccent flex items-center justify-center text-white font-inter'>
      <div className='px-4 w-[700px] mx-auto flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-semibold tracking-wider text-center'>
          Convert Youtube Video To MP
        </h1>

        {!audioInfo ? (
          <InputForm
            error={error}
            text={text}
            setText={setText}
            onSubmit={onSubmit}
            disabled={disabled}
          />
        ) : (
          <AudioInfoCard audioInfo={audioInfo} setAudioInfo={setAudioInfo} />
        )}
      </div>
    </div>
  );
};

export default Home;
