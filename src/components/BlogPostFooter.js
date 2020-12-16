import React from "react";
import _ from "lodash";
import moment from "moment-strftime";

import { getData } from "../utils";

export default class BlogPostFooter extends React.Component {
  render() {
    let post = _.get(this.props, "page", null);
    let date_type = _.get(this.props, "date_type", null);
    return (
      <footer className="post-meta">
        <time
          className="published"
          dateTime={moment(_.get(post, "frontmatter.date", null)).strftime(
            "%Y-%m-%d %H:%M"
          )}
        >
          {date_type === "short"
            ? moment(_.get(post, "frontmatter.date", null))
                .lang("fr")
                .strftime("%d / %m /%y")
            : moment(_.get(post, "frontmatter.date", null)).strftime(
                "%A, %B %e, %Y"
              )}
        </time>
      </footer>
    );
  }
}
