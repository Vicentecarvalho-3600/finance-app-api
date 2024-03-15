import { PostgresHelper } from "../../db/postgres/helper"

export class PostgresDeleteUserRepository {
    async execute(userId) {
        const deletedUser = await PostgresHelper.query(
            "DELETE FROM users WHERE id = $1 RETURNIG *",
            [userId],
        )

        return deletedUser[0]
    }
}
