import react from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const styles = {
  header: {
    background: "black",
    height: "140px",
  },
  text: {
    color: "white",
  },
  icon: {
    color: "white",
    margin: "20px",
  },
  navlink: {
    textDecoration: "none",
    color: "white",
  },
};
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 75px;
  height:40px;
  padding: 20px 10px;
  margin: 10px;
  border-radius: 4px;
  background: black;
  font-family: Montserrat;
  font-size:20px;
  text-decoration:none;
`;

const Header = () => {
  return (
    <div style={styles.header}>
      <Container>
      <NavLink to="/" style={styles.navlink}>
        Home
      </NavLink>
      </Container>
    </div>
  );
};

export default Header;
