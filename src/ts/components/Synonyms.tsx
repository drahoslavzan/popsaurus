import React from 'react';
import { IDefinition, IDictRecord } from '../api/ThesaurusApi';

export interface ISynonymsProps {
	selection: 'synonyms' | 'antonyms';
	definitions: IDefinition[];
	onWord(word: string): void;
}

interface IDictf {
	[key: string]: IDictRecord[]
}

const Synonyms = (props: ISynonymsProps) => {
	function getColor(similarity: number): string {
		// PurgeCSS:
		// bg-yellow-100 bg-yellow-200 bg-yellow-300 bg-yellow-400 bg-yellow-500
		if (similarity >= 100) return "bg-yellow-500";
		if (similarity <= 0) return "bg-yellow-100";
		const shade = Math.round(4 * (similarity / 100)) * 100 + 100;
		return `bg-yellow-${shade}`;
	}

	return (
		<div>
			{props.definitions.map((d, i) => (
				<div key={`${d.definition}-${i}`} className="pt-4">
					<span className="text-lg font-bold">{d.definition}</span>
					<span className="text-sm italic pl-4">({d.pos})</span>
					<div className="grid grid-cols-2 pt-2">
						{((d as unknown) as IDictf)[props.selection].map((s, i) => (
							<div key={`${s.term}-${i}`} className={getColor(s.similarity)}>
								<button className="focus:outline-none" onClick={() => props.onWord(s.term)}>
									{s.term}
								</button>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default Synonyms;