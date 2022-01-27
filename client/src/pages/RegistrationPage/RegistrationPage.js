import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../../components/Logo';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.sass';
import { clearErrorSignUpAndLogin } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import RegistrationFormFooter from '../../components/RegistrationFormFooter';

const RegistrationPage = props => {
  props.clearError();

  return (
    <div className={styles.signUpPage}>
      <div className={styles.signUpContainer}>
        <div className={styles.headerSignUpPage}>
          <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} />
          <div className={styles.linkLoginContainer}>
            <Link to='/login' style={{ textDecoration: 'none' }}>
              <span>Login</span>
            </Link>
          </div>
        </div>
        <RegistrationForm history={props.history} />
      </div>
      <div className={styles.footer}>
        <RegistrationFormFooter />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  clearError: () => dispatch(clearErrorSignUpAndLogin())
});

export default connect(null, mapDispatchToProps)(RegistrationPage);
