import React from "react";
import PropTypes from "prop-types";
import { Row, Upload, Icon, Alert, Button, Progress } from "antd";
import CSSModules from "react-css-modules";
import styles from "./style/UploadImage.scss";
const Dragger = Upload.Dragger;

@CSSModules(styles)
export default class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.uploadFile = this.uploadFile.bind(this);
    this.finishSuccessEdit = this.finishSuccessEdit.bind(this);
    this.state = {
      fileList: []
    };
  }

  static propTypes = {
    finishEdit: PropTypes.func,
    onChange: PropTypes.func,
    multiple: PropTypes.bool,
    serviceConfig: PropTypes.object
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.fileList.length > 0 && nextState.fileList === 0) {
      return false;
    }

    return true;
  }

  finishSuccessEdit(e) {
    const { onChange, finishEdit } = this.props;
    const urls = this.state.fileList.map(file => file.url);

    onChange(urls);
    this.setState(
      {
        fileList: []
      },
      finishEdit(e)
    );
  }

  uploadFile(info) {
    let fileList = info.fileList;
    // see issue: https://github.com/ant-design/ant-design/issues/2423#issuecomment-233523579
    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-3);

    // 2. read from response and show file link
    fileList = fileList.map(file => {
      if (file.response && file.response.data) {
        // Component will show file.url as link
        file.url = file.response.data.link;
      }
      return file;
    });

    this.setState({
      fileList
    });
  }

  render() {
    const { multiple, finishEdit, serviceConfig } = this.props;
    const { fileList } = this.state;
    let content;
    let finish;
    let disabled = false;
    const props = {
      multiple,
      // name is **need** to be image according to imgur api
      // https://api.imgur.com/endpoints/image
      ...serviceConfig,
      onChange: this.uploadFile
    };

    if (fileList && fileList.length) {
      content = fileList.map(file => {
        const percent = file.percent;
        let info;
        disabled = true;

        if (file.status === "error") {
          info = (
            <div key={file.name}>
              <Alert message="上傳圖片失敗了！" type="error" showIcon />
              <Button type="primary" onClick={finishEdit}>
                確定
              </Button>
            </div>
          );
        } else if (file.status === "uploading") {
          info = (
            <div key={file.name}>
              <Alert message={`${file.name} 上傳中...`} type="info" showIcon />
              <Progress percent={Math.round(percent)} />
            </div>
          );
        } else if (file.status === "done") {
          info = (
            <div key={file.name}>
              <Alert
                message={`${file.name} 上傳完成!`}
                type="success"
                showIcon
              />
            </div>
          );
        }

        return info;
      });

      if (fileList.every(file => file.status === "done")) {
        finish = (
          <Button type="primary" onClick={this.finishSuccessEdit}>
            成功!
          </Button>
        );
      }
    } else {
      content = (
        <div>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>

          <p className="ant-upload-text">瀏覽或拖曳圖片</p>
        </div>
      );
    }
    return (
      <Row>
        <div styleName="file-upload">
          <Dragger {...props} fileList={fileList} disabled={disabled}>
            <div styleName="file-upload__content">
              {content}
              {finish}
            </div>
          </Dragger>
        </div>
      </Row>
    );
  }
}
