import React, { Component } from 'react';
import classes from './AwesomeReadme.module.css';
import TimeAgo from 'timeago-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faClock,
  faLongArrowAltUp,
} from '@fortawesome/free-solid-svg-icons';
import toc from 'markdown-toc-unlazy';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
class AwesomeReadme extends Component {
  state = {
    _html: `<br/><b># Waiting for content loading...</b>`,
    stars: 0,
    updateAt: null,
    user: '',
    repo: '',
    md: '## loading',
    showTOC: false,
  };

  shouldComponentUpdate(_, nextState) {
    return (
      (this.state.user !== this.props.match.params.user &&
        this.state.repo !== this.props.match.params.repo) ||
      this.state.md !== nextState.md ||
      this.state.showTOC !== nextState.showTOC
    );
  }

  componentDidMount() {
    axios
      .get(
        `https://api.github.com/repos/${this.props.match.params.user}/${this.props.match.params.repo}/readme`,
        {
          headers: {
            Accept: 'application/vnd.github.v3.html',
          },
        }
      )
      .then((res) => {
        const user = this.props.match.params.user;
        const repo = this.props.match.params.repo;
        let githubImageUrl = `https://raw.githubusercontent.com/${user}/${repo}/master`;
        let _html = res.data
          .replace(
            /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
            function (match, capture) {
              if (!capture.includes('https')) {
                githubImageUrl =
                  capture[0] === '/' ? githubImageUrl : githubImageUrl + '/';
                return match.replace(capture, `${githubImageUrl}${capture}`);
              } else {
                return match;
              }
            }
          )
          .replace(/user-content-/g, '');

        this.setState({
          _html: _html,
          user: user,
          repo: repo,
        });
      })
      .catch((err) => {
        this.setState({ _html: `Error when loading repo ${err.message}` });
      });

    // axios
    //   .get(
    //     `https://api.github.com/repos/${this.props.match.params.user}/${this.props.match.params.repo}/readme`,
    //     {
    //       headers: {
    //         Accept: 'application/vnd.github.v3.raw',
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     this.setState({ md: res.data });
    //   })
    //   .catch((err) => {
    //     this.setState({ _html: `Error when loading repo ${err.message}` });
    //   });

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

  showTocHandler = () => {
    this.setState({
      showTOC: !this.state.showTOC,
    });
  };

  scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <div className={classes.AwesomeReadme}>
        <div id="anchor-top"></div>

        <div className={classes.ReadmeInfo}>
          <a
            href={`https://github.com/${this.props.match.params.user}/${this.props.match.params.repo}`}
            target="_blank"
            rel="noreferrer"
          >
            View On Github
          </a>
          <span>
            <strong>{this.props.match.params.repo}</strong>
          </span>
          <div>
            <FontAwesomeIcon icon={faStar} /> stars:{this.state.stars}
          </div>
          <div>
            <FontAwesomeIcon icon={faClock} /> Last update at{' '}
            <TimeAgo datetime={this.state.updateAt} />
          </div>
        </div>

        {this.state.showTOC === true ? (
          <div className={classes.ReadmeCategory}>
            <ReactMarkdown
              children={
                toc(this.state.md, {
                  firsth1: true,
                  maxdepth: 3,
                }).content
              }
            />
          </div>
        ) : null}

        <div dangerouslySetInnerHTML={{ __html: this.state._html }}></div>
        <div className={classes.scrollToTop} onClick={this.scrollToTop}>
          <a href="#anchor-top">
            <FontAwesomeIcon icon={faLongArrowAltUp} /> Go To Top
          </a>
        </div>
      </div>
    );
  }
}

export default AwesomeReadme;
