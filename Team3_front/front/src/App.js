import { Outlet } from 'react-router-dom';
import { styled, ThemeProvider } from 'styled-components';
import { GlobalStyle } from './style/globalStyle';
import { theme } from './style/theme.js';
import MainNavBar from './components/Header/MainNavBar.jsx';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainNavBar />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
