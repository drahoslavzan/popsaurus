import retargetEvents from 'react-shadow-dom-retarget-events';

export const createDomAnchor = (id: string, style?: string): ShadowRoot => {
	const anchor = document.createElement('div');
	anchor.id = id;
	const shadow = anchor.attachShadow({mode: "open"});
	document.body.appendChild(anchor);
	if (style) {
		const linkElem = document.createElement('link');
		linkElem.setAttribute('rel', 'stylesheet');
		linkElem.setAttribute('href', style);
		shadow.appendChild(linkElem);
	}
	retargetEvents(shadow);
	return shadow;
};

export const removeDomAnchor = (id: string) => {
	const elem = document.getElementById(id);
	elem?.remove();
}