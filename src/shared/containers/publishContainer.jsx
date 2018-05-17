/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the GPL v2.0+ license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { apiGetAdminParametersRequest } from "zoapp-front/actions/api";
// eslint-disable-next-line import/no-unresolved
import config from "../../../config/default.json";

class PublishContainer extends Component {
  componentDidMount() {
    this.props.apiGetAdminParametersRequest(
      this.props.match.params.name,
      "botParams",
    );
  }

  render() {
    const { adminParameters } = this.props;
    if (adminParameters === null || adminParameters === undefined) {
      return null;
    }

    adminParameters.host = config.backend.api.host;
    adminParameters.port = config.backend.api.port;
    adminParameters.secure = config.backend.secure;

    const params = encodeURI(JSON.stringify(adminParameters));

    return (
      <iframe
        src={`http://127.0.0.1:9000/index.html?config=${params}`}
        width="100%"
      />
    );
  }
}

PublishContainer.propTypes = {
  match: PropTypes.object.isRequired,
  apiGetAdminParametersRequest: PropTypes.func.isRequired,
  adminParameters: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { adminParameters } = state.app;

  return { adminParameters };
};

const mapDispatchToProps = (dispatch) => ({
  apiGetAdminParametersRequest: (name, type) =>
    dispatch(apiGetAdminParametersRequest(name, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PublishContainer);
