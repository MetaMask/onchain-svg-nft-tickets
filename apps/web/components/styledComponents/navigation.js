import styled from 'styled-components'

export const NavigationView = styled.div`
  padding: 1em;
  border-bottom: 1px solid #333;
  background-color: #1D1E22;;
  color: #FFF;
`

export const Logo = styled.div`
  display: block;
  display: inline-block;
  line-height: 36px;
  height: 36px;
  background: linear-gradient(to right, #2bf9f9, #e757fa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const Balance = styled.div`
  display: inline-block;
  margin-left: 1em;
`

export const RightNav = styled.div`
  color: #ddd;
  margin-left: auto;
  line-height: 36px;
  height: 36px;
  width: ${props => (props.widthPixel += "px") || "100%"};
`