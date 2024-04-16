const db = require("../helpers/firebase");
const { getDatabase, ref, set, get, child, push, update } = require("firebase/database");
// const getDatabase = require("firebase/database").getDatabase;
// const ref = require("firebase/database").ref;
// const set = require("firebase/database").set;
// const get = require("firebase/database").get;



class ShopService {
    async getAllProducts(){
        try{
            const reference = ref(getDatabase());
            return await get(child(reference, 'products/'))
            .then( snapshot =>{
                console.log(snapshot.val())
                return snapshot.val();
            });

        }catch( error ){
            return error.message;
        }
    }
    async newProduct(data){
        const dataStruct = Object.keys(data);
        const productStruct = ['name', 'quantity', 'price'];

        if(dataStruct.length !== productStruct.length) return false;

        if( !data.hasOwnProperty('name') || !data.hasOwnProperty('quantity') || !data.hasOwnProperty('price'))   return false;

        if( !data.name.trim() || data.quantity === null || data.quantity < 0 || data.price === null || data.price < 0)  return false;

        if(typeof data.name !== 'string' || typeof data.quantity !== 'number' || typeof data.price !== 'number') return false;

        const productId = crypto.randomUUID();
        const reference = ref(getDatabase(), 'products/' + productId);
        await set(reference, data);
        return true;
    }
    async buyProduct(data){
        const dataStruct = Object.keys(data);
        const productStruct = ['productId', 'quantity'];

        if(dataStruct.length !== productStruct.length) return false;

        if( !data.hasOwnProperty('productId') || !data.hasOwnProperty('quantity') )   return false;

        if( !data.productId.trim() || data.quantity === null || data.quantity < 0 )  return false;

        if( typeof data.productId !== 'string' || typeof data.quantity !== 'number' ) return false;


        const reference = ref(getDatabase());

        let quantity;

        await get(child(reference, 'products/'+ data.productId + '/'))
        .then( snapshot =>{

            quantity = snapshot.val().quantity;

        });

        data.quantity = quantity - data.quantity;

        // Get a key for a new Post.
        // const newPostKey = push(child(reference), 'products').key;
        const updates = {};
        updates['/products/' + data.productId + '/quantity'] = data.quantity;
        console.log(updates)
        await update(reference, updates);
        return true;
    }
}

const shopManager = new ShopService();
module.exports = { shopManager };