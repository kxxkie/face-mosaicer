import { colors } from '@/libs/styles';
import styled from '@emotion/styled';
import { Icon } from '@iconify/react';
import { ComponentProps } from 'react';

const Btn = styled.button({
  maxWidth: 250,
  border: `1px solid ${colors.acceents[2]}`,
  borderRadius: 6,
  transition: 'all 0.3s',
  cursor: 'pointer',
  color: colors.acceents[6],
  paddingBlock: 10,
  display: 'grid',
  placeItems: 'center',
  ':hover': { borderColor: colors.foreground, color: colors.foreground },
});

interface Props extends ComponentProps<typeof Btn> {
  isLoading: boolean;
}

export const Button: React.FC<Props> = ({ isLoading, children, ...rest }) => {
  return <Btn {...rest}>{isLoading ? <Icon icon="eos-icons:three-dots-loading" /> : children}</Btn>;
};
