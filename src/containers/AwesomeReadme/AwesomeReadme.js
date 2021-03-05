import React, { Component } from 'react';
import classes from './AwesomeReadme.module.css';
import HeadingRenderer from './MarkdownHelper/HeadingRenderer';
import ReactMarkdown from 'react-markdown';
import TimeAgo from 'timeago-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';

import gfm from 'remark-gfm';
import axios from 'axios';
class AwesomeReadme extends Component {
  state = {
    md: `# Waiting for content loading...`,
    stars: 0,
    updateAt: null,
    user: '',
    repo: '',
  };

  shouldComponentUpdate() {
    return (
      this.state.user !== this.props.match.params.user &&
      this.state.repo !== this.props.match.params.repo
    );
  }

  componentDidMount() {
    axios
      .get(
        `https://api.github.com/repos/${this.props.match.params.user}/${this.props.match.params.repo}/readme`
      )
      .then((res) => {
        return axios.get(res.data.download_url);
      })
      .then((res) => {
        this.props.setMdHandler(res.data);

        this.setState({
          md: res.data,
          user: this.props.match.params.user,
          repo: this.props.match.params.repo,
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
