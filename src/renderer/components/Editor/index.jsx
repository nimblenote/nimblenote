import React from 'react';
import { render } from 'react-dom';

import styles from './styles.scss';

export default function Editor(props) {
    return (
        <div className={styles.editor}>
          <textarea
            ref={props.inputref}
            onChange={props.changeEvent}
            value={props.content}
            disabled={props.disabled ? 'disabled' : null}
            placeholder={
              props.disabled ? 'No note selected' : 'Enter note contents...'
            }
          />
        </div>
      );
}