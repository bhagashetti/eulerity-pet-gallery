import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useSelection } from '../context/SelectionContext';

function AppHeader() {
  const { selectedCount } = useSelection();

  return (
    <Header>
      <LogoLink to="/">Pet Gallery</LogoLink>

      <RightSection>
        <SelectedBadge>
          Selected: <strong>{selectedCount}</strong>
        </SelectedBadge>

        <Nav>
          <StyledNavLink to="/">Gallery</StyledNavLink>
          <StyledNavLink to="/about">About</StyledNavLink>
        </Nav>
      </RightSection>
    </Header>
  );
}

export default AppHeader;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: min(1180px, calc(100% - 40px));
  margin: 16px auto 0;
  border: 1px solid rgba(31, 41, 51, 0.08);
  border-radius: 999px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 16px 35px rgba(31, 41, 51, 0.08);
  backdrop-filter: blur(16px);

  @media (max-width: 560px) {
    align-items: flex-start;
    border-radius: 24px;
    flex-direction: column;
  }
`;

const LogoLink = styled(NavLink)`
  color: #17202a;
  font-size: 1rem;
  font-weight: 900;
  text-decoration: none;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 560px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const SelectedBadge = styled.div`
  border-radius: 999px;
  padding: 9px 13px;
  background: rgba(108, 99, 255, 0.12);
  color: #4f46e5;
  font-size: 0.86rem;
  font-weight: 800;

  strong {
    color: #17202a;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledNavLink = styled(NavLink)`
  border-radius: 999px;
  padding: 9px 13px;
  color: #586474;
  font-size: 0.9rem;
  font-weight: 800;
  text-decoration: none;

  &.active {
    background: #17202a;
    color: #ffffff;
  }
`;