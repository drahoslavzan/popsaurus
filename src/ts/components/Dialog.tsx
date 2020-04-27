import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { IAppState } from '../background/store';
import Content from './Content';

export interface IDialogProps {
	onClose(): void;
}

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = IDialogProps & PropsFromRedux;

const Dialog = (props: Props) => {
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

	function playAudio(url: string) {
		var audio = new Audio(url);
		audio.play();
	}

	const audio = props.loading ? null : props.audio;
	const title = (<>
		<span>{props.search}</span>
		{audio ?
			<span className="pl-2 inline-block align-middle">
				<button onClick={() => playAudio(audio)}>
					<svg xmlns="http://www.w3.org/2000/svg" version="1.0"  width="18" height="18" viewBox="0 0 75 75">
						<path d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z" style={{ stroke: '#111', strokeWidth: 5, strokeLinejoin: 'round', fill: '#111' }} />
						<path d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6" style={{ fill: 'none', stroke: '#111', strokeWidth: 5, strokeLinecap: 'round' }} />
					</svg>
				</button>
			</span>
		: null}
	</>);

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

				<Content />
			</div>
		</Modal>
	);
}

const mapStateToProps = (state: IAppState) => {
	return {
		search: state.data.search,
		loading: state.data.loading,
		audio: state.data.audio,
	};
};

const connector = connect(mapStateToProps);

export default connector(Dialog);

const Modal = styled('div')`
	overflow: hidden;
	transition: opacity 0.25s ease;
	z-index: 2147483647;
`;
