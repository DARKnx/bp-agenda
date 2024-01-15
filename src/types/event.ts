type User = {
    name: string;
    id: string;
}

export interface IEventCreate {
    description: string;
    startDate: string;
    consultant: User;
    endDate: string;
    status: string;
    client: User;
    name: string;
}