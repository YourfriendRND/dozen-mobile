import { graphqlClient } from '../api/graphql-client';

type RegisterInput = {
    id?: string;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
}

type RegisterResponse = {
    register: {
        id: string;
        name: string;
        email: string;
        accessToken: string;
        refreshToken: string;
        createdAt: Date;
        updatedAt: Date;
    }
}

const REGISTER_MUTATION = `
    mutation Register($input: RegisterUserDto!) {
        register(registerUserDto: $input) {
            id
            name
            email
            accessToken
            refreshToken
            createdAt
            updatedAt
        }
    }
`;

export const authService = {
    async register(input: RegisterInput): Promise<RegisterResponse> {
        return graphqlClient.request(REGISTER_MUTATION, {
            input,
        })
    }
}
