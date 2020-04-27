import React from 'react';

export type Selection = 'synonyms' | 'antonyms' | 'sentences';

interface IMenuProps {
	selection: Selection;
	onSelection(s: Selection): void;
}

interface IButton {
	label: string;
	selected: boolean;
	onClick(): void;
}

const Button = (props: IButton) => {
	// PurgeCSS:
	// bg-indigo-200 bg-indigo-300 bg-indigo-400 bg-indigo-500
	const shade = props.selected ? 500 : 300;

	return (
		<button onClick={props.onClick} className={`px-4 focus:outline-none bg-indigo-${shade} p-2 rounded-full text-white hover:bg-indigo-${shade - 100} m-2`}>{props.label}</button>
	);
}

const Menu = (props: IMenuProps) => {
	function handleSelected(s: Selection) {
		props.onSelection(s);
	}

	return (
		<div className="flex justify-center">
			<Button onClick={() => handleSelected('synonyms')} selected={props.selection === 'synonyms'} label="Synonyms" />
			<Button onClick={() => handleSelected('antonyms')} selected={props.selection === 'antonyms'} label="Antonyms" />
			<Button onClick={() => handleSelected('sentences')} selected={props.selection === 'sentences'} label="Sentences" />
		</div>
	);
};

export default Menu;