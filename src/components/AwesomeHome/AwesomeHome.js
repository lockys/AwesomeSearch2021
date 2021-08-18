import classes from './AwesomeHome.module.css';

const Homepage = () => {
  return (
    <div className={classes.HomePage}>
      <div className="alert alert-info">
        New 2021 version of Awesome Search is released! Please play around with
        it!
      </div>

      <p
        style={{
          backgroundColor: '#eee',
          padding: '5px',
          color: 'grey',
          textAlign: 'center',
        }}
      >
        <span style={{ color: 'red' }}>Awesome</span>
        <span style={{ color: 'blue' }}>Search</span> makes you find what you
        want in awesome lists more quickly.
      </p>

      <section>
        <a
          href="https://github.com/sindresorhus/awesome"
          rel="noreferrer"
          target="_blank"
        >
          <img
            src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg"
            alt="awesome badge."
          />
        </a>
      </section>

      <h1>Why we did this</h1>
      <section>
        There are soooo many awesome lists in the Awesome lists. <br />
        We hope to build a web application to access them more quickly .
      </section>

      <h1>Features</h1>
      <ul>
        <li>
          Access and search every awesome repo listed in{' '}
          <a href="https://github.com/sindresorhus/awesome">
            sindresorhus/awesome
          </a>{' '}
          inside of a single page without pain.
        </li>
        <li>
          Access an awesome repo by{' '}
          <a href="https://dev.awesomelists.top/#/sindresorhus/awesome-nodejs">
            https://dev.awesomelists.top/#/sindresorhus/awesome-nodejs
          </a>
          .(you can bookmark your favorite one!)
        </li>
        <li>
          Navigate smoothly to what you want to see using "Table of content" if
          that repo has toc.
        </li>
      </ul>
      <h1>Get started with a repo</h1>
      <section>
        Check out -{' '}
        <a href="https://dev.awesomelists.top/#/sindresorhus/awesome-nodejs">
          Awesome Node.js
        </a>
        !
      </section>
      <h1>Credit to</h1>
      <section>
        <a href="https://github.com/sindresorhus/awesome">
          sindresorhus/awesome
        </a>
        ,{' '}
        <a href="https://github.com/sindresorhus/awesome/graphs/contributors">
          all authors of awesome lists
        </a>
        ,{' '}
        <a
          href="https://github.com/egoist/hack"
          rel="noreferrer"
          target="_blank"
        >
          egoist/hack
        </a>{' '}
        (theme, css framework)
      </section>
      <hr />
      <section>
        <a href="https://github.com/lockys/AwesomeSearchReact">
          Awesome search
        </a>{' '}
        is built with love by:
        <br />
        <br />
        <div className="media">
          <div className="media-left">
            <div className="avatarholder">
              <img
                style={{ width: 'inherit' }}
                src="https://avatars.githubusercontent.com/u/3911469?v=4"
                alt="Calvin Jeng"
              />
            </div>
          </div>
          <div className="media-body">
            <div className="media-heading">
              Calvin Jeng{' '}
              <a
                href="https://github.com/lockys"
                target="_blank"
                rel="noreferrer"
              >
                @lockys
              </a>
            </div>
            <div className="media-content">
              Calvin Jeng is a software developer working for DBS - 星展銀行,
              previously a fullstack engineer at Garmin.
            </div>
          </div>
        </div>
        <div className="media">
          <div className="media-left">
            <div className="avatarholder">
              <img
                style={{ width: 'inherit' }}
                src="https://avatars.githubusercontent.com/u/4214069?v=4"
                alt="Che-Wei Lin"
              />
            </div>
          </div>
          <div className="media-body">
            <div className="media-heading">
              Che-Wei Lin{' '}
              <a
                href="https://github.com/John-Lin"
                target="_blank"
                rel="noreferrer"
              >
                @John-Lin
              </a>
            </div>
            <div className="media-content">
              Che-Wei Lin is a site reliability engineer(SRE) at Line corp,
              previously a cloud architect at Tencent.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
