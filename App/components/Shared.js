import React from 'react'
import styled from 'styled-components'
import Colors from '../Themes/Colors'

/**
 * Vertically centered Views
 **/
export const VFlex = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`

/**
 * Horizontally centered Views that wrap on line end
 **/
export const HFlex = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Cell = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: ${Colors.gray};
  border-bottom-width: 1px;
  padding: 8px;
  padding-left: 16px;
  margin-bottom: 8px;
  background-color: ${Colors.white};
`
export const CellText = styled.Text`
  font-size: 15px;
`
