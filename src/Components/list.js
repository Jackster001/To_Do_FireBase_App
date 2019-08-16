import React from 'react';
import '../App.css';
import Item from "../Components/item";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {Modal} from "../Components/modal"
import {getItems, addItem} from '../Actions/itemAction'
class List extends React.Component {
    constructor(props){
        super(props)
        this.state={activities:[{}],show: false, Date: "",Time: "", activityDes:""};
    }
    componentDidMount(){
        this.props.getItems();
        let temp = Object.assign([{}], this.props.items)
        this.setState({activities: temp})
        console.log(console.log(this.state.activities))
    }
    showModal = () => {
        let show=true
        this.setState({show: show});
        console.log("button changed to"+ this.state.show + show);
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };
    insert(Date, Time, des){
        let activity={Date,Time, des}
        this.props.addItem(activity);
        this.props.getItems();
        this.hideModal();
    }
    onChangeDate(event){
        this.setState({...this.state, Date:event.target.value})
    }
    onChangeTime(event){
        this.setState({...this.state, Time:event.target.value})
    }
    onChangeDes(event){
        this.setState({...this.state, activityDes:event.target.value})
    }

    render() {
      return (
         <div className="List">
            <center><h1>To do List</h1>
            <button className="add_button" onClick={()=> this.showModal()}>Add Activity</button></center>
            <Modal className="modal" show={this.state.show} handleClose={()=>this.hideModal()}>
                <div className="modalContent">
                <center><h2>Add Activity</h2>
                 Date: <input type="date" name="act_Date" size="32" onChange={this.onChangeDate.bind(this)}/><br/><br/>
                 Time: <input type="time" name="act_Time" size="32" onChange={this.onChangeTime.bind(this)}/><br/><br/>
                 <textarea rows="4" cols="50" name="Description" placeholder="Description"  onChange={this.onChangeDes.bind(this)}></textarea><br/>
                 {/* <input type="text" name="des"/><br/><br/> */}<br/></center>
                <center><input className="add_button" type="submit" value="Add" onClick={()=> this.insert(this.state.Date, this.state.Time, this.state.activityDes)}/><br/></center>
                </div>
            </Modal>
            <br/>
            <table className="list_of_activities" border="1" cellSpacing="0">
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Activities</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.items.map((act, i)=>{
                        // console.log(act.Time)
                        return (<Item key={i} Date={act.Date} Time={act.Time} desc={act.Description}/>)
                    })}
                </tbody>
            </table>
         </div>
      );
   }
}
const mapStateToProps = state => ({
    items: state.itemState.items,
});
export default compose(
    connect(
      mapStateToProps,
      {getItems, addItem}
    ),
  )(List);
