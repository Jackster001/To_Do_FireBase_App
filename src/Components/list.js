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
        console.log(this.state.activities)
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
        this.setState({...this.state, Time: event.target.value})
    }
    onChangeDes(event){
        this.setState({...this.state, activityDes:event.target.value})
    }
    onTimeChange(time) {
        let number=""+time
        var timeSplit = number.split(':'),
          hours,
          minutes,
          meridian;
        hours = timeSplit[0];
        minutes = timeSplit[1];
        if (hours > 12) {
          meridian = 'PM';
          hours -= 12;
        } else if (hours < 12) {
          meridian = 'AM';
          if (hours === 0) {
            hours = 12;
          }
        } else {
          meridian = 'PM';
        }
        return(hours + ':' + minutes + ' ' + meridian);
      }
    render() {
      return (
         <div className="List">
            <center><h1>To do List</h1>
            <button className="add_button" onClick={()=> this.showModal()}>Add Activity</button></center>
            <Modal className="modal" show={this.state.show} handleClose={()=>this.hideModal()}>
                <div className="modalContent">
                <center><h2>Add Activity</h2>
                 Date: <input type="date" name="act_Date" size="32" data-date="" data-date-format="DD MMMM YYYY" onChange={this.onChangeDate.bind(this)}/><br/><br/>
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
                    <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.items.map((act, i)=>{
                        let time= this.onTimeChange(act.Time)
                        return (<Item 
                            key={i} 
                            id={act.id}
                            Date={act.Date} 
                            Time={time} 
                            desc={act.Description}
                            activityObject={act}
                        />)
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
