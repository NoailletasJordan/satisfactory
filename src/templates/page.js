import React from "react";
import _ from "lodash";
import { graphql } from "gatsby";

import { Layout } from "../components/index";
import { withPrefix, htmlToReact } from "../utils";

// minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: { eq: $url }) {
      id
    }
  }
`;

export default function Page(props) {
  console.log(props);
  return (
    <Layout {...props}>
      <div className="outer">
        <div className="inner-medium">
          <article className="post post-full">
            <header className="post-header">
              <h1 className="post-title">
                {_.get(props, "pageContext.frontmatter.title", null)}
              </h1>
            </header>
            {_.get(props, "pageContext.frontmatter.image", null) && (
              <div className="post-thumbnail">
                <img
                  src={withPrefix(
                    _.get(props, "pageContext.frontmatter.image", null)
                  )}
                  alt={_.get(props, "pageContext.frontmatter.image_alt", null)}
                />
              </div>
            )}
            {_.get(props, "pageContext.frontmatter.subtitle", null) && (
              <div className="post-subtitle">
                {htmlToReact(
                  _.get(props, "pageContext.frontmatter.subtitle", null)
                )}
              </div>
            )}
            <div className="post-content">
              {htmlToReact(_.get(props, "pageContext.html", null))}
            </div>
          </article>
        </div>
      </div>
    </Layout>
  );
}
