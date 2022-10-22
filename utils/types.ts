import React from 'react';

export type AudioInfo = {
  title: string;
  author: string;
  thumbnail: string;
  id: string;
};

export type InputFormProps = {
  error: string | null;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
};

export type AudioInfoProps = {
  audioInfo: AudioInfo;
  setAudioInfo: React.Dispatch<React.SetStateAction<AudioInfo | undefined>>;
};

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  [x: string]: any;
};
