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
import styles from "./CreatorDashboard.module.sass";
import TryAgain from "../TryAgain";

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

    // const array = [];
    // array.push(
    //   <option key={0} value={null}>
    //     Choose industry
    //   </option>
    // );
    // industry.forEach((ind, i) =>
    //   array.push(
    //     <option key={i + 1} value={ind}>
    //       {ind}
    //     </option>
    //   )
    // );

    const array = industry.map((ind, index) =>
      index === 0 ? (
        <>
          <option key={0} value={null}>
            Choose industry
          </option>
          <option key={index + 1} value={ind}>
            {ind}
          </option>
        </>
      ) : (
        <option key={index + 1} value={ind}>
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

    // ?????
    if (nextProps.location.search !== search) {
      this.parseUrlForParams(nextProps.location.search);
    }
  }

  componentDidMount() {
    const { getDataForContest, location, contests, creatorFilter } = this.props;

    getDataForContest();
    if (this.parseUrlForParams(location.search) && !contests.length)
      this.getContests(creatorFilter);
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

      // if (creatFilter[item]) {
      //   obj[item] = creatFilter[item];
      // }
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
      // if (creatorFilter[item]) {
      //   obj[item] = creatorFilter[item];
      // }
    });

    // obj.ownEntries = creatorFilter.ownEntries; // ????? sense??

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

    const array = contests.map((item) => (
      <ContestBox data={item} key={item.id} goToExtended={this.goToExtended} />
    ));

    return array;
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
      isFeching: isFetch, //??????????
      dataForContest: { isFetching },
    } = this.props;

    return (
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <span className={styles.headerFilter}>Filter Results</span>
          <div className={styles.inputsContainer}>
            <div
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
            </div>
            <div className={styles.inputContainer}>
              <span>By contest type</span>
              {this.renderSelectType()}
            </div>
            <div className={styles.inputContainer}>
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
            </div>
            {!isFetching && (
              <div className={styles.inputContainer}>
                <span>By industry</span>
                {this.renderIndustryType()}
              </div>
            )}
            <div className={styles.inputContainer}>
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
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>
        {error ? (
          <div className={styles.messageContainer}>
            <TryAgain getData={this.tryLoadAgain} />
          </div>
        ) : (
          <ContestsContainer
            isFetching={isFetch} // ?????
            loadMore={this.loadMore}
            history={history}
            haveMore={haveMore}
          >
            {this.setContestList()}
          </ContestsContainer>
        )}
      </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatorDashboard));
