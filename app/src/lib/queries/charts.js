import gql from 'graphql-tag';

export const ReportDaily = gql`
  query {
    reportByDay
  }
`

export const ReportWeekly = gql`
  query {
    reportByWeek
  }
`

export const ReportMonthly = gql`
  query {
    reportByMonth
  }
`