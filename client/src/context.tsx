// /src/context.tsx
// Context

import { Dispatch, StateUpdater, useState } from "preact/hooks";

interface Data {
    postId: number;
}

export class Context {
    token: string;
    setToken: Dispatch<StateUpdater<string>>;
    
    userId: number;
    setUserId: Dispatch<StateUpdater<number>>;

    page: string;
    setPage: Dispatch<StateUpdater<string>>;

    data: Data;
    setData: Dispatch<StateUpdater<Data>>;

    constructor() {
        [this.token, this.setToken] = useState('');
        [this.userId, this.setUserId] = useState(0);
        [this.page,  this.setPage] = useState('LOGIN');
        [this.data, this.setData] = useState({ postId: 0 });
    }
}