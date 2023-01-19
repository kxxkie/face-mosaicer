import Image from 'next/image';
import { colors } from '@/libs/styles';
import styled from '@emotion/styled';

const Wrapper = styled.ul({ display: 'flex', gap: 10, flexWrap: 'wrap' });
const EmojiList = styled.li(({ active }: { active: boolean }) => ({
  position: 'relative',
  cursor: 'pointer',
  '::before': active
    ? {
        content: '""',
        position: 'absolute',
        bottom: -10,
        width: '100%',
        height: 3,
        borderRadius: 2,
        backgroundColor: colors.foreground,
      }
    : {},
}));

const EXPRESSIONS = ['happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised', 'neutral'] as const;

type Expression = (typeof EXPRESSIONS)[number];

interface Props {
  faceExpression: Expression;
  onChange: (exp: Expression) => void;
}

export const EmojiInput: React.FC<Props> = ({ faceExpression, onChange }) => {
  return (
    <Wrapper>
      {EXPRESSIONS.map((expression) => (
        <EmojiList key={expression} active={faceExpression === expression} onClick={() => onChange(expression)}>
          <Image src={`/emojis/${expression}-face.svg`} alt={`${expression} face`} width={40} height={40} />
        </EmojiList>
      ))}
    </Wrapper>
  );
};
