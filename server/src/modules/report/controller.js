import moment from 'moment';
import AuthService from '../authentication/authService';
import { ROLES } from '../../utils/constant';
import { AuthorizationError } from '../authentication/errors';
import ReportService from './service';
import OrderService from '../orders/service';

class ReportController {
  reportByWeek(_, args, ctx) {
    return new Promise((resolve, reject) => {
      try {
        const curUser = AuthService.getCurrentUserFromContext(ctx);
        if(curUser.role !== ROLES.OWNER) {
          throw new AuthorizationError();
        }
        const startDate = moment().startOf('week');
        const endDate = moment().endOf('week');

        return ReportService.getReportsInDateRange(startDate.toISOString(), endDate.toISOString())
          .then(reports => {
            if (!reports || !reports.length) {
              return resolve(JSON.stringify({}));
            }
            const result = {};
            reports.forEach(r => {
              const createdAt = moment(r.createdAt).utc();
              const dayOfWeek = createdAt.day();
              switch(dayOfWeek) {
                case 0: result['Sun'] = r.totalRevenue; break;
                case 1: result['Mon'] = r.totalRevenue; break;
                case 2: result['Tue'] = r.totalRevenue; break;
                case 3: result['Wed'] = r.totalRevenue; break;
                case 4: result['Thu'] = r.totalRevenue; break;
                case 5: result['Fri'] = r.totalRevenue; break;
                case 6: result['Sat'] = r.totalRevenue; break;
              }
            });

            return resolve(JSON.stringify(result));
          })
      } catch(err) {
        return reject(err);
      }
    });
  }

  reportByMonth(_, args, ctx) {
    return new Promise((resolve, reject) => {
      try {
        const curUser = AuthService.getCurrentUserFromContext(ctx);
        if(curUser.role !== ROLES.OWNER) {
          throw new AuthorizationError();
        }
        const startOfMonth =  moment().utc().startOf('month');
        const endOfMonth = moment().utc().endOf('month');
        return ReportService.getReportsInDateRange(startOfMonth.toISOString(), endOfMonth.toISOString())
          .then(reports => {
            const result = {};
            if (!reports || !reports.length) {
              return resolve(JSON.stringify({}));
            }

            const weekRange = []
            let startOfWeek = startOfMonth.clone();

            while(startOfWeek.isSameOrBefore(endOfMonth)) {
              let endOfWeek = startOfWeek.clone().add(6, 'd');
              if (endOfWeek.isAfter(endOfMonth)) {
                endOfWeek = endOfMonth.clone();
              }
              weekRange.push({
                startDate: startOfWeek.clone().hour(0).minute(0).second(0),
                endDate: endOfWeek.clone().hour(23).minute(59).second(59)
              });
              startOfWeek.add(7, 'd');
            }

            reports.forEach(report => {
              const reportDate = moment(report.createdAt).utc();
              const week = weekRange.find(week => reportDate.isSameOrAfter(week.startDate) && reportDate.isSameOrBefore(week.endDate));
              if (week) {
                const resultProperty = `${week.startDate.format('DD/MM')} - ${week.endDate.format('DD/MM')}`;
                result[resultProperty] = result[resultProperty] ? result[resultProperty] + report.totalRevenue : report.totalRevenue;
              }
            });

            return resolve(JSON.stringify(result));
          })
          .catch(err => {
            return reject(err);
          })
      } catch(err) {
        return reject(err);
      }
    });
  }

  reportByDay(_, rgs, ctx) {
    return new Promise((resolve, reject) => {
      try {
        const curUser = AuthService.getCurrentUserFromContext(ctx);
        if(curUser.role !== ROLES.OWNER) {
          throw new AuthorizationError();
        }
        const startDate =  moment().utc().hour(0).minute(0).second(0);
        const endDate =  moment().utc().hour(23).minute(59).second(59);
        const result = {};
        return OrderService.getOrderByDateRange(startDate.toISOString(), endDate.toISOString())
          .then(orders => {
            if (!orders || !orders.length) {
              return resolve(JSON.stringify({}));
            }
            let hourStart = startDate.clone();
            let orderList = [...orders];
            while(hourStart.isBefore(endDate)) {
              let hourEnd = hourStart.clone().minute(59).second(59);
              let totalRevenue = 0;
              const [filtered, notIncludes] = orderList.reduce((resultArr, order) => {
                const createdAt = moment(order.createdAt).utc();
                if (createdAt.isSameOrAfter(hourStart) && createdAt.isSameOrBefore(hourEnd)) {
                  resultArr[0].push(order);
                  totalRevenue+= order.grandTotal;
                } else {
                  resultArr[1].push(order);
                }

                return resultArr;
              }, [[], []]);

              const resultProperty = `${hourStart.format('HH:mm')} - ${hourEnd.format('HH:mm')}`;
              result[resultProperty] = totalRevenue;
              orderList = [...notIncludes];
              hourStart.add(1,'hour');
            }

            return resolve(JSON.stringify(result));
          })
          .catch(err => {
            return reject(err);
          });
      } catch(err) {
        return reject(err);
      }
    });
  }
}

export default new ReportController();