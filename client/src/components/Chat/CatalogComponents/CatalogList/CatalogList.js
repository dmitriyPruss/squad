import React from 'react';
import { connect } from 'react-redux';
import Catalog from '../Catalog/Catalog';
import styles from '../CatalogListContainer/CatalogListContainer.module.sass';
import {
  changeShowModeCatalog,
  deleteCatalog
} from '../../../../actions/actionCreator';

const CatalogList = props => {
  const { catalogList, changeShowModeCatalog, deleteCatalog } = props;

  const goToCatalog = (event, catalog) => {
    changeShowModeCatalog(catalog);
    event.stopPropagation();
  };

  const destroyCatalog = (event, catalogId) => {
    deleteCatalog({ catalogId });
    event.stopPropagation();
  };

  const getListCatalog = () => {
    const elementList = [];
    catalogList.forEach(catalog => {
      elementList.push(
        <Catalog
          catalog={catalog}
          key={catalog._id}
          destroyCatalog={destroyCatalog}
          goToCatalog={goToCatalog}
        />
      );
    });
    return elementList.length ? (
      elementList
    ) : (
      <span className={styles.notFound}>Not found</span>
    );
  };

  return <div className={styles.listContainer}>{getListCatalog()}</div>;
};

const mapDispatchToProps = dispatch => ({
  changeShowModeCatalog: data => dispatch(changeShowModeCatalog(data)),
  deleteCatalog: data => dispatch(deleteCatalog(data))
});

export default connect(null, mapDispatchToProps)(CatalogList);
