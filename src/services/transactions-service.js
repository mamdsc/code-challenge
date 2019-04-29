import { databaseProvider } from '../database/local-storage';

const key = '@transaction';

export const transactionService = {
    getTransaction() {
        return databaseProvider.getItem(key);
    },
    async setTransaction(value) {
        return databaseProvider.setItem(key, value);
    },
    removeTransaction() {
        return databaseProvider.removeItem(key);
    },
    async clearTransaction() {
        return await databaseProvider.clear();
    }
}