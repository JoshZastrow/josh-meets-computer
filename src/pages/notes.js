import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import styled from "styled-components";

import CategoryHeader from "../components/CategoryHeader";

const SLink = styled(Link)`
  text-decoration: none;
  color: #28aa55;
  &:hover {
    color: #23984c;
  }
`;

const Title = styled.h1`
  color: black;
  border-bottom: 1px grey solid;
`;

class Notes extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    return (
      <div>
        <Helmet title="Notes" />
        <Title>Notes</Title>
        {posts.map(post => {
          if (
            post.node.path !== "/404/" &&
            post.node.frontmatter.category == "Notes"
          ) {
            return (
              <div key={post.node.frontmatter.path}>
                <h3>
                  <SLink to={post.node.frontmatter.path}>
                    {post.node.frontmatter.title}
                  </SLink>
                </h3>
                <small>{post.node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default Notes;

export const pageQuery = graphql`
  query NotesQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
            title
            category
          }
        }
      }
    }
  }
`;
