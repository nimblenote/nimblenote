import React from 'react';
import { render } from 'react-dom';

import styles from './styles.scss';

export default function FileList({
  selectedIndex = '',
  inputref = {},
  changeEvent = () => {},
  files = []
}) {
    if (files) {
        files = files.map((item, i) => {
            const selected =
              selectedIndex.toString() === i.toString();

            return (
              <li
                key={item}
                value={i}
                className={selected ? styles.selected : ''}
              >
                {item}
              </li>
            );
          });
    }

    return (
        <div className={styles.filelist} tabIndex="0">
          <ul
            role="presentation"
            value={selectedIndex}
            onClick={changeEvent}
            ref={inputref}
            size="5"
          >
            { files }
          </ul>
        </div>
      );
}