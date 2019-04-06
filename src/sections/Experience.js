import React from 'react';
import { Box, Flex } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown';
import Fade from 'react-reveal/Fade';
import styled from 'styled-components';
import Section from '../components/Section';
import Triangle from '../components/Triangle';
import markdownRenderer from '../components/MarkdownRenderer';
import { Card } from '../components/Card';

const Background = () => (
  <div>
    <Triangle
      color="secondaryLight"
      height={['50vh', '20vh']}
      width={['50vw', '49vw']}
      invertY
    />

    <Triangle
      color="secondaryLight"
      height={['50vh', '20vh']}
      width={['75vw', '50vw']}
      invertX
    />

    <Triangle
      color="backgroundDark"
      height={['25vh', '10vh']}
      width={['100vw', '100vw']}
    />
  </div>
);

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
`;

const Experience = () => (
  <Section.Container id="experience" Background={Background}>
    <Section.Header name="Experience" icon="🏢" label="person" />
    <StaticQuery
      query={graphql`
        query MyExperienceQuery {
          contentfulAbout {
            myExperience {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
          }
          file(name: { eq: "Resume" }) {
            id
            name
            publicURL
          }
        }
      `}
      render={data => {
        console.log(data);
        const { myExperience } = data.contentfulAbout;
        const resume = data.file;

        return (
          <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
            <Box width={[1, 1, 5 / 6]} px={[1, 2, 4]}>
              <Card p={0}>
                <TextContainer>
                  <p>
                    I have listed down some of my recent work experiences
                    briefly below. Feel free to download the{' '}
                    <b>
                      <a href={resume.publicURL} target="_blank" rel="noopener">
                        full resume here{' '}
                      </a>
                    </b>
                  </p>
                </TextContainer>
              </Card>
              <Fade bottom>
                <ReactMarkdown
                  source={myExperience.childMarkdownRemark.rawMarkdownBody}
                  renderers={markdownRenderer}
                />
              </Fade>
            </Box>
          </Flex>
        );
      }}
    />
  </Section.Container>
);

export default Experience;
