import React from 'react';
import { IDefinition } from '../../../api/ThesaurusApi';
import { removeDomAnchor } from '../../../scripts/dom';

export interface IDialogProps {
	dialogId: string,
	loading: boolean,
	definitions: IDefinition[],
}

const Dialog = (props: IDialogProps) => {
	const onClick = () => {
		removeDomAnchor(props.dialogId);
	}

	return (
		<div>
			<div className="h-screen w-full flex flex-col items-center justify-center bg-teal-lightest font-sans" />
			{props.loading
				? <p>aaa</p>
				: (<div className="h-screen w-full absolute flex items-center justify-center bg-modal">
					<div className="bg-white rounded shadow p-8 m-4 max-w-xs max-h-full text-center overflow-y-scroll">
						<div className="mb-4">
							<h1>Welcome!</h1>
						</div>
						<div className="mb-8">
							<p>Ready to get started? Keep scrolling to see some great components.</p>
						</div>
						<div className="flex justify-center">
							<button className="flex-no-shrink text-white py-2 px-4 rounded bg-teal hover:bg-teal-dark">Let's Go</button>
							<button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
								Button
							</button>
						</div>
					</div>
				</div>)
			}
		</div>
	);
}
;
export default Dialog;