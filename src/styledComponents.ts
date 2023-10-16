import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    height: 92vh;
    width: 100vw;
    background-color: #1A1F26;
`;

export const Header = styled.div`
    background-color: #1A1F26;
    border-bottom: 1px solid rgb(51, 48, 48);
    color: white;
    display: flex;
    align-items: center;
    font-size: x-large;
    text-align: right;
    padding: 15px 0;
    justify-content: right;
    @media (max-width: 768px) {
      font-size: medium;
    }
    label {
        margin: 0 10px;
        color: #eb720f;
    }
    button {
        cursor: pointer;
        margin-right: 50px;
        color: #eb720f;
        background-color: #1A1F26;
        border: none;
        @media (max-width: 768px) {
          margin-right: 10px;
        }
    }
    ul {
      li {
        margin: 10px 10px;
      }
    }
`;

export const Menu = styled.div`
    background-color: #242830;
    border-radius: 15px;
    width: 15%;
    margin: 3vh;
    position: relative;
    padding-top: 50px;
    ul {
        list-style-type: none;
        padding-inline-start: 0px;
    
        li {
            font-size: large;
            border-bottom: 1px solid rgb(51, 48, 48);
            padding: 15px 0;
            margin: 20px 0;
            a {
              margin-left: 20px;
            }
        }
    }
    @media (max-width: 768px) {
      display: none;
    }
`;

export const Box = styled.div`
background-color: #1A1F26;
width: 100%;
margin: 3vh;
position: relative;
button {
    background-color: #242830;
    border: none;
    border-radius: 10px;
    color: white;
    padding: 10px 10px;
    cursor: pointer;
    position: absolute;
    top: 12%;
    right: 0%
}`

export const Heading = styled.h1`
    color: white;
    position: absolute;
    top: 10%;
`

export const TableContainer = styled.div`
    width: 100%;
    position: absolute;
    top: 25%;
`
export const TableBodyContainer = styled.div`
    width: 100%;
    height: 55vh;
    overflow-y: auto;
`
export const TableHead = styled.div`
    width: 100%;
    div {
        color: white;
        margin: 10px 0;
    }
`
export const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-top: 1px solid rgb(51, 48, 48);
`;

export const TableHeader = styled.thead`
  background-color: #1A1F26;
`;

export const TableRow = styled.tr`
    display: flex;
    width: 100%;
    background-color: #242830;
`;

export const TableHeaderCell = styled.th`
  flex: 1;
  color: #d8e0ed;
  padding: 12px;
  text-align: center;
  background-color: #1A1F26;
`;

export const TableCell = styled.td`
  flex: 1;
  font-size: large;
  color: #FFFFFF;
  text-align: center;
  div {
    display: flex;
    flex-direction: column;
    p {
      padding: 0 auto !important;
      margin: 0;
    }
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 23px;
    width: 100px;
    position: relative;
  }
  @media (max-width: 768px) {
    font-size: medium;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalHeading = styled.h1`
  color:white;
`;

export const Label = styled.p`
    width: 81%;
    text-align: left;
    margin-bottom: 0px;
`

export const InputField = styled.input`
  width: 80%;
  padding: 5px 0;
  font-size: large;
  border: 1px solid white;
  background-color: #141517;
  margin-top: 2px;
  color: white;
`;

export const Button = styled.button`
  background-color: orange;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 30px;
  font-size: large;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 6px;
  right: 10px;
  background: none;
  border: none;
  font-size: 50px;
  cursor: pointer;
  color: white;
`;