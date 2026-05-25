import { Link } from 'react-router-dom';
import styled from 'styled-components';

function NotFoundPage() {
  return (
    <PageShell>
      <Card>
        <Eyebrow>404</Eyebrow>
        <Title>Page not found</Title>
        <Description>
          The page you are looking for does not exist.
        </Description>
        <HomeLink to="/">Back to gallery</HomeLink>
      </Card>
    </PageShell>
  );
}

export default NotFoundPage;

const PageShell = styled.main`
  width: min(800px, 100%);
  margin: 0 auto;
  padding: 32px 20px 56px;
`;

const Card = styled.section`
  border: 1px solid rgba(31, 41, 51, 0.08);
  border-radius: 34px;
  padding: 36px;
  background: rgba(255, 255, 255, 0.86);
  text-align: center;
  box-shadow: 0 24px 70px rgba(31, 41, 51, 0.1);
`;

const Eyebrow = styled.p`
  margin: 0 0 10px;
  color: #6c63ff;
  font-size: 0.9rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 0;
  color: #17202a;
  font-size: clamp(2.3rem, 6vw, 4rem);
  line-height: 1;
`;

const Description = styled.p`
  margin: 18px 0 24px;
  color: #586474;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  border-radius: 999px;
  padding: 12px 18px;
  background: #6c63ff;
  color: #ffffff;
  font-weight: 900;
  text-decoration: none;
`;