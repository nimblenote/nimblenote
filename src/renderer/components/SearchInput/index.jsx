import React from 'react';
import { render } from 'react-dom';

import styles from './styles.scss';

export default function SearchInput({
	query = '',
	inputref = {},
	changeEvent = () => {}
}) {
	return (
		<div className={styles.searchinput}>
			<input
				type="search"
				placeholder="Search or create&hellip;"
				value={query}
				ref={inputref}
				onChange={changeEvent}
			/>
		</div>
	);
}
