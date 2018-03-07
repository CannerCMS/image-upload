// @flow
import React, { Component } from "react";
import { Tabs, Modal } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";

import UploadImage from "./UploadImage";
import DefaultImage from "./DefaultImage";
import UrlImage from "./UrlImage";
const TabPane = Tabs.TabPane;

const Container = styled.div`
  padding: 30px;
`;

export default class EditImage extends Component {
  constructor(props) {
    super(props);
    this.finishEdit = this.finishEdit.bind(this);
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editPopup: PropTypes.bool.isRequired,
    /**
     * whether can multiple upload
     * @type {bool}
     */
    multiple: PropTypes.bool,
    serviceConfig: PropTypes.object,
    closeEditPopup: PropTypes.func.isRequired
  };

  finishEdit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.closeEditPopup();
  }

  render() {
    const {
      editPopup,
      multiple,
      onChange,
      closeEditPopup,
      serviceConfig
    } = this.props;
    return (
      <Modal
        visible={editPopup}
        closable={true}
        width={700}
        onCancel={closeEditPopup}
        title="Choose Photos"
        footer={<div />}
        maskClosable={true}
      >
        <Container>
          <Tabs type="card">
            <TabPane tab="Upload" key="1">
              <UploadImage
                uploadImage={this.uploadImage}
                multiple={multiple}
                serviceConfig={serviceConfig}
                onChange={onChange}
                finishEdit={this.finishEdit}
              />
            </TabPane>
            <TabPane tab="Gallery" key="2">
              <DefaultImage onChange={onChange} />
            </TabPane>
            <TabPane tab="Url" key="3">
              <UrlImage onChange={onChange} />
            </TabPane>
          </Tabs>
        </Container>
      </Modal>
    );
  }
}
