import {Excel} from '@src/components/excel/Excel';
import {Header} from '@src/components/header/Header';
import {Toolbar} from '@src/components/toolbar/Toolbar';
import {Formula} from '@src/components/formula/Formula';
import {Table} from '@src/components/table/Table';
import './scss/index.scss';

const excel = new Excel('#app', {
	components: [Header, Toolbar, Formula, Table],
});

excel.render();
