import { GetAllProducts, CreateProduct, GetAllCategories } from './products';
import { Login, OwnerLogin } from './authentication';
import { CreateCustomer, UpdateCustomer } from './customers';
import { Checkout, RecentOrders } from  './order';
import { GetAllStaffs } from './staffs';
import { GetUserById, UpdateUserById } from './user';
import { GetNotifications } from './notifications';
import { ReportDaily, ReportWeekly, ReportMonthly } from './charts';

export { GetAllProducts, CreateProduct, GetAllCategories, Login, CreateCustomer, Checkout, UpdateCustomer, OwnerLogin, GetAllStaffs, GetUserById, UpdateUserById, GetNotifications, ReportDaily, ReportWeekly, ReportMonthly, RecentOrders };
