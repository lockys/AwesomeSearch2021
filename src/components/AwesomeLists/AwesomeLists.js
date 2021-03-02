import React from 'react';
import classes from './AwesomeLists.module.css';
import { Link } from 'react-router-dom';

const awesomeLists = ({ subjects }) => {
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
