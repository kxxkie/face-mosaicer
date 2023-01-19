import styled from '@emotion/styled';

const Input = styled.input({ marginRight: 5 });

interface Props {
  hidden: boolean;
  onChange: (hidden: boolean) => void;
}

export const SwitchVisibility: React.FC<Props> = ({ hidden, onChange }) => {
  return (
    <label>
      <Input type="checkbox" name="disable" checked={hidden} onChange={(e) => onChange(e.target.checked)} />
      Switch to {hidden ? 'show' : 'hide'} face
    </label>
  );
};
