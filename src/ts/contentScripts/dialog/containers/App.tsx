import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThemeProvider } from 'styled-components';
import { IAppState } from '../../../background/store';
import { themes, ThemeTypes } from '../../../components/styles/themes';
import Dialog, { IDialogProps } from './Dialog';

interface IAppProps {
	dialogId: string,
	theme: ThemeTypes;
	dispatch: Dispatch;
	dialogProps: IDialogProps,
}

class App extends React.Component<IAppProps> {
	render() {
		return (
			<ThemeProvider theme={themes[this.props.theme]}>
				<Dialog {...this.props.dialogProps} dialogId={this.props.dialogId} />
			</ThemeProvider>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		theme: state.settings.theme,
		dialogProps: {
			dialogId: '',
			loading: state.data.loading,
			definitions: state.data.definitions,
		},
	};
};

export default connect(mapStateToProps)(App);