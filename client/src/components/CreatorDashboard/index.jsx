import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import classNames from "classnames";
import isEqual from "lodash/isEqual";
import {
  getContestsForCreative,
  clearContestList,
  setNewCreatorFilter,
  getDataForContest,
} from "../../actions/actionCreator";
import ContestsContainer from "../ContestsContainer";
import ContestBox from "../ContestBox";
import TryAgain from "../TryAgain";
import CONSTANTS from "./../../constants";
import styles from "./CreatorDashboard.module.sass";

const {
  STATUS: {
    CONTEST: { ACTIVE },
  },
} = CONSTANTS;

const types = [
  "",
  "name,tagline,logo",
  "name",
  "tagline",
  "logo",
  "name,tagline",
  "logo,tagline",
  "name,logo",
];

class CreatorDashboard extends React.Component {
  renderSelectType = () => {
    const { creatorFilter } = this.props;

    const array = [];
    types.forEach(
      (item, index) =>
        !index ||
        array.push(
          <option key={index - 1} value={item}>
            {item}
          </option>
        )
    );

    return (
      <select
        onChange={({ target }) =>
          this.changePredicate({
            name: "typeIndex",
            value: types.indexOf(target.value),
          })
        }
        value={types[creatorFilter.typeIndex]}
        className={styles.input}
      >
        {array}
      </select>
    );
  };

  renderIndustryType = () => {
    const {
      creatorFilter,
      dataForContest: {
        data: { industry },
      },
    } = this.props;

    const array = industry.map((ind, index) =>
      index === 0 ? (
        <option key={0} value={null}>
          Choose industry
        </option>
      ) : (
        <option key={index} value={ind}>
          {ind}
        </option>
      )
    );

    return (
      <select
        onChange={({ target }) =>
          this.changePredicate({
            name: "industry",
            value: target.value,
          })
        }
        value={creatorFilter.industry}
        className={styles.input}
      >
        {array}
      </select>
    );
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const {
      location: { search },
    } = this.props;

    if (nextProps.location.search !== search) {
      this.parseUrlForParams(nextProps.location.search);
    }
  }

  componentDidMount() {
    const { getDataForContest, location, contests, creatorFilter } = this.props;

    getDataForContest();
    if (this.parseUrlForParams(location.search) && !contests.length) {
      console.log("mount!");
      console.log("this.props", this.props);
      this.getContests(creatorFilter);
    }
  }

  getContests = (filter) => {
    const { getContests } = this.props;

    getContests({
      limit: 8,
      offset: 0,
      ...filter,
    });
  };

  changePredicate = ({ name, value }) => {
    const { creatorFilter, newFilter } = this.props;
    newFilter({
      [name]: value === "Choose industry" ? null : value,
    });
    this.parseParamsToUrl({
      ...creatorFilter,
      ...{ [name]: value === "Choose industry" ? null : value },
    });
  };

  parseParamsToUrl = (creatFilter) => {
    const { history } = this.props;

    const obj = {};
    Object.keys(creatFilter).forEach((item) => {
      obj[item] = creatFilter[item];
    });
    history.push(`/Dashboard?${queryString.stringify(obj)}`);
  };

  parseUrlForParams = (search) => {
    const { creatorFilter, newFilter, clearContestsList } = this.props;
    const obj = queryString.parse(search);
    const { typeIndex, contestId, industry, awardSort, ownEntries } = obj;

    const filter = {
      typeIndex: typeIndex || 1,
      contestId: contestId ? contestId : "",
      industry: industry ? industry : "",
      awardSort: awardSort || "asc",
      ownEntries: typeof ownEntries === "undefined" ? false : ownEntries,
    };

    if (!isEqual(filter, creatorFilter)) {
      newFilter(filter);
      clearContestsList();
      this.getContests(filter);
      return false;
    }

    return true;
  };

  getPredicateOfRequest = () => {
    const { creatorFilter } = this.props;
    const obj = {};

    Object.keys(creatorFilter).forEach((item) => {
      obj[item] = creatorFilter[item];
    });

    return obj;
  };

  loadMore = (startFrom) => {
    const { getContests } = this.props;

    getContests({
      limit: 8,
      offset: startFrom,
      ...this.getPredicateOfRequest(),
    });
  };

  setContestList = () => {
    const { contests } = this.props;

    const activeContests = contests
      .filter((contest) => contest.status === ACTIVE)
      .sort((a, b) => b.id - a.id);

    // console.log("activeContests", activeContests);

    return activeContests.map((item) => (
      <ContestBox data={item} key={item.id} goToExtended={this.goToExtended} />
    ));
  };

  goToExtended = (contestId) => {
    const { history } = this.props;

    history.push(`/contest/${contestId}`);
  };

  tryLoadAgain = () => {
    const { clearContestsList, getContests } = this.props;

    clearContestsList();
    getContests({
      limit: 8,
      offset: 0,
      ...this.getPredicateOfRequest(),
    });
  };

  render() {
    const {
      history,
      error,
      haveMore,
      creatorFilter: { ownEntries, awardSort, contestId },
      isFeching: isFetch,
      dataForContest: { isFetching },
    } = this.props;

    const contests = this.setContestList();

    return (
      <ul className={styles.mainContainer}>
        <li key={0} className={styles.filterContainer}>
          <span className={styles.headerFilter}>Filter Results</span>
          <ul className={styles.inputsContainer}>
            <li
              key={0}
              onClick={() =>
                this.changePredicate({
                  name: "ownEntries",
                  value: !ownEntries,
                })
              }
              className={classNames(styles.myEntries, {
                [styles.activeMyEntries]: ownEntries,
              })}
            >
              My Entries
            </li>
            <li key={1} className={styles.inputContainer}>
              <span>By contest type</span>
              {this.renderSelectType()}
            </li>
            <li key={2} className={styles.inputContainer}>
              <span>By contest ID</span>
              <input
                type="text"
                onChange={({ target }) =>
                  this.changePredicate({
                    name: "contestId",
                    value: target.value,
                  })
                }
                name="contestId"
                value={contestId}
                className={styles.input}
              />
            </li>
            {!isFetching && (
              <li key={3} className={styles.inputContainer}>
                <span>By industry</span>
                {this.renderIndustryType()}
              </li>
            )}
            <li key={4} className={styles.inputContainer}>
              <span>By amount award</span>
              <select
                onChange={({ target }) =>
                  this.changePredicate({
                    name: "awardSort",
                    value: target.value,
                  })
                }
                value={awardSort}
                className={styles.input}
              >
                <option key={0} value="desc">
                  Descending
                </option>
                <option key={1} value="asc">
                  Ascending
                </option>
              </select>
            </li>
          </ul>
        </li>
        {error ? (
          <li key={1} className={styles.messageContainer}>
            <TryAgain getData={this.tryLoadAgain} />
          </li>
        ) : (
          <ContestsContainer
            key={1}
            isFetching={isFetch}
            loadMore={this.loadMore}
            history={history}
            haveMore={haveMore}
          >
            {contests}
          </ContestsContainer>
        )}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  const { contestsList, dataForContest } = state;
  return { ...contestsList, dataForContest };
};

const mapDispatchToProps = (dispatch) => ({
  getContests: (data) => dispatch(getContestsForCreative(data)),
  clearContestsList: () => dispatch(clearContestList()),
  newFilter: (filter) => dispatch(setNewCreatorFilter(filter)),
  getDataForContest: () => dispatch(getDataForContest()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreatorDashboard)
);
