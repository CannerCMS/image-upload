import React, { Component } from "react";
import { Tabs, Modal } from "antd";
import PropTypes from "prop-types";

import UploadImage from "./UploadImage";
import DefaultImage from "./DefaultImage";
import UrlImage from "./UrlImage";
import CSSModules from "react-css-modules";
import styles from "./style/EditImage.scss";
const TabPane = Tabs.TabPane;

@CSSModules(styles)
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
        title="選擇圖片"
        footer={<div />}
        maskClosable={true}
      >
        <div styleName="editImage-container">
          <Tabs type="card">
            <TabPane tab="圖片上傳" key="1">
              <UploadImage
                uploadImage={this.uploadImage}
                multiple={multiple}
                serviceConfig={serviceConfig}
                onChange={onChange}
                finishEdit={this.finishEdit}
              />
            </TabPane>
            <TabPane tab="圖片網址" key="3">
              <UrlImage onChange={onChange} />
            </TabPane>
          </Tabs>
        </div>
      </Modal>
    );
  }
}
