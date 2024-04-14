const { ObjectId, MongoClient } = require('mongodb');
require('dotenv').config()

module.exports = class Database {

    constructor(){

    }    
    load(){
        this.URL = process.env.MAIN_DATABASE_URL
        this.client = new MongoClient('mongodb://e-admin:P0o9i8u7y6.@10.13.37.10:21337/?authMechanism=DEFAULT');
        global.log(`|| --DATABASE-- | Loading..`)
    }
    async connect(){
        await this.client.connect().then(global.log(`|| --DATABASE-- | Connected!`), this.ready = true, this.database = this.client.db('home-assistant'))
    }
    async loadSystemConfigById(document_id){
        global.log(`|| --DATABASE-- | Loading file : ` + document_id)
        return await this.database.collection('config').findOne({id : document_id})
    }
    async insertSystemConfig(document){
        global.log(`|| --DATABASE-- | Inserting file : ` + document.id)
        await this.database.collection('config').insertOne(document)
    }
    async saveSystemConfig(document){
        global.log(`|| --DATABASE-- | Saving file : ` + document.id)
        await this.database.collection('config').findOneAndReplace({id : document.id}, document)
        console.log(document)
        fs.writeFile('../web/system.json', JSON.stringify(document, null, 2), (error) => {
            if (error) {
              console.log('An error has occurred ', error);
              return;
            }
            console.log('Data written successfully to disk');
          });
    }
    async loadObjectFromCollection(collection, document_id){
        return await this.database.collection(collection).findOne({id : document_id})
    }
    async saveObjectInCollection(collection, document){
        try{
            await this.database.collection(collection).insertOne(document)
        } catch (e){
            if(e.code == 11000){
                await this.database.collection(collection).findOneAndReplace({id : document.id}, document)
            } else {
                global.log(`|| --DATABASE- | Error : ` + e)
            }
        }
    }
    async loadEntityById(document_id){
        return await this.database.collection('entities').findOne({id : document_id})
    }
    async insertEntity(document){
        await this.database.collection('entities').insertOne(document)
    }
    async saveEntity(document){
        await this.database.collection('entities').findOneAndReplace({id : document.id}, document)
    }
    async loadRoomById(document_id){
        return await this.database.collection('rooms').findOne({id : document_id})
    }
    async insertRoom(document){
        await this.database.collection('rooms').insertOne(document)
    }
    async saveRoom(document){
        await this.database.collection('rooms').findOneAndReplace({id : document.id}, document)
    }
}           