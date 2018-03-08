// @flow
import React from "react";
import styled from "styled-components";
import {FormattedMessage} from 'react-intl';
import { Row, Upload, Icon, Alert, Button, Progress } from "antd";
const Dragger = Upload.Dragger;

import type { OnChange, ServiceConfig } from "./types";

const FileUploadContainer = styled.div`
  width: 400px;
  height: 300px;
  margin-right: auto;
  margin-left: auto;
`;

const FileUploadContent = styled.div`
  margin: 10px;
`;

type Props = {
  finishEdit: (e: any) => void,
  onChange: OnChange,
  multiple: boolean,
  serviceConfig: ServiceConfig
};

type State = {
  fileList: Array<any>
};

export default class UploadImage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    (this: any).uploadFile = this.uploadFile.bind(this);
    (this: any).finishSuccessEdit = this.finishSuccessEdit.bind(this);
    this.state = {
      fileList: []
    };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (this.state.fileList.length > 0 && nextState.fileList === 0) {
      return false;
    }

    return true;
  }

  finishSuccessEdit(e: any) {
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

  uploadFile(info: { file: any, fileList: Array<any> }) {
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
              <Alert
                message={(
                  <FormattedMessage
                    id="imgupload.upload.error.info"
                    />
                )}
                type="error"
                showIcon
              />
              <Button type="primary" onClick={finishEdit}>
                <FormattedMessage id="imgupload.btn.confirm"/>
              </Button>
            </div>
          );
        } else if (file.status === "uploading") {
          info = (
            <div key={file.name}>
              <Alert
                message={(
                  <FormattedMessage
                    id="imgupload.upload.uploading.info"
                    values={{filename: file.name}}
                    />
                )}
                type="info"
                showIcon
              />
              <Progress percent={Math.round(percent)} />
            </div>
          );
        } else if (file.status === "done") {
          info = (
            <div key={file.name}>
              <Alert
                message={(
                  <FormattedMessage
                    id="imgupload.upload.success.info"
                    values={{filename: file.name}}
                    />
                )}
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
          <Button
            type="primary"
            onClick={this.finishSuccessEdit}
            style={{ margin: "10px" }}
          >
            <FormattedMessage id="imgupload.upload.success"/>
          </Button>
        );
      }
    } else {
      content = (
        <div>
          <p>
            <Icon type="inbox" style={{ fontSize: 70 }} />
          </p>
          <FormattedMessage id="imgupload.upload.info"/>
        </div>
      );
    }
    return (
      <Row>
        <FileUploadContainer>
          <Dragger {...props} fileList={fileList} disabled={disabled}>
            <FileUploadContent>
              {content}
              {finish}
            </FileUploadContent>
          </Dragger>
        </FileUploadContainer>
      </Row>
    );
  }
}
