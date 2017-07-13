import moment from 'moment';
import * as locales from 'moment/min/locales';

var date = {
  getDate(date){
    var timestamp = moment.unix(date);

    return timestamp.format('Do MMMM YYYY');
  },
  getCurrentDate(){
    moment.locale('be');
    return moment().format('LLL');
  }
};

module.exports = date;
