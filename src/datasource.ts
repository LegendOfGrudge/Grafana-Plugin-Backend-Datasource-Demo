import { DataSourceInstanceSettings, CoreApp, ScopedVars } from '@grafana/data';
import { DataSourceWithBackend, getTemplateSrv } from '@grafana/runtime';

import { MyQuery, MyDataSourceOptions, DEFAULT_QUERY } from './types';

export class DataSource extends DataSourceWithBackend<MyQuery, MyDataSourceOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
  }

  getDefaultQuery(_: CoreApp): Partial<MyQuery> {
    console.log("Using DEFAULT_QUERY");
    return DEFAULT_QUERY;
  }

  applyTemplateVariables(query: MyQuery, scopedVars: ScopedVars) {
    const appliedQuery = {
      ...query,
      queryText: getTemplateSrv().replace(query.queryText, scopedVars),
    };
    console.log('Applied Template Variables:', appliedQuery);
    return appliedQuery;
  }

  filterQuery(query: MyQuery): boolean {
    console.log('Filter Query:', query);
    return !!query.queryText;
  }
}
