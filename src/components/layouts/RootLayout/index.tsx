import styled from '@emotion/styled';
import { Poppins } from '@next/font/google';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

const Main = styled.main({
  maxWidth: 1250,
  marginInline: 'auto',
  paddingInline: 50,
  paddingTop: 100,
  paddingBottom: 50,
  minHeight: '100vh',
});

interface Props {
  children: React.ReactNode;
}

export const RootLayout: React.FC<Props> = ({ children }) => {
  return <Main className={poppins.className}>{children}</Main>;
};
