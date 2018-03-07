// @flow
import React, { Component } from "react";
import { Input, Row, Col, Button, Icon, Alert } from "antd";
import ImageLoader from "react-loading-image";
import styled from "styled-components";

import type { OnChange } from "./types";

type Props = {
  onChange: OnChange
};

type State = {
  url: ?string,
  confirmDisabled: boolean
};

const PreviewImg = styled.div`
  background-image: url(${props => props.src});
  width: 100%;
  height: 300px;
  background-size: contain;
  background-repeat: no-repeat;
`;

export default class UrlImage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      url: null,
      confirmDisabled: true
    };
    (this: any).onChange = this.onChange.bind(this);
    (this: any).onClick = this.onClick.bind(this);
    (this: any).confirmDisable = this.confirmDisable.bind(this);
  }

  onChange(e: any) {
    this.setState({
      confirmDisabled: true,
      url: e.target.value
    });
  }

  confirmDisable(disable: boolean) {
    this.setState({
      confirmDisabled: disable
    });
  }

  onClick() {
    const { url } = this.state;

    if (url) {
      this.props.onChange([url]);
      this.setState({
        url: null,
        confirmDisabled: true
      });
    }
  }

  render() {
    const { url, confirmDisabled } = this.state;
    return (
      <Row>
        <Col>
          <span>Enter your image URL</span>
          <Input onChange={this.onChange} placeholder="image url" />
          <Button
            style={{ margin: "10px 0" }}
            type="primary"
            disabled={confirmDisabled}
            onClick={this.onClick}
          >
            Confirm
          </Button>
          {url &&
            confirmDisabled && (
              <ImageLoader
                src={url}
                onLoad={() => this.confirmDisable(false)}
                error={() => (
                  <Alert
                    message="Please check if the image link is valid."
                    type="error"
                  />
                )}
                loading={() => {
                  return (
                    <div>
                      <Icon type="loading" style={{ fontSize: 24 }} spin />
                    </div>
                  );
                }}
                image={props => <PreviewImg {...props} />}
              />
            )}
          {url && !confirmDisabled && <PreviewImg src={url} />}
        </Col>
      </Row>
    );
  }
}
