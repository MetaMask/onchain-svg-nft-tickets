import styled from 'styled-components';

export const TicketsView = styled.div`
  padding-top: 0em;
  padding-right: 1em;
  padding-bottom: 1em;
  padding-left: 1em;
  border-bottom: 1px solid #333;
`;

export const TicketType = styled.div`
  border-radius: 10px;
  height: 220px;
  padding: 0.01em 1em;
  background-color: #110010;
  color: #BDCFE2;
  user-select: none;
  -webkit-box-shadow: 3px 7px 33px -14px rgba(17,63,112,1);
  -moz-box-shadow: 3px 7px 33px -14px rgba(17,63,112,1);
  box-shadow: 3px 7px 33px -14px rgba(17,63,112,1);
`;

export const HeadingText = styled.h1`
  color: #ccc;
`;

export const TicketTypeText = styled.h2`
  color: #93cae5;
`;

export const StyledAlert = styled.div`
  border-radius: 6px;
  padding: 0.5em;
  font-size: 10px;
  height: 40px;
  width: 100%;
  word-break: break-word;
  margin: 0.5em 0;
  background-color: #000;
  strong {
    color: #E2761B;
  }
`;