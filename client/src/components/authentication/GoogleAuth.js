import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { googleSignIn } from '../../actions/auth';
import Spinner from '../utils/Spinner';


const GoogleAuth = ({ googleSignIn, setLoading, loading }) => {
  if (loading) {
    return <Spinner />;
  }

  const onSuccess = async (res) => {
    const { name, email } = res.profileObj;
    setLoading(true);
    await googleSignIn({ name, email });
  };
  return (
    <>
      <GoogleLogin
        clientId="642347581598-mgftl683kdhcu914ds8oof7j3pall121.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            className="btn google-btn"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <svg className="google__icon">
              <use
                xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-google`}
              ></use>
            </svg>
            Sign in with Google
          </button>
        )}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default connect(null, { googleSignIn })(GoogleAuth);
