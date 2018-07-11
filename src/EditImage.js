// @flow
import React, { Component } from "react";
import { Tabs, Modal } from "antd";
import {IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
import styled from "styled-components";
import type { OnChange, ServiceConfig, GalleryConfig } from "./types";

import UploadImage from "./UploadImage";
import DefaultImage from "./DefaultImage";
import UrlImage from "./UrlImage";
const TabPane = Tabs.TabPane;

import enLocale from './locale/en';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

addLocaleData([...en, ...zh]);

const Container = styled.div`
  padding: 30px;
`;

type Props = {
  locale?: string,
  localeMessages: {[string]: string},
  galleryConfig?: GalleryConfig | null,
  onChange: OnChange,
  editPopup: boolean,
  multiple: boolean,
  // pass image configurations generate from: https://github.com/Canner/image-service-config
  serviceConfig?: ServiceConfig,
  closeEditPopup?: () => void
};

export default class EditImage extends Component<Props> {

  static defaultProps = {
    locale: 'en',
    multiple: false,
    localeMessages: enLocale,
    onChange: (arg: any) => arg,
    editProps: false,
    galleryConfig: null
  }

  finishEdit = (e: any) => {
    const {closeEditPopup} = this.props;
    e.preventDefault();
    e.stopPropagation();
    if (closeEditPopup) {
      closeEditPopup();
    }
  }

  render() {
    const {
      locale,
      localeMessages,
      editPopup,
      multiple,
      onChange,
      closeEditPopup,
      serviceConfig,
      galleryConfig
    } = this.props;
    return (
      <IntlProvider
        locale={locale}
        defaultLocale="en"
        messages={localeMessages}>
        <Modal
          visible={editPopup}
          closable={true}
          width={700}
          onCancel={closeEditPopup}
          title={
            <FormattedMessage id="imgupload.title"/>
          }
          footer={null}
          maskClosable={true}
        >
          <Container>
            <Tabs type="card">
              <TabPane tab={<FormattedMessage id="imgupload.tab1.title"/>} key="1">
                <UploadImage
                  multiple={multiple}
                  serviceConfig={serviceConfig}
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
          </Container>
        </Modal>
      </IntlProvider>
    );
  }
}
