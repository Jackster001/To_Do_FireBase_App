import React from 'react';
import '../App.css';
import {deleteItem} from "../Actions/itemAction"
import { compose } from 'recompose';
import { connect } from 'react-redux';
class Item extends React.Component {
   render() {
      return (
         <tr className="item">
            <td className="itemDate"><center>{this.props.Date}</center></td>
            <td className="itemTime"><center>{this.props.Time}</center></td>
            <td className="itemDesc"><center>{this.props.desc}</center></td>
            <td><button onClick={()=>deleteItem(this.props.id)}>Delete</button></td>
         </tr>
      );
   }
}
const mapStateToProps = state => ({
   items: state.itemState.items,
});
export default compose(
   connect(
     mapStateToProps,
     {deleteItem}
   ),
)(Item);
