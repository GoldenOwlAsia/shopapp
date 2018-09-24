import EventEmitter from 'events';
import ReportService from '../orders/service';

class ReportEvent extends EventEmitter {};

const reportEvent = new ReportEvent();

reportEvent.on('updateRevenue', function(ISODate, revenue) {
  ReportService.getReportByDate(ISODate)
    .then(report => {
      if(!report) {
        const params = {
          totalRevenue: revenue
        };
        return ReportService.createReport(params)
      } else {
        const totalRevenue = report.totalRevenue + revenue;
        return report.update({ totalRevenue: totalRevenue });
      }
    })
    .then(result => {
      console.log('update revenue event success');
    })
    .catch(err => {
      console.log('update Revenue event');  
      console.log('the error: ', err);
    });
});



export default reportEvent;