import React from 'react';
import { IDefinition } from '../api/ThesaurusApi';

export interface ITableProps {
	definitions: IDefinition[],
}

const Table = (props: ITableProps) => {
	function getColor(similarity: number): string {
		if (similarity >= 100) return "bg-yellow-500";
		if (similarity <= 0) return "bg-yellow-100";
		const shade = Math.round(4 * (similarity / 100)) * 100 + 100;
		return `bg-yellow-${shade}`;
	}

	return (
		<>
			{props.definitions.map((d, i) => (
				<div key={`${d.definition}-${i}`} className={i > 0 ? "pt-4" : undefined}>
					<span className="text-lg font-bold">{d.definition}</span>
					<span className="text-sm italic pl-4">({d.pos})</span>
					<div className="grid grid-cols-2 pt-2">
						{d.synonyms.map((s, i) => (
							<div key={`${s.term}-${i}`} className={getColor(s.similarity)}>{s.term}</div>
						))}
					</div>
				</div>
			))}
		</>
	);
}
;
export default Table;