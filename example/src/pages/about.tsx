import StyledButton from '../components/StyledButton';

const AboutPage = ({ generatedAt }) => (
  <div>
    <h1>About</h1>
    <StyledButton />
    <p>Generated at: {generatedAt}</p>
  </div>
);

export async function getStaticProps() {
  return {
    props: {
      generatedAt: new Date(Date.now()).toISOString()
    },
    revalidate: 5
  };
}

export default AboutPage;
