import type { NextPage } from 'next';
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';

const Home: NextPage = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

  const downloadAudio = (id: string) => {
    axios
      .post(
        `${process.env.API_URL}/api/audio`,
        { id },
        {
          responseType: 'blob',
          onDownloadProgress: (progressEvent) => {
            const { loaded } = progressEvent;
            console.log(loaded);
          },
        }
      )
      .then((res) => {
        console.log(res);

        const url = window.URL.createObjectURL(new Blob([res.data]));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'test.mp3');

        document.body.appendChild(link);
        link.click();
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 400) {
          setText('');
          setError('Video Unavailable');
        }
      });
  };

  const onSubmit = () => {
    if (!text) {
      return setError('Please enter a valid Url');
    }

    const match = text.match(regExp);
    if (match && match[2].length == 11) {
      downloadAudio(match[2]);
    } else {
      setError('Please enter a valid Url');
    }
  };

  return (
    <div className='h-screen bg-darkAccent flex items-center justify-center text-white font-inter'>
      <div className='px-4 w-[700px] mx-auto flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-semibold tracking-wider text-center'>
          Convert Youtube Video To MP3
        </h1>

        <div className='w-full mt-24'>
          {error && <p className='text-sm text-red-500 mb-2'>{error}</p>}
          <div className='w-full flex items-center justify-center gap-4'>
            <input
              type='text'
              className='w-full bg-white dark:bg-input shadow-md border-none outline-none py-5 px-7 placeholder:opacity-50 rounded-sm focus:outline-primaryBtnHvr transition-all ease-in-out duration-500'
              placeholder='Enter URL here'
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button
              className={
                'bg-primaryBtn font-semibold px-10 py-5 rounded-md flex items-center relative text-white hover:bg-primaryBtnHvr transition-colors duration-700 drop-shadow-lg'
              }
              onClick={onSubmit}
            >
              Go!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
