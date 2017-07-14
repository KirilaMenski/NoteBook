import moment from 'moment';
import * as locales from 'moment/min/locales';

var date = {
  getDate(date){
    var dateFormat = moment(''+date);
    return dateFormat.format('YYYY-MM-DDTHH:mm:00.000')+'Z';
  },
  getCurrentDate(){
    moment.locale('be');
    return moment().format('YYYY-MM-DD HH:mm');
  }
};

module.exports = date;
