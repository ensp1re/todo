export interface Task {
    id: number;
    title: string;
    description: string;
    status?: "pending" | "done";
    createdAt?: Date;
    updatedAt?: Date;
}


export interface Pagination {
    page: number;
    pageSize: number;
    total?: number;
    tasks: Task[];
}
