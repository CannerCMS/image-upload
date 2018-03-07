import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input, Row, Col, Button } from "antd";

export default class UrlImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired
  };

  onChange(e) {
    this.setState({
      url: e.target.value
    });
  }

  onClick() {
    const { url } = this.state;
    this.props.onChange([url]);
    this.setState({
      url: ""
    });
  }

  render() {
    const { url } = this.state;
    return (
      <Row>
        <Col>
          <span>Enter your image URL</span>
          <Input onChange={this.onChange} placeholder="image url" />
          <Button
            style={{ margin: "10px 0" }}
            type="primary"
            onClick={this.onClick}
          >
            Confirm
          </Button>
          <div
            style={{
              backgroundImage: `url(${url})`,
              width: "100%",
              height: "300px",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat"
            }}
          />
        </Col>
      </Row>
    );
  }
}
