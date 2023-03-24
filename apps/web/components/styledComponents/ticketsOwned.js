import styled from "styled-components";

export const TicketsOwnedView = styled.div`
  padding: 1em;
  border-top: 1px solid #333;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 2}, ${props => props.columnWidth}px);
  grid-template-rows: repeat(${props => props.itemWidth || "300"}px);
`;

export const SvgItem = styled.div`
  width: 300px;
  padding: ${props => props.pad || 0}px;
`;