import styled from 'styled-components'

export const FlexContainer = styled.div`
  display: flex;
  align-self: flex-end;
  flex-direction: row;
  min-width: calc(100vw -2em);
  gap: ${props => props.gap || 0}em;
  row-gap: ${props => props.gap || 0}em;
`

export const FlexItem = styled.div`
  width: ${props => props.widthPercent || 50}%;
`

export const Button = styled.button`
  border-radius: 6px;

  box-shadow: 0 0 6px 0 rgba(157, 96, 212, 0.5);
  border: solid 1px transparent;
  background-image: linear-gradient(to right, #2bf9f9, #e757fa);
  background-origin: border-box;
  background-clip: content-box, border-box;

  background: linear-gradient(to right, #2bf9f9, #e757fa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  color: #FFF;
  font-size: ${props => props.textSize || 16}px;
  text-transform: uppercase;
  padding: 1em 0.75em;
  display: inline-block;
  margin-top: ${props => props.marginT | 0}em;
  margin-right: ${props => props.marginR | 0}em;
  margin-bottom: ${props => props.marginB | 0}em;
  margin-left: ${props => props.marginL | 0}em;
  cursor: pointer;
  cursor: hand;
  user-select: none;

  &:hover {
    background-color: #244982;
  }
  
  &:disabled {
    background-color: #244982;
    color: #7697C8;
    cursor: not-allowed;
  }
`