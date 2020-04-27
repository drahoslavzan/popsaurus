import React from 'react';
import { ISentence } from '../api/YourDictionaryApi';

export interface ISentencesProps {
	word: string,
	sentences: ISentence[];
}

const Sentences = (props: ISentencesProps) => {
	function makeSentence(s: string) {
		return s.replace(props.word, () => `<strong>${props.word}</strong>`);
	}

	return (
		<div>
			{props.sentences.map((s, i) => (
				<div key={`${s.sentence}-${i}`} className="pt-4 text-base">
					<span dangerouslySetInnerHTML={{ __html : makeSentence(s.sentence) }} />
					<hr className="border-solid border-1 border-gray-600 mt-4" />
				</div>
			))}
		</div>
	);
};

export default Sentences;