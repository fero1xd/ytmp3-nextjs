import axios, { AxiosError, AxiosProgressEvent } from 'axios';
import { NextPage } from 'next';
import { useState } from 'react';
import { downloadAudioApi } from '../utils/api';
import { AudioInfoProps } from '../utils/types';
import Button from './Common/Button';

const AudioInfoCard: NextPage<AudioInfoProps> = ({
  audioInfo,
  setAudioInfo,
}) => {
  const { title, thumbnail, author, id } = audioInfo;
  const [error, setError] = useState<string>();
  const [disabled, setDisabled] = useState(false);
  const [downloadedBytes, setDownloadedByes] = useState<number>();

  const downloadAudio = async (id: string) => {
    if (disabled) return;

    setDisabled(true);
    error && setError(undefined);

    try {
      const res = await downloadAudioApi(id, {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          const { loaded } = progressEvent;
          loaded > 80 && setDownloadedByes(loaded);
        },
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', title + '.mp3');

      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        link.remove();
      }, 4000);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 429) {
        setError('You are being rate limited');
      } else {
        setError('An error occured. Please try again Later');
      }
    }
    setDisabled(false);
  };

  const formatBytes = (bytes: number) =>
    `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  const buttonStyle = {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '8px',
    paddingBottom: '8px',
  };
  return (
    <div className='mt-24 w-full bg-input px-6 py-10 rounded-2xl shadow-md flex flex-col items-center justify-center gap-9 font-regular text-md text-gray-300'>
      <div className='flex items-center justify-center flex-col gap-2 text-center'>
        {error && <p className='text-sm text-red-500'>{error}</p>}
        <h1>
          <span className='text-red-400'>Title - </span>
          {title}
        </h1>
        <p>
          <span className='text-red-400'>By - </span>
          {author}
        </p>
      </div>
      <img
        src={audioInfo.thumbnail}
        alt='thumbnail'
        className='rounded-[10px] w-auto h-48 cursor-pointer'
        onClick={() => window.open(thumbnail, 'blank')}
      />

      <div className='mt-10 flex items-center flex-col gap-2 justify-center'>
        {downloadedBytes && (
          <p>
            <span className='text-green-400'>Downloaded - </span>
            {formatBytes(downloadedBytes)}
          </p>
        )}
        <div className='flex items-center justify-center gap-4'>
          <Button
            className='font-normal'
            style={buttonStyle}
            onClick={() => downloadAudio(id)}
            disabled={disabled}
          >
            Download MP3
          </Button>
          <Button
            className='font-normal'
            style={buttonStyle}
            onClick={() => setAudioInfo(undefined)}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AudioInfoCard;
