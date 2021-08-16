import React from 'react';
import classes from './AwesomeLists.module.css';
import { Link } from 'react-router-dom';

const awesomeLists = ({ topic, subjects }) => {
  if (topic === '') {
    return (
      <div className={classes.HomePage}>
        <div className="alert alert-success">
          New 2021 version of Awesome Search is released!
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

        <p>
          <img
            src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg"
            alt="awesome badge."
          />
        </p>

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
            Navigate smoothly to what you want to see using "Table of content"
            if that repo has toc.
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
        </section>
        <hr />
        <section style={{ textAlign: 'right' }}>
          <a href="https://github.com/lockys/AwesomeSearchReact">
            Awesome search
          </a>{' '}
          is built with love by <a href="https://github.com/lockys">lockys</a>,{' '}
          <a href="https://github.com/John-Lin">John-Lin</a>
        </section>
      </div>
    );
  }

  subjects.sort((a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });

  return (
    <div className={classes.AwesomeLists}>
      <div className="alert alert-success">
        Lists are sorted alphabetically! You can easily find it :)
      </div>
      <h1>{topic}</h1>

      {subjects.map((subject, idx) => {
        return (
          <Link
            key={subject + idx}
            style={{
              margin: '10px',
              display: 'inline-block',
            }}
            to={`/${subject.repo}`}
          >
            # {subject.name}{' '}
          </Link>
        );
      })}
    </div>
  );
};

export default awesomeLists;
