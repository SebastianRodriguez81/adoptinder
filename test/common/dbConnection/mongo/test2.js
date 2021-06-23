import MongoClient from 'mongodb'



async function main() {

    const uri = "mongodb+srv://sebastian:sebowi0510@cluster1.lc14u.mongodb.net/tp2db?retryWrites=true&w=majority";


    const client = await new MongoClient(uri);
    console.log('client')


    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        console.log('conectado')

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);