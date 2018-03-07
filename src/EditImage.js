// @flow
import React, { Component } from "react";
import { Tabs, Modal } from "antd";
import styled from "styled-components";
import type { OnChange, ServiceConfig, GalleryConfig } from "./types";

import UploadImage from "./UploadImage";
import DefaultImage from "./DefaultImage";
import UrlImage from "./UrlImage";
const TabPane = Tabs.TabPane;

const Container = styled.div`
  padding: 30px;
`;

type Props = {
  galleryConfig: GalleryConfig,
  onChange: OnChange,
  editPopup: boolean,
  multiple: boolean,
  serviceConfig: ServiceConfig,
  closeEditPopup: () => void
};

export default class EditImage extends Component<Props> {
  constructor(props: Props) {
    super(props);
    (this: any).finishEdit = this.finishEdit.bind(this);
  }

  finishEdit(e: any) {
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
      serviceConfig,
      galleryConfig
    } = this.props;
    return (
      <Modal
        visible={editPopup}
        closable={true}
        width={700}
        onCancel={closeEditPopup}
        title="Choose Photos"
        footer={null}
        maskClosable={true}
      >
        <Container>
          <Tabs type="card">
            <TabPane tab="Upload" key="1">
              <UploadImage
                multiple={multiple}
                serviceConfig={serviceConfig}
                onChange={onChange}
                finishEdit={this.finishEdit}
              />
            </TabPane>
            {galleryConfig !== null && (
              <TabPane tab="Gallery" key="2">
                <DefaultImage
                  galleryConfig={galleryConfig}
                  onChange={onChange} />
              </TabPane>
            )}
            <TabPane tab="Url" key="3">
              <UrlImage onChange={onChange} />
            </TabPane>
          </Tabs>
        </Container>
      </Modal>
    );
  }
}
