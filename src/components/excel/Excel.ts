import {createDomClass} from '@core/dom';

export class Excel {
	el;
	components;
	constructor(selector: string, options: {components: string;}) {
		this.el = createDomClass(selector);
		this.components = options.components || [];
	}

	getRoot() {
		const root = createDomClass.create('div', 'excel');

		this.components = this.components.map((Component) => {
			const el = createDomClass.create('div', Component.className);
			const component = new Component(el);
			// DEBUG
			// if (component.name) {
			// 	window['c' + component.name] = component;
			// }
			el.html(component.toHTML());
			root.append(el);
			return component;
		});

		return root;
	}

	render() {
		this.el.append(this.getRoot());
		this.components.forEach((component) => component.init());
	}
}
