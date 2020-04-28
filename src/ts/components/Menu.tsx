import React from 'react';

export type Selection = 'synonyms' | 'antonyms' | 'sentences';

interface IMenuProps {
	selection: Selection;
	onSelection(s: Selection): void;
}

interface IButton {
	label: string;
	selected: boolean;
	last?: boolean;
	onClick(): void;
}

const Button = (props: IButton) => {
	return (
		<li className={`flex-1 ${props.last ? '' : 'mr-2'}`}>
			{props.selected
				? <button onClick={props.onClick} className="block w-full border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white">{props.label}</button>
				: <button onClick={props.onClick} className="block w-full border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4">{props.label}</button>
			}
		</li>
	);
}

const Menu = (props: IMenuProps) => {
	function handleSelected(s: Selection) {
		props.onSelection(s);
	}

	return (
		<ul className="flex">
			<Button onClick={() => handleSelected('synonyms')} selected={props.selection === 'synonyms'} label="Synonyms" />
			<Button onClick={() => handleSelected('antonyms')} selected={props.selection === 'antonyms'} label="Antonyms" />
			<Button onClick={() => handleSelected('sentences')} selected={props.selection === 'sentences'} label="Sentences" last />
		</ul>
	);
};

export default Menu;