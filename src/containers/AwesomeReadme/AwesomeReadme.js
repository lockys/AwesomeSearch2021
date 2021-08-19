import React, { Component } from 'react';
import classes from './AwesomeReadme.module.css';
import TimeAgo from 'timeago-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faClock,
  faLongArrowAltUp,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
class AwesomeReadme extends Component {
  state = {
    _html: `<br/><b># Waiting for content loading...</b>`,
    headers: [],
    stars: 0,
    updateAt: null,
    user: '',
    repo: '',
    showTOC: false,
  };

  shouldComponentUpdate(_, nextState) {
    return (
      (this.state.user !== this.props.match.params.user &&
        this.state.repo !== this.props.match.params.repo) ||
      this.state._html !== nextState._html ||
      this.state.headers.length !== nextState.headers.length ||
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
          .replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
            if (!capture.includes('https')) {
              githubImageUrl =
                capture[0] === '/' ? githubImageUrl : githubImageUrl + '/';
              return match.replace(capture, `${githubImageUrl}${capture}`);
            } else {
              return match;
            }
          })
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

  componentDidUpdate() {
    this.makeAnchor();
    if (document.body.childNodes.length) {
      const headers = this.walk(document.body.childNodes, []);
      if (this.state.headers.length === 0 && headers.length !== 0) {
        this.setState({
          headers: headers,
        });
      }
    }
  }

  makeAnchor = () => {
    const links = document.querySelectorAll('a:not(.menu-item)[href^="#"]');

    if (links.length > 0) {
      for (let link of links) {
        let id = link.href.replace(`${document.location.origin}/#`, '');
        link.href = `/#/${this.props.match.params.user}/${this.props.match.params.repo}`;
        link.addEventListener('click', () => {
          this.headersOnClick(id);
        });
      }
    }
  };

  walk = (nodes, headers) => {
    nodes.forEach((node) => {
      let sub = Array.from(node.childNodes);
      if (sub.length) {
        headers = this.walk(sub, headers);
      }

      if (/h[2-6]/i.test(node.tagName)) {
        headers.push({
          id: node.childNodes[0].getAttribute('id'),
          level: parseInt(node.tagName.replace('H', '')),
          title: node.innerText.trim(),
        });
      }
    });

    return headers;
  };

  showTocHandler = () => {
    this.setState({
      showTOC: !this.state.showTOC,
    });
  };

  scrollToTop = () => {
    document.getElementById('anchor-top').scrollIntoView();
  };

  headersOnClick = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    document.getElementById(id).parentNode.style.backgroundColor = '#eee';

    setTimeout(() => {
      if (document.getElementById(id)) {
        document.getElementById(id).parentNode.style.backgroundColor = 'white';
      }
    }, 5000);

    this.setState({
      showTOC: false,
    });
  };

  buildBullet = (pattern, level) => {
    return Array(level).fill(pattern).join('');
  };

  render() {
    return (
      <div className={classes.AwesomeReadme}>
        <div id="anchor-top"></div>

        <div className={classes.ReadmeInfo}>
          <a
            className={classes.ViewOnGithubBtn}
            href={`https://github.com/${this.props.match.params.user}/${this.props.match.params.repo}`}
            target="_blank"
            rel="noreferrer"
          >
            View On Github
          </a>
          <span className={classes.TOCButton} onClick={this.showTocHandler}>
            Content
          </span>
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

          {this.state.showTOC && (
            <div className={classes.ReadmeCategory}>
              <FontAwesomeIcon
                onClick={this.showTocHandler}
                className={classes.ReadmeCategoryCloseButton}
                icon={faTimes}
              />
              {this.state.headers.map((header, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      this.headersOnClick(header.id);
                    }}
                  >
                    {this.buildBullet('-', header.level)} {header.title}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div dangerouslySetInnerHTML={{ __html: this.state._html }}></div>
        <div className={classes.scrollToTop} onClick={this.scrollToTop}>
          <FontAwesomeIcon icon={faLongArrowAltUp} /> Go To Top
        </div>
      </div>
    );
  }
}

export default AwesomeReadme;
