import {db} from "../Firebase/firebase"

const selectedItem = (id) =>{
    let item={}
    let stringId=''+id+'';
    return (dispatch)=>{
        dispatch({
            type: "CHANGE_LOADING"
        })
        let docRef=db.collection("items").doc(stringId)
        docRef.get().then(function(doc){
        if(doc.exists){
            item=doc.data();
            item={...item, id}
        } else{
            console.log("Something went wrong!")
        }
        dispatch({
            type: "ITEM_SELECTED",
            payload: item,
            id: id
        })
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    }
}
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
const editItem =(item)=>{
    return(dispatch)=>{
        db.collection("items").doc(item.id).set(item).then(function() {
            dispatch({
                type: "ITEM_CHANGE_LOADING"
            })
            dispatch({
                type:"ITEM_EDIT",
                payload: item
            })
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
}
const deleteItem = (id) =>{
    db.collection("items").doc(id).delete().then(function(){
        console.log("Activity successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    return{
        type: "ITEM_DELETE",
        id: id
    }
}
export {getItems, addItem, deleteItem, editItem, selectedItem};