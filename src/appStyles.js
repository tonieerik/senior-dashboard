import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
      background-color: ${props => props.theme.colors.background};
      color: ${props => props.theme.colors.text};
      font-family: 'Varela Round', sans-serif;
      font-size: 14px;
      margin: 0;
    }
  `;

export const AppContainer = styled.div`
  font-size: 22px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

export const ClockContainer = styled.div`
  background-color: ${props => props.theme.colors.clockContainerBg};
  border-bottom: 1px solid ${props => props.theme.colors.clockContainerBorder};
  color: ${props => props.theme.colors.clockContainer};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 36px;
  padding: 0 10px;
  text-align: center;
  width: 100%;

  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
    font-size: 26px;
    height: 100vh;
  }
`;
export const CurrentDateTime = styled.div`
  margin: auto;
`;
export const Black = styled.div`
  color: ${props => props.theme.colors.text};
`;

export const CalendarContainer = styled.div`
  border-top: 2px solid ${props => props.theme.colors.calendarContainerBorder};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
export const EventContainer = styled.div`
  flex-grow: 1;
  font-size: 26px;
  margin-left: 20px;
`;
export const EventTitle = styled.div`
  background-color: ${props => props.theme.colors.eventTitleBg};
  border-bottom: 1px solid ${props => props.theme.colors.eventTitleBorder};
  border-radius: 5px 0 0 5px;
  padding: 5px;
`;
export const TimeTo = styled.span`
  background-color: ${props => props.theme.colors.timeToBg};
  border-radius: 5px;
  color: ${props => props.theme.colors.timeToText};
  font-size: 14px;
  margin-left: 10px;
  padding: 5px;
`;
export const Event = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.eventBorder};
  padding: 10px;
`;
export const EventDetails = styled.div`
  padding: 10px 0 0 20px;
`;
export const EventHeader = styled.span`
  color: ${props => props.theme.colors.eventHeaderText};
`;
export const EventDescription = styled.span`
  color: ${props => props.theme.colors.eventDescriptionText};
  font-size: 20px;
`;
