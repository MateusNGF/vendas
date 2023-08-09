import {MongoClient} from 'mongodb'
(async ()=> {
    await Promise.all([
        createIndexes()
    ])
})()


async function createIndexes() {
    let connection = null
    try {
        connection = await MongoClient.connect('mongodb://localhost:27017')
        
        await Promise.all([
            CreateIndexForUsers(),
            CreateIndexForProducts(),
            CreateIndexForAuthenticates()
        ])
        
    } catch (e) {
        console.log(e)
        process.exit()
    } finally {
        connection.close()
    }

    function CreateIndexForUsers() {
        return connection.db('vendas').collection('users').createIndexes([
            {
                name : 'id_idx',
                key : { 'id' : '2d' },
                unique : true
            }
        ])
    }
    
    function CreateIndexForAuthenticates(){
        return connection.db('vendas').collection('authenticates').createIndexes([
            {
                name : 'id_idx',
                key : { 'id' : '2d' },
                unique : true
            },
            {
                name : 'email_idx',
                key : { 'email' : '2d' },
                unique : true
            },
            {
                name : 'associeted_id_idx',
                key : { 'associeted_id' : '2d' },
                unique : true
            },
        ])
    }
    
    function CreateIndexForProducts(){
        return connection.db('vendas').collection('products').createIndexes([
            {
                name : 'id_idx',
                key : { 'id' : '2d' },
                unique : true
            },
            {
                name : 'name_idx',
                key : { 'name' : 'text' }
            }
        ])
    }
}

