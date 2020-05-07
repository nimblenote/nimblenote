import React from 'react';
import { render } from 'react-dom';

import styles from './styles.scss';

export default function Editor({
  content = '',
  inputref = {},
  changeEvent = () => {},
  disabled = true
}) {
    return (
        <div className={styles.editor}>
          <textarea
            ref={inputref}
            onChange={changeEvent}
            value={content}
            disabled={disabled ? 'disabled' : null}
            placeholder={
              disabled ? 'No note selected' : 'Enter note contents...'
            }
          />
        </div>
      );
}