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

class App extends React.Component<IAppProps> {
	render() {
		return (
			<ThemeProvider theme={themes[this.props.theme]}>
				<Dialog
					loading={this.props.loading}
					search={this.props.search}
					onClose={this.props.onClose}
				/>
			</ThemeProvider>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		theme: state.settings.theme,
		loading: state.data.loading,
		search: state.data.search,
	};
};

export default connect(mapStateToProps)(App);