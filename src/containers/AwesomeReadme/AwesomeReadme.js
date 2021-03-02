import React, { PureComponent } from 'react';
import classes from './AwesomeReadme.module.css';
import HeadingRenderer from './MarkdownHelper/HeadingRenderer';
import ReactMarkdown from 'react-markdown';
import TimeAgo from 'timeago-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';

import gfm from 'remark-gfm';
import axios from 'axios';
var toc = require('markdown-toc-unlazy');

class AwesomeReadme extends PureComponent {
  state = {
    md: `# Waiting for content loading...`,
    stars: 0,
    updateAt: null,
  };

  componentDidMount() {
    axios
      .get(
        `https://api.github.com/repos/${this.props.match.params.user}/${this.props.match.params.repo}/readme`
      )
      .then((res) => {
        axios
          .get(res.data.download_url)
          .then((res) => {
            this.setState({ md: res.data });
          })
          .catch((err) => {
            this.setState({ md: `Error when loading repo ${err.message}` });
          });
      })
      .catch((err) => {
        this.setState({ md: `Error when loading repo ${err.message}` });
      });

    axios
      .get(
        `https://api.github.com/repos/${this.props.match.params.user}/${this.props.match.params.repo}`
      )
      .then((res) => {
        this.setState({
          stars: res.data.stargazers_count,
          updateAt: res.data.pushed_at,
        });
      });
  }

  render() {
    return (
      <div className={classes.AwesomeReadme}>
        {this.props.showToc ? (
          <div className={classes.ReadmeCategory}>
            <ReactMarkdown children={toc(this.state.md).content} />
          </div>
        ) : null}

        <div className={classes.ReadmeInfo}>
          <a
            href={`https://github.com/${this.props.match.params.user}/${this.props.match.params.repo}`}
          >
            => Go to original repository
          </a>
          <div>
            <FontAwesomeIcon icon={faStar} /> stars:{this.state.stars}
          </div>
          <div>
            <FontAwesomeIcon icon={faClock} /> Last update at{' '}
            <TimeAgo datetime={this.state.updateAt} />
          </div>
        </div>

        <ReactMarkdown
          plugins={[gfm]}
          children={this.state.md}
          allowDangerousHtml
          renderers={{ heading: HeadingRenderer }}
        />
      </div>
    );
  }
}

export default AwesomeReadme;
