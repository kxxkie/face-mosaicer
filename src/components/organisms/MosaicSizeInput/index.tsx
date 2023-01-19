import { Flex } from '@/components/atoms/Flex';
import styled from '@emotion/styled';

const Input = styled.input({ marginRight: 5 });

interface Props {
  mosaicSize: number;
  onChange: (size: number) => void;
}

export const MosaicSizeInput: React.FC<Props> = ({ mosaicSize, onChange }) => {
  return (
    <Flex>
      <Input
        type="range"
        name="volume"
        min="1"
        max="100"
        defaultValue={15}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div>{mosaicSize}</div>
    </Flex>
  );
};
