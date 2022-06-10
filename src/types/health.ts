export interface List {
    page: number;
}
export interface ListPerCount extends List {
    count: number;
}

export interface Result {
    title: string;
    date: string;
    url: string;
}