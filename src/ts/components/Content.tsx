import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { IAppState } from '../background/store';
import { search, populateSens, populateTerm } from '../background/store/data/actions';
import ThesaurusApi, { ISearchTerm } from '../api/ThesaurusApi';
import YourDictionaryApi, { ISearchSentences } from '../api/YourDictionaryApi';
import Synonyms from './Synonyms';
import Sentences from './Sentences';
import Spinner from './Spinner';
import Menu, { Selection } from './Menu';

type PropsFromRedux = ConnectedProps<typeof connector>;

const thesApi = new ThesaurusApi();
const ydApi = new YourDictionaryApi();

const Content = (props: PropsFromRedux) => {
	const [sel, setSel] = React.useState<Selection>('synonyms');

	function fetchData(search: string) {
		thesApi.getDefinitions(search).then(r => {
			props.setTerm(r);
		});
		ydApi.getSentences(search, 30).then(s => {
			props.setSens(s);
		});
	}

	React.useEffect(() => {
		fetchData(props.search);
	}, []);

	function handleSelection(s: Selection) {
		setSel(s);
	}

	function handleWord(word: string) {
		props.setSearch(word);
		fetchData(word);
	}

	return props.loading ? <Spinner /> : (
		<ModalContent className="px-4 py-4 w-full overflow-y-auto">
			<Menu selection={sel} onSelection={handleSelection} />
			{sel === 'sentences'
				? props.sens === null
					? <Spinner />
					: <Sentences word={props.search} sentences={props.sens?.sentenes || []} />
				: <Synonyms onWord={handleWord} selection={sel} definitions={props.terms?.definitons || []} />}
			<div className="flex pt-4 justify-end text-blue-500">
				<a target="_blank" href={props.more as string}>more</a>
			</div>
		</ModalContent>
	);
}

const dispatchProps = {
	setSearch: (word: string) => search(word),
	setTerm: (res: ISearchTerm) => populateTerm(res),
	setSens: (res: ISearchSentences) => populateSens(res),
};

const mapStateToProps = (state: IAppState) => {
	return {
		search: state.data.search,
		loading: state.data.loading,
		terms: state.data.terms,
		sens: state.data.sens,
		more: state.data.more,
	};
};

const connector = connect(mapStateToProps, dispatchProps);

export default connector(Content);

const ModalContent = styled('div')`
	max-height: 40vh;
	height: 40vh;

	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
		border-radius: 10px;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
	}
`;
