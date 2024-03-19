import {MongoClient} from 'mongodb'
(async ()=> {
    let connection = null

    const alert = setInterval(() => {
        console.warn("Try connection with database at running pre-scripts ...")
    }, 1000)

    connection = await MongoClient.connect('mongodb://127.0.0.1:27017')
    clearInterval(alert)

    try{

        await Promise.all([
            createIndexes(connection)
        ])

    }catch(e){
        console.log(e)
        process.exit()
    }finally{
        await connection.close()
    }
})()


/**
 * Create all index of aplication
 * @param {MongoClient} connection 
 * @returns {void}
 */
async function createIndexes(connection) {

    await Promise.all([
        CreateIndexForUsers(),
        CreateIndexForProducts(),
        CreateIndexForAuthenticates()
    ])

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

