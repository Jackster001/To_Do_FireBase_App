import {db} from "../Firebase/firebase"

const getItems = () =>{
    let data=[];
    return (dispatch) => {
        db.collection("items").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            let items = doc.data();
            items= {id:doc.id,...items}
            data.push(items);
            })
            dispatch({
                type: "ITEMS_GET",
                payload: data
            })
         })
         .catch(function(error){
            console.log("Error getting document:", error);
         })
    }
}
const addItem= (item)=>{
    let data=[]
    data.push(item);
    db.collection("items").add({
        Date: item.Date,
        Time: item.Time,
        Description: item.des
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    return{
        type: "ITEM_ADD",
        payload: data
    }
}
export {getItems,addItem};