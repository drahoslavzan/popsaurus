import React from 'react';
import styled from 'styled-components';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Table from './Table';
import { ISearchTerm } from '../api/ThesaurusApi';
import Spinner from './Spinner';

export interface IDialogProps {
	loading: boolean;
	search: ISearchTerm | null;
	onClose(): void;
}

// TODO: Font is white - https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
// TODO: Center spinner

const Dialog = (props: IDialogProps) => {
	const targetRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const handler = function (evt: KeyboardEvent) {
			if (evt.keyCode !== 27) return;
			props.onClose();
		}

		const targetElement = targetRef.current!;

		disableBodyScroll(targetElement);

		document.addEventListener("keydown", handler);

		return () => {
			clearAllBodyScrollLocks();
			document.removeEventListener("keydown", handler);
		};
	}, []);

	function content() {
		if (props.loading) return <Spinner />;
		return props.search ? <Table definitions={props.search.definitons} /> : null;
	}

	const title = props.loading ? '' : props.search?.term;

	return (
		<Modal ref={targetRef} className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
			<div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"/>
			<div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50">
				<div onClick={props.onClose} className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
					<svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
						<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
					</svg>
					<span className="text-sm">(ESC)</span>
				</div>

				<div className="py-4 text-left px-6 bg-blue-400">
					<div className="flex justify-between items-center">
						<p className="text-2xl font-bold">{title}</p>
						<div onClick={props.onClose} className="modal-close cursor-pointer z-50">
							<svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
								<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
							</svg>
						</div>
					</div>
				</div>

				<ModalContent className="px-4 py-4 overflow-y-auto">
					{content()}
				</ModalContent>
			</div>
		</Modal>
	);
}

export default Dialog;

const Modal = styled('div')`
	overflow: hidden;
	transition: opacity 0.25s ease;
	z-index: 2147483647;
`;

const ModalContent = styled('div')`
	max-height: 45vh;
`;
