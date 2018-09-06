// @flow
import React, { Component } from "react";
import { Modal } from "antd";
import {IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
import type { OnChange, ServiceConfig, GalleryConfig } from "./types";
import Container from './Container';

import enLocale from './locale/en';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

addLocaleData([...en, ...zh]);


export type Props = {
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

  render() {
    const {
      locale,
      localeMessages,
      editPopup,
      closeEditPopup
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
          <Container {...this.props}/>
        </Modal>
      </IntlProvider>
    );
  }
}
