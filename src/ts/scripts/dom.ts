
export const createDomAnchor = (id: string, css?: string): HTMLElement => {
	const anchor = document.createElement('iframe');
	anchor.setAttribute('style', 'position:fixed; width: 100%; height: 30%; bottom: 0; background-color: yellow; border: none');
	anchor.id = id;
	document.body.insertBefore(anchor, document.body.childNodes[0]);
	const frame = anchor.contentWindow ? anchor.contentWindow.document : anchor.contentDocument;
	const elem = document.createElement('div');
	const body = frame!.body;
	body.insertBefore(elem, body.childNodes[0]);
	body.setAttribute('style', 'width: 100%; height: 100%; background-color: blue;');

	if (css) {
		const head = frame!.head;
		var link = document.createElement('link');
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = css;
		head.appendChild(link)
	}

	return elem;
};


export const removeDomAnchor = (id: string) => {
	const elem = document.getElementById(id);
	elem?.remove();
}