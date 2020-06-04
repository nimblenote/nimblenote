const React = require('react');
const PropTypes = require('prop-types');
const styles = require('./styles.scss');

const Help = ({
	openExternalLink = () => {}
}) => {
	const metaKey = (process.platform === 'darwin') ? 'Cmd ⌘' : 'Ctrl';

	return (
		<div className={styles.help}>
			<h3>Help</h3>

			<ul>
				<li><a href="#keyboard-shortcuts">Keyboard shortcuts</a></li>
				<li><a href="#markdown-actions">Markdown actions</a></li>
				<li><a href="#navigating">Navigating</a></li>
				<li><a href="#get-support">Ask for support</a></li>
			</ul>

			<h4 id="keyboard-shortcuts">Keyboard shortcuts</h4>

			<h4>General</h4>

			<table>
				<tbody>
					<tr>
						<td><kbd>{metaKey}</kbd> + <kbd>D</kbd></td>
						<td>
							<p>Delete selected note in the note list</p>

						</td>
					</tr>
				</tbody>
			</table>

			<h5>Markdown actions</h5>

			<table>
				<tbody>
					<tr>
						<td><kbd>Alt</kbd> + <kbd>Enter ⏎</kbd></td>
						<td>
							<p>With the cursor positioned over a Markdown item</p>

						</td>
					</tr>
				</tbody>
			</table>

			<h5>Search box</h5>

			<table>
				<tbody>
					<tr>
						<td><kbd>Esc</kbd></td>
						<td>
							<p>Clear search box</p>
						</td>
					</tr>
					<tr>
						<td><kbd>Enter ⏎</kbd></td>
						<td>
							<p>Create or open note with name in search box and jump focus to the editor</p>
						</td>
					</tr>
					<tr>
						<td><kbd>Down ↓</kbd></td>
						<td>
							<p>Scroll down through notes list</p>
						</td>
					</tr>
					<tr>
						<td><kbd>Up ↑</kbd></td>
						<td>
							<p>Scroll up through notes list</p>
						</td>
					</tr>
				</tbody>
			</table>

			<h5>Editor</h5>

			<table>
				<tbody>
					<tr>
						<td><kbd>Esc</kbd></td>
						<td>
							<p>Close note and move focus to search box</p>
						</td>
					</tr>
				</tbody>
			</table>

			<h4 id="markdown-actions">Markdown actions</h4>

			<p>The following Markdown actions are supported:</p>

			<ul>
				<li>Toggling of checkbox list items</li>
				<li>Opening external links in your browser</li>
				<li>Naivgating between notes within nimblenote</li>
			</ul>

			<h4 id="navigating">Navigating</h4>

			<p>The top section of the screen is your search input. You use this to search for files, or to name and create a new file. You can access it anytime by pressing the <kbd>Esc</kbd> key on your keyboard.</p>
			<p>The middle section of the app is your list of notes or search results. You can navigate this by using the <kbd>Up ↑</kbd> or <kbd>Down ↓</kbd> arrows when the search input is in focus.</p>
			<p>The bottom section of the app is this section, the editor. This is where you can edit the contents of your notes. You can focus this section by pressing <kbd>Enter ⏎</kbd>. If a note is highlighted in the notes list, it will open that file. If no results are displayed, it will create a new note with the name of whatever is in the search input.</p>

			<h4 id="get-support">Ask for support</h4>

			<p>Still stuck? Head over to <a href="#" onClick={() => openExternalLink('https://nimblenote.app/support')}>nimblenote.app/support</a> for information on how to ask for support.</p>
		</div>
	);
};

Help.propTypes = {
	openExternalLink: PropTypes.func
};

module.exports = Help;
