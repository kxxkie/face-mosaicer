import styled from '@emotion/styled';
import { Icon } from '@iconify/react';
import { ReactNode } from 'react';

const Wrapper = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  columnGap: 10,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  fontSize: 40,
  p: {
    fontSize: 16,
  },
});

interface Props {
  children: ReactNode;
}

export const LoadingCover: React.FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <Icon icon="eos-icons:loading" />
      {children}
    </Wrapper>
  );
};
