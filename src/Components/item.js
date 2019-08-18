import React from 'react';
import '../App.css';
import {editItem, deleteItem, selectedItem} from "../Actions/itemAction"
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {Modal} from "../Components/modal"
class Item extends React.Component {
   constructor(props){
      super(props)
      this.state={selectedActivity:{
         Date: null,
         Time: null,
         Description: null
      }, show: false};
   }
   onHandleDelete(id){
      alert("The activity has been deleted");
      this.props.deleteItem(id);
   }
   onChangeDate(event){
      this.setState({...this.state, selectedActivity:{...this.state.selectedActivity, Date: event.target.value}})
   }
   onChangeTime(event){
      this.setState({...this.state, selectedActivity:{...this.state.selectedActivity, Time: event.target.value}})
   }
   onChangeDes(event){
      this.setState({...this.state, selectedActivity:{...this.state.selectedActivity, Description: event.target.value}})
   }
   openEditModal(id){
      let show = true;
      this.props.selectedItem(id);
      this.setState({show: show});
      this.setState({selectedActivity: this.props.selected})
   }
   hideModal = () => {
      this.setState({ show: false });
   };
   onHandleEdit(){
      let newItem={
         id: this.props.selected.id,
         Date: this.props.selected.Date,
         Time: this.props.selected.Time,
         Description: this.props.selected.Description
      }
      let current= this.state.selectedActivity
      if(current.Date != null){
         newItem.Date=current.Date 
      }
      if(current.Time != null){
         newItem.Time =current.Time 
      }
      if(current.Description != null){
         newItem.Description=current.Description 
      }
      // console.log(newItem);
      
      this.props.editItem(newItem)
      this.hideModal();
   }
   render() {
      return (
         <tr className="item">
               <td className="itemDate"><center>{this.props.Date}</center></td>
               <td className="itemTime"><center>{this.props.Time}</center></td>
               <td className="itemDesc"><center>{this.props.desc}</center></td>
               <td>
                  <center>
                  <button className="edit_button" onClick={()=> this.openEditModal(this.props.id)}>Edit</button><br/>
                  <button className="delete_button" onClick={()=>this.onHandleDelete(this.props.id)}>Delete</button></center>
                  <Modal className="modal" show={this.state.show} handleClose={()=>this.hideModal()}>
                     <div className="modalContent">
                     <center><h2>Edit Activity</h2></center>
                        <h4>Current Date: {this.props.Date}</h4>
                        <h4>Current Time: {this.props.Time}</h4>

                     Change Date: <input className="missingTop" type="date" name="act_Date" size="32"  onChange={this.onChangeDate.bind(this)}/><br/><br/>
                     Change Time: <input className="missingTop"  type="time" name="act_Time" size="32" onChange={this.onChangeTime.bind(this)}/><br/><br/>
                     <textarea className="missingTop"  rows="4" cols="30" name="Description" placeholder={this.props.desc}  onChange={this.onChangeDes.bind(this)}></textarea><br/>
                     <br/>
                     <center><input className="add_button" type="submit" value="Add" onClick={()=> this.onHandleEdit(this.props.id)}/><br/></center>
                     </div>
                  </Modal>
               </td>
         </tr>
      );
   }
}
const mapStateToProps = state => ({
   items: state.itemState.items,
   selected: state.itemState.selected
});
export default compose(
   connect(
     mapStateToProps,
     {editItem, deleteItem, selectedItem}
   ),
)(Item);
