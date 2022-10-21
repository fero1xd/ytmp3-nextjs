import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

type HeadTagsProps = {
  title?: string;
};

const HeadTags: NextPage<HeadTagsProps> = ({ title }) => {
  return (
    <Head>
      <link
        href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
        rel='stylesheet'
      />

      <title>{title}</title>
    </Head>
  );
};

HeadTags.defaultProps = {
  title: 'YTMP3',
};

export default HeadTags;
