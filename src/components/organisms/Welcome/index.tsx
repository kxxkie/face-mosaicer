import styled from '@emotion/styled';
import { Source_Code_Pro } from '@next/font/google';
import { RootLayout } from '@/components/layouts';
import { ChangeEvent, useCallback } from 'react';
import { mediaQuerys } from '@/libs/styles';

const Label = styled.label({
  display: 'inline-block',
  marginTop: 200,
  fontSize: 80,
  paddingBottom: 10,
  borderBottom: '4px solid rgb(50, 50, 50)',
  cursor: 'pointer',
  transition: 'color 0.3s',
  userSelect: 'none',
  ':hover': {
    color: 'rgb(160, 160, 160)',
  },
  [mediaQuerys.sp]: { fontSize: 50 },
});

const Description = styled.p({
  marginTop: 15,
  fontSize: 25,
  [mediaQuerys.sp]: { fontSize: 18 },
});

const sourceCodePro = Source_Code_Pro({
  weight: ['500'],
  subsets: ['latin'],
  variable: '--source-code-pro',
});

const Input = styled.input({ display: 'none' });

interface Props {
  onUpload: (file: File) => void;
}

export const Welcome: React.FC<Props> = ({ onUpload }) => {
  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) onUpload(e.target.files[0]);
    },
    [onUpload],
  );

  return (
    <RootLayout>
      <Label className={sourceCodePro.className}>
        UPLOAD Images.
        <Input type="file" accept=".png, .jpg, .jpeg, .gif, .webp" onChange={onChangeHandler} />
      </Label>
      <Description>Protect your privacy</Description>
    </RootLayout>
  );
};
