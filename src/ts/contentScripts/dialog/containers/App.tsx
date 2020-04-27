import React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { IAppState } from '../../../background/store';
import { themes, ThemeTypes } from '../../../components/styles/themes';
import Dialog from '../../../components/Dialog';

interface IAppProps {
	theme: ThemeTypes;
	onClose(): void;
}

const App = (props: IAppProps) => {
	return (
		<ThemeProvider theme={themes[props.theme]}>
			<Dialog onClose={props.onClose} />
		</ThemeProvider>
	);
}

const mapStateToProps = (state: IAppState) => {
	return {
		theme: state.settings.theme,
	};
};

export default connect(mapStateToProps)(App);