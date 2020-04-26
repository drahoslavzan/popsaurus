
export const createDomAnchor = (id: string, cn?: string): HTMLElement => {
	const anchor = document.createElement('div');
	anchor.id = id;
	if (cn) {
		anchor.className = cn;
	}
	document.body.insertBefore(anchor, document.body.childNodes[0]);
	return anchor;
};

export const removeDomAnchor = (id: string) => {
	const elem = document.getElementById(id);
	elem?.remove();
}