import React from 'react';
import { render } from 'react-dom';

import styles from './styles.scss';

export default function TitleBar() {
	return (
		<div className={styles.titlebar}>
			<span>Noted</span>
		</div>
	)
}
