import styled from 'styled-components';

/**
 * Vertically centered Views
 **/
export const VFlex = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px;
`;

/**
 * Horizontally centered Views that wrap on line end
 **/
export const HFlex = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  width: 100%;
`;
