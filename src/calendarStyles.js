import styled from "styled-components";

export const Calendar = styled.div`
  color: ${props => props.theme.colors.calendarText};
  min-width: 280px;
`;
export const Header = styled.div`
  background-color: ${props => props.theme.colors.headerBg};
  border-radius: 5px;
  font-size: 24px;
  text-align: center;
`;
export const Table = styled.table`
  background-color: ${props => props.theme.colors.tableBg};
  width: 100%;
`;
export const HeadCell = styled.th`
  background-color: ${props => props.theme.colors.headCellBg};
  font-size: 18px;
`;
export const Cell = styled.td`
  background-color: ${props => props.theme.colors.cellBg};
  border: none;
  border-radius: 10px;
  font-size: 20px;
  padding: 5px;
  text-align: right;
`;
export const CurrentCell = styled(Cell)`
  background-color: ${props => props.theme.colors.currentCellBg};
  color: ${props => props.theme.colors.currentCellText};
  font-weight: bold;
`;
export const EventCell = styled(Cell)`
  color: ${props => props.theme.colors.eventCellText};
  font-weight: bold;
`;
export const CurrentEventCell = styled(CurrentCell)`
  color: ${props => props.theme.colors.eventCellText};
`;
