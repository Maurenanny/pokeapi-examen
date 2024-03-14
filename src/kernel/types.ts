export type Entity<TIdentifier extends number | string> = {
    id?: TIdentifier;
  };
  export type FieldThead = {
    key: string;
    show?: boolean;
    label: string;
    sort?: string;
    visible?: boolean;
    class?: string | Array<string>;
    thClass?: string;
    tdClass?: string;
    thStyle?:Object;
    sortable?: boolean;
    stickyColumn?:boolean;
  };
  export type ResponseApi<T> = {
    status: number;
    result: boolean;
    updated?: boolean;
    message?: string;
    entities?: T[];
    fields?: FieldThead[];
    entity?: T;
    total?: number;
  };