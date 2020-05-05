import React from 'react';
import { render } from 'react-dom';

import styles from './styles.scss';

export default function SearchInput(props) {
    return (
        <div className={styles.searchinput}>
          <input
            type="search"
            placeholder="Search or create&hellip;"
            value={props.query}
            ref={props.inputref}
            onChange={props.changeEvent}
          />
        </div>
      );
}