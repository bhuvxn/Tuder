import app from './server.js' //importing app from server
import mongodb from "mongodb" //importing mongodb   
import dotenv from "dotenv"

async function main(){

    dotenv.config()
    const client = new mongodb.MongoClient(
        process.env.TUDER_DB_URL
    )
    const port = process.env.PORT||8000

    try{
        //connecting to our mongodb database
        await client.connect()
        app.listen(port, ()=>{
            console.log('backend server is running on port' + port)
        })
    }catch(e){
        console.error(e);
        process.exit(1)
    }
}


main().catch(console.error)