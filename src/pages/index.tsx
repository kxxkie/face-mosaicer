import { NextPage } from 'next';
import { useCallback, useState } from 'react';
import { Welcome, Editor } from '@/components/organisms';
import Head from 'next/head';

const Home: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);

  const goBack = useCallback(() => {
    setFile(null);
  }, []);

  return (
    <>
      <Head>
        <title>{file ? 'Editor' : 'Welcome'} | face mosaicer</title>
      </Head>
      {file ? <Editor file={file} goBack={goBack} /> : <Welcome onUpload={(file) => setFile(file)} />}
    </>
  );
};

export default Home;
