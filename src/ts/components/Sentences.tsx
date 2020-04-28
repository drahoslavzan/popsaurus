import React from 'react';
import { ISentence } from '../api/YourDictionaryApi';

export interface ISentencesProps {
	word: string,
	sentences: ISentence[];
}

const Divider = () => <hr className="border-solid border-1 border-gray-600 mt-4" />;

const Sentences = (props: ISentencesProps) => {
	const regex = new RegExp(props.word, "ig");

	function makeSentence(s: string) {
		return s.replace(regex, match => `<b>${match}</b>`);
	}

	return (
		<div>
			{props.sentences.length > 0 ? <Divider /> : null}
			{props.sentences.map((s, i) => (
				<div key={`${s.sentence}-${i}`} className="pt-4 text-base">
					<span dangerouslySetInnerHTML={{ __html : makeSentence(s.sentence) }} />
					<Divider />
				</div>
			))}
		</div>
	);
};

export default Sentences;