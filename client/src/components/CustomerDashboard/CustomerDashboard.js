import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getContestsForCustomer,
  clearContestList,
  setNewCustomerFilter
} from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';

class CustomerDashboard extends React.Component {
  loadMore = startFrom => {
    const { getContests, customerFilter } = this.props;

    getContests({
      limit: 8,
      offset: startFrom,
      contestStatus: customerFilter
    });
  };

  componentDidMount () {
    this.getContests();
  }

  getContests = () => {
    const { getContests, customerFilter } = this.props;

    getContests({
      limit: 8,
      contestStatus: customerFilter
    });
  };

  componentDidUpdate (prevProps) {
    const { customerFilter } = this.props;

    if (customerFilter !== prevProps.customerFilter) {
      this.getContests();
    }
  }

  goToExtended = contest_id => {
    this.props.history.push(`/contest/${contest_id}`);
  };

  setContestList = () => {
    const { contests } = this.props;

    const array = contests.map(item => (
      <ContestBox data={item} key={item.id} goToExtended={this.goToExtended} />
    ));

    return array;
  };

  componentWillUnmount () {
    const { clearContestsList } = this.props;

    clearContestsList();
  }

  tryToGetContest = () => {
    const { clearContestsList } = this.props;

    clearContestsList();
    this.getContests();
  };

  render () {
    const {
      error,
      haveMore,
      customerFilter,
      newFilter,
      isFetching,
      history
    } = this.props;

    const {
      CONTEST: { ACTIVE, FINISHED, PENDING }
    } = CONSTANTS.STATUS;

    return (
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <div
            onClick={() => newFilter(ACTIVE)}
            className={classNames({
              [styles.activeFilter]: ACTIVE === customerFilter,
              [styles.filter]: ACTIVE !== customerFilter
            })}
          >
            Active Contests
          </div>
          <div
            onClick={() => newFilter(FINISHED)}
            className={classNames({
              [styles.activeFilter]: FINISHED === customerFilter,
              [styles.filter]: FINISHED !== customerFilter
            })}
          >
            Completed contests
          </div>
          <div
            onClick={() => newFilter(PENDING)}
            className={classNames({
              [styles.activeFilter]: PENDING === customerFilter,
              [styles.filter]: PENDING !== customerFilter
            })}
          >
            Inactive contests
          </div>
        </div>
        <div className={styles.contestsContainer}>
          {error ? (
            <TryAgain getData={this.tryToGetContest()} />
          ) : (
            <ContestsContainer
              isFetching={isFetching}
              loadMore={this.loadMore}
              history={history}
              haveMore={haveMore}
            >
              {this.setContestList()}
            </ContestsContainer>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.contestsList;

const mapDispatchToProps = dispatch => ({
  getContests: data => dispatch(getContestsForCustomer(data)),
  clearContestsList: () => dispatch(clearContestList()),
  newFilter: filter => dispatch(setNewCustomerFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
