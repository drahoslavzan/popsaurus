import retargetEvents from 'react-shadow-dom-retarget-events';

export const createDomAnchor = (id: string, style?: string): HTMLElement => {
	const anchor = document.createElement('div');
	anchor.id = id;
	const shadow = anchor.attachShadow({mode: "open"});
	document.body.insertBefore(anchor, document.body.childNodes[0]);
	if (style) {
		const linkElem = document.createElement('link');
		linkElem.setAttribute('rel', 'stylesheet');
		linkElem.setAttribute('href', style);
		shadow.appendChild(linkElem);
	}
	retargetEvents(shadow);
	const elem = document.createElement('div');
	shadow.appendChild(elem);
	return elem;
};

export const removeDomAnchor = (id: string) => {
	const elem = document.getElementById(id);
	elem?.remove();
}