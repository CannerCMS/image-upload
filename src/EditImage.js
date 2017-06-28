import React, {Component, PropTypes} from 'react';
import {Tabs, Modal} from 'antd';

import UploadImage from './UploadImage';
import DefaultImage from './DefaultImage';
import CSSModules from 'react-css-modules';
import styles from './style/EditImage.scss';
import './style/EditImage.antd.scss';
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
  }

  finishEdit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.closeEditPopup();
  }

  render() {
    const {editPopup, multiple,
      onChange, closeEditPopup,
      serviceConfig
    } = this.props;
    return (
      <Modal visible={editPopup}
              closable={true}
              width="700"
              onCancel={closeEditPopup}
              title="選擇照片"
              footer={<div/>}
              maskClosable={true}>
        <div styleName="editImage-container" id="editImage-container">
          <Tabs type="card">
            <TabPane tab="上傳照片" key="1">
              <UploadImage uploadImage={this.uploadImage}
                           multiple={multiple}
                           serviceConfig={serviceConfig}
                           onChange={onChange}
                           finishEdit={this.finishEdit}/>
            </TabPane>
            <TabPane tab="照片圖庫" key="2">
              <DefaultImage onChange={onChange}/>
            </TabPane>
          </Tabs>
        </div>
      </Modal>
    );
  }
}
