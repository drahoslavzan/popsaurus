import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThemeProvider } from 'styled-components';
import { IAppState } from '../../../background/store';
import { ISearchTerm } from '../../../api/ThesaurusApi';
import { themes, ThemeTypes } from '../../../components/styles/themes';
import Dialog from '../../../components/Dialog';

interface IAppProps {
	loading: boolean;
	search: ISearchTerm | null;
	theme: ThemeTypes;
	dispatch: Dispatch;
	onClose(): void;
}

const App = (props: IAppProps) => {
	return (
		<ThemeProvider theme={themes[props.theme]}>
			<Dialog
				loading={props.loading}
				search={props.search}
				onClose={props.onClose}
			/>
		</ThemeProvider>
	);
}

const mapStateToProps = (state: IAppState) => {
	return {
		theme: state.settings.theme,
		loading: state.data.loading,
		search: state.data.search,
	};
};

export default connect(mapStateToProps)(App);