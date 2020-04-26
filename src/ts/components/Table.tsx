import React from 'react';
import { IDefinition } from '../api/ThesaurusApi';

export interface ITableProps {
	definitions: IDefinition[],
}

const Table = (props: ITableProps) => {
	return (
		<>
			{props.definitions.map((d, i) => (
				<div key={`${d.definition}-${i}`} className={i > 0 ? "pt-4" : undefined}>
					<span className="text-lg font-bold">{d.definition}</span>
					<span className="text-sm italic pl-4">({d.pos})</span>
					<div className="grid grid-cols-2 pt-2">
						{d.synonyms.map((s, i) => (
							<div key={`${s}-${i}`}>{s}</div>
						))}
					</div>
				</div>
			))}
		</>
	);
}
;
export default Table;