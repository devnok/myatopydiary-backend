import Account from './Account';
import AtopyDetail from './AtopyDetail';
import Report from './Report';
import ReportDetail from './ReportDetail';
import User from './User';
import medicines from './Medicine';

const models = {
  Account,
  User,
  AtopyDetail,
  Report,
  ReportDetail,
  ...Object.values(medicines),
};
export default models;
