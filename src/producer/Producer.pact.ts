import { MessageProviderPact } from '@pact-foundation/pact';
import IRole from '../interfaces/Role';

const roleApiClient = {
    create: (): Promise<{ role: IRole }> => {
        return new Promise((resolve, _reject) => {
            const roleData = {
                _id: 'any_id',
                alias: 'ADM',
                description: 'Permissão para administradores',
                title: 'Admin',
                created_at: new Date(),
                updated_at: new Date(),
                deleted_at: undefined,
            };
            resolve({ role: roleData });
        });
    },
};

describe('RoleProducer', () => {
    const p = new MessageProviderPact({
        messageProviders: {
            create: () => roleApiClient.create(),
        },
        provider: 'RoleProvider',
        providerVersion: '1.0.0',
        publishVerificationResult: true,
        pactUrls: [
            'http://localhost:9292/pacts/provider/RoleProducer/consumer/RoleConsumer/latest',
        ],
    });

    it('Role producer should send messages with correct params', () => {
        return p.verify();
    });
});