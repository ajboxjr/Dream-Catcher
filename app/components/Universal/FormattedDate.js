import React, {Component} from 'react';
import {View, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import Moment from 'react-moment';
import 'moment-timezone';

class FormattedDate extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<Moment style={this.props.style} tz={DeviceInfo.getTimezone()} element={Text} format="MMMM Do YYYY hh:mmA">
      {this.props.date}
    </Moment>)
  }
}
export default FormattedDate;
