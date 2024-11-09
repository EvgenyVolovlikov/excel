import {DomListener} from '@core/DomListener';

interface IExcelOptions {
	listeners?: never[];
	name: string;
}

export class ExcelComponent extends DomListener {
	name: string;
	constructor(
		root,
		options: IExcelOptions
	) {
		super(root, options.listeners);
		this.name = options.name || '';
	}

	// Возвращает шаблон компонента
	toHTML() {
		return '';
	}

	init() {
		this.initDOMListeners();
	}

	destroy() {
		this.removeDOMListeners();
	}
}
