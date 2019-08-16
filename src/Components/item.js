import React from 'react';
import '../App.css';

class Item extends React.Component {
   render() {
      return (
         <tr className="item">
            <td className="itemDate"><center>{this.props.Date}</center></td>
            <td className="itemTime"><center>{this.props.Time}</center></td>
            <td className="itemDesc"><center>{this.props.desc}</center></td>
         </tr>
      );
   }
}
export default Item