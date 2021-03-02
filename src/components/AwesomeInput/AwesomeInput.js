import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import classes from './AwesomeInput.module.css';

const awesomeInput = (props) => {
  console.log(props);
  return (
    <div className={classes.AwesomeInput}>
      <fieldset className="form-group">
        <label htmlFor="subject">Awesome Search!</label>
        <input
          id="subject"
          type="text"
          placeholder="Try To Search Node.js"
          className="form-control"
          onChange={props.searchOnchange}
          value={props.value}
          onFocus={props.searchInputOnFocus}
        ></input>
        {props.showResult ? (
          <div className={classes.SearchResult}>
            <ul>
              {props.searchResult.length === 0 ? (
                <span>Hey, input something :)</span>
              ) : null}
              {props.searchResult.map((el, idx) => {
                return (
                  <li key={el.item.name + idx}>
                    <Link to={`${props.match.path}${el.item.repo}`}>
                      {el.item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </fieldset>
    </div>
  );
};

export default withRouter(awesomeInput);
