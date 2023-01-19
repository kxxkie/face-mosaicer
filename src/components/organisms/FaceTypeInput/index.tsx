import { Flex } from '@/components/atoms/Flex';
import styled from '@emotion/styled';

const Wrapper = styled(Flex)({ marginTop: 10, columnGap: 10 });
const Input = styled.input({ marginRight: 5 });

const TYPES = ['mosaic', 'emoji', 'own'] as const;

type FaceType = (typeof TYPES)[number];

const typeOptions = [
  { label: 'Mosaic', value: 'mosaic' },
  { label: 'Emoji', value: 'emoji' },
  { label: 'Your image', value: 'own' },
];

interface Props {
  faceType: FaceType;
  onChange: (type: FaceType) => void;
}

export const FaceTypeInput: React.FC<Props> = ({ onChange, faceType }) => {
  return (
    <Wrapper>
      {typeOptions.map((option) => (
        <label key={option.value}>
          <Input
            name="type"
            value={option.value}
            onChange={(e) => {
              const type = TYPES.find((t) => t === e.target.value) || 'mosaic';
              onChange(type);
            }}
            type="radio"
            checked={option.value === faceType}
          />
          {option.label}
        </label>
      ))}
    </Wrapper>
  );
};
