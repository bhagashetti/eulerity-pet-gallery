import styled from 'styled-components';

function AboutPage() {
  return (
    <PageShell>
      <AboutCard>
        <Eyebrow>About This Project</Eyebrow>

        <Title>Eulerity Pet Gallery</Title>

        <Description>
          This React and TypeScript application was built for the Eulerity
          front-end hackathon. It fetches pet data from the provided API and
          allows users to search, sort, select, view details, and download pet
          images.
        </Description>

        <FeatureList>
          <li>React with TypeScript</li>
          <li>styled-components for UI styling</li>
          <li>react-router-dom for gallery, detail, and about pages</li>
          <li>Custom hook for loading and managing API data</li>
          <li>Global selection state using Context</li>
          <li>Responsive image gallery</li>
        </FeatureList>
      </AboutCard>
    </PageShell>
  );
}

export default AboutPage;

const PageShell = styled.main`
  width: min(900px, 100%);
  margin: 0 auto;
  padding: 32px 20px 56px;
`;

const AboutCard = styled.section`
  border: 1px solid rgba(31, 41, 51, 0.08);
  border-radius: 34px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 24px 70px rgba(31, 41, 51, 0.1);

  @media (min-width: 760px) {
    padding: 46px;
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 10px;
  color: #6c63ff;
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 0;
  color: #17202a;
  font-size: clamp(2.3rem, 6vw, 4.5rem);
  line-height: 0.95;
  letter-spacing: -0.06em;
`;

const Description = styled.p`
  margin: 22px 0;
  color: #586474;
  font-size: 1.08rem;
  line-height: 1.7;
`;

const FeatureList = styled.ul`
  display: grid;
  gap: 10px;
  margin: 0;
  padding-left: 22px;
  color: #586474;
  line-height: 1.6;

  li::marker {
    color: #6c63ff;
  }
`;