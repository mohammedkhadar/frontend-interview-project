import styled from 'styled-components';
import theme from './spinner.module.scss';

interface Props {
  className?: Optional<string>;
  size?: number;
  color?: string;
}

const Spinner = styled.div`
  height: ${(props: Props): number => props?.size || 32}px;
  aspect-ratio: 1 / 1;

  border-radius: 50%;
  border-style: solid;
  border-color: ${theme.grey6};
  border-top-color: ${(props: Props): string => props?.color || theme.dixaBlue};
  animation: spin 0.8s linear infinite;
  box-sizing: border-box;
  border-width: ${(props: Props): number =>
    Math.max(Math.floor((props?.size || 32) / 10), 1)}px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
