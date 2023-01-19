import { NextPage } from 'next';
import { useCallback, useState } from 'react';
import { Welcome, Editor } from '@/components/organisms';

const Home: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);

  const goBack = useCallback(() => {
    setFile(null);
  }, []);

  return <>{file ? <Editor file={file} goBack={goBack} /> : <Welcome onUpload={(file) => setFile(file)} />}</>;
};

export default Home;
