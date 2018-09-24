import moment from 'moment';
import models from '../../models';
const Report = models.Report;

class ReportService {
  getReportByDate(strDate) {
    return new Promise((resolve, reject) => {
      const startDate = moment(strDate).hour(0).minute(0).second(0).toISOString();
      const endDate = moment(strDate).hour(23).minute(59).second(59).toISOString();
      return Report.findOne({
        where: {
          createdAt: { $between: [startDate, endDate] }
        }
      })
        .then(report => {
          return resolve(report);
        })
        .catch(err => {
          return reject(err);
        })
    });
  }

  getReportsInDateRange(fromDate, toDate) {
    return new Promise((resolve, reject) => {
      return Report.findAll({
        where: {
          createdAt: { $between: [fromDate, toDate] }
        }
      })
        .then(reports => {
          return resolve(reports);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  createReport(params) {
    return new Promise((resolve, reject) => {
      return Report.create(params)
        .then(report => {
          return resolve(report);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
}

export default new ReportService();