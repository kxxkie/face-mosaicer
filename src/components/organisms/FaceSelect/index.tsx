import { colors } from '@/libs/styles';
import styled from '@emotion/styled';

const Select = styled.select({
  paddingBlock: 5,
  paddingInline: 10,
  borderRadius: 4,
  backgroundColor: colors.acceents[1],
  color: colors.foreground,
  outline: 'none',
  border: `1px solid ${colors.acceents[4]}`,
  display: 'block',
  fontSize: 14,
  maxWidth: 150,
});

interface Props {
  faceListLength: number;
  onChange: (faceNo: number) => void;
}

export const FaceSelect: React.FC<Props> = ({ onChange, faceListLength }) => {
  return (
    <Select onChange={(e) => onChange(Number(e.target.value))}>
      {Array(faceListLength)
        .fill(null)
        .map((_, i) => (
          <option key={i} value={i}>
            Face {i + 1}
          </option>
        ))}
    </Select>
  );
};
