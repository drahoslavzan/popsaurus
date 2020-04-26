import React from 'react';
import styled from 'styled-components';
import Table from './Table';
import { ISearchTerm } from '../api/ThesaurusApi';
import Spinner from './Spinner';

export interface IDialogProps {
	loading: boolean;
	search: ISearchTerm | null;
	onClose(): void;
}

const Dialog = (props: IDialogProps) => {
	React.useEffect(() => {
		const handler = function (evt: KeyboardEvent) {
			if (evt.keyCode !== 27) return;
			props.onClose();
		}

		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, []);

	return (
		<Modal className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
			<div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"/>
			<div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
				<div onClick={props.onClose} className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
					<svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
						<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
					</svg>
					<span className="text-sm">(ESC)</span>
				</div>

				{/* Add margin if you want to see some of the overlay behind the modal */}
				<div className="modal-content py-4 text-left px-6">
					<div className="flex justify-between items-center pb-3">
						<p className="text-2xl font-bold">{props.search?.term}</p>
						<div onClick={props.onClose} className="modal-close cursor-pointer z-50">
							<svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
								<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
							</svg>
						</div>
					</div>

					<Spinner />

					{props.search
						? <Table definitions={props.search.definitons} />
						: null}
				</div>
			</div>
		</Modal>
	);
}

export default Dialog;

const Modal = styled('div')`
	transition: opacity 0.25s ease;
	z-index: 2147483647;
`;
