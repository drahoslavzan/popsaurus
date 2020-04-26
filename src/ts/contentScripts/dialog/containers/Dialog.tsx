import React from 'react';
import Table from './Table';
import { IDefinition } from '../../../api/ThesaurusApi';
import { removeDomAnchor } from '../../../scripts/dom';

export interface IDialogProps {
	dialogId: string;
	loading: boolean;
	definitions: IDefinition[];
}

const Dialog = (props: IDialogProps) => {
	const onClick = () => {
		removeDomAnchor(props.dialogId);
	}

	return (
		<div>
			<Table definitions={props.definitions} />
			<button onClick={onClick}>CLOSE</button>
			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
				Close
			</button>
		</div>
	);
}

export default Dialog;
