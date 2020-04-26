import React from 'react';
import styled, { keyframes } from 'styled-components';

const Spinner = () => (
	<div className="flex justify-center">
		<Loading className="ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16" />
	</div>
);

export default Spinner;

const anim = keyframes`
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
`;

const Loading = styled('div')`
	border-top-color: #3498db;
	animation: ${anim} 1.5s linear infinite;
`;
