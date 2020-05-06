import React from 'react';
import { render } from 'react-dom';

import styles from './styles.scss';

export default function FileList(props) {
    let files = '';

    if (props.files) {
        files = props.files.map((item, i) => {
            const selected =
              props.selectedIndex.toString() === i.toString();

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
            value={props.selectedIndex}
            onClick={props.changeEvent}
            ref={props.inputref}
            size="5"
          >
            { files }
          </ul>
        </div>
      );
}