import React from 'react';
import { IDefinition, IDictRecord } from '../api/ThesaurusApi';

export interface ITableProps {
	definitions: IDefinition[],
}

interface IButton {
	label: string;
	selected: boolean;
	onClick(): void;
}

interface IDictf {
	[key: string]: IDictRecord[]
}

const Button = (props: IButton) => {
	// PurgeCSS:
	// bg-indigo-200 bg-indigo-300 bg-indigo-400 bg-indigo-500
	const shade = props.selected ? 500 : 300;

	return (
		<button onClick={props.onClick} className={`px-4 focus:outline-none bg-indigo-${shade} p-2 rounded-full text-white hover:bg-indigo-${shade - 100} m-2`}>{props.label}</button>
	);
}

const Table = (props: ITableProps) => {
	const [dictf, setDictf] = React.useState('synonyms');
	const [fsSel, setFsSel] = React.useState(true);
	const [faSel, setFaSel] = React.useState(false);

	function getColor(similarity: number): string {
		// PurgeCSS:
		// bg-yellow-100 bg-yellow-200 bg-yellow-300 bg-yellow-400 bg-yellow-500
		if (similarity >= 100) return "bg-yellow-500";
		if (similarity <= 0) return "bg-yellow-100";
		const shade = Math.round(4 * (similarity / 100)) * 100 + 100;
		return `bg-yellow-${shade}`;
	}

	function handleDictf(f: 'synonyms' | 'antonyms') {
		setDictf(f);
		if (f === 'synonyms') {
			setFsSel(true);
			setFaSel(false);
		} else {
			setFsSel(false);
			setFaSel(true);
		}
	}

	return (
		<>
			<div className="flex justify-center">
				<Button onClick={() => handleDictf('synonyms')} selected={fsSel} label="Synonyms" />
				<Button onClick={() => handleDictf('antonyms')} selected={faSel} label="Antonyms" />
			</div>
			{props.definitions.map((d, i) => (
				<div key={`${d.definition}-${i}`} className="pt-4">
					<span className="text-lg font-bold">{d.definition}</span>
					<span className="text-sm italic pl-4">({d.pos})</span>
					<div className="grid grid-cols-2 pt-2">
						{((d as unknown) as IDictf)[dictf].map((s, i) => (
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