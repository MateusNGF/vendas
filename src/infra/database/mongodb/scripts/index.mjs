import { MongoClient } from "mongodb"

(async () => {

    let connection; 

    try {
        const mongo_uri = process.argv[2]
        const db_name = process.argv[3]

        connection = await MongoClient.connect("mongodb://" + mongo_uri)
        const database = connection.db(db_name);

        await Promise.all([
            createIndexes(database)
        ])

    } catch (e) {
        console.log(e)
    } finally {
        connection.close()
        process.exit()
    }
})()



async function createIndexes(database) {
    await Promise.all([
        CreateIndexForUsers(),
        CreateIndexForProducts(),
        CreateIndexForAuthenticates(),
        CreateIndexForCompanies()
    ])
    function CreateIndexForUsers() {
        return database.collection('users').createIndexes([
            {
                name: 'id_idx',
                key: { 'id': 1 },
                unique: true
            }
        ])
    }

    function CreateIndexForAuthenticates() {
        return database.collection('authenticates').createIndexes([
            {
                name: 'id_idx',
                key: { 'id': 1 },
                unique: true
            },
            {
                name: 'email_idx',
                key: { 'email': 'text' },
                unique: true
            },
            {
                name: 'associeted_id_idx',
                key: { 'associeted_id': 1 },
                unique: true
            },
        ])
    }

    function CreateIndexForProducts() {
        return database.collection('products').createIndexes([
            {
                name: 'id_idx',
                key: { 'id': 1},
                unique: true
            },
            {
                name: 'name_idx',
                key: { 'name': 'text' }
            }
        ])
    }

    function CreateIndexForCompanies() {
        return database.collection('companies').createIndexes([
            {
                name: 'id_idx',
                key: { 'id': 1},
                unique: true
            },
            {
                name: 'name_idx',
                key: { 'corporate': 'text' }
            }
        ])
    }
}
