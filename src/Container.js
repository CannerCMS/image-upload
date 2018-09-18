// @flow
import React, {Component} from 'react';
import {Tabs} from 'antd';
import styled from "styled-components";
import {FormattedMessage} from 'react-intl';
import UploadImage from "./UploadImage";
import DefaultImage from "./DefaultImage";
import UrlImage from "./UrlImage";
import type {Props} from './EditImage';
const TabPane = Tabs.TabPane;

const Content = styled.div`
  padding: 30px;
`;

export default class Container extends Component<Props> {
  finishEdit = (e: any) => {
    const {closeEditPopup} = this.props;
    e.preventDefault();
    e.stopPropagation();
    if (closeEditPopup) {
      closeEditPopup();
    }
  }

  render() {
    const {multiple, imageStorage, onChange, galleryConfig, closeEditPopup} = this.props;
    return (
      <Content>
        <Tabs type="card">
          <TabPane tab={<FormattedMessage id="imgupload.tab1.title"/>} key="1">
            <UploadImage
              multiple={multiple}
              imageStorage={imageStorage}
              onChange={onChange}
              finishEdit={this.finishEdit}
            />
          </TabPane>
          {galleryConfig !== null && (
            <TabPane tab={<FormattedMessage id="imgupload.tab2.title"/>} key="2">
              <DefaultImage
                galleryConfig={galleryConfig}
                onChange={onChange}
              />
            </TabPane>
          )}
          <TabPane tab={<FormattedMessage id="imgupload.tab3.title"/>} key="3">
            <UrlImage onChange={onChange} closeEditPopup={closeEditPopup}/>
          </TabPane>
        </Tabs>
      </Content>
    );
  }
}
