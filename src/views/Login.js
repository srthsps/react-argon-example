import React, { useEffect, useState } from "react";

// reactstrap components

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import api from "../api.js";

import { useQuery } from "react-query";

import Loading from "components/Custom/Loading";

import { useHistory, withRouter } from "react-router-dom";

import jwt_decode from "jwt-decode";

import Cookies from "js-cookie";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  useEffect(() => {
    setMobile("");
    setPassword("");
  }, []);

  const { isLoading, data, isError, error, isFetched, isSuccess, refetch } =
    useQuery(
      "loginUser",
      () => {
        return api.actionHandler({
          url: api.loginURL,
          data: { username: mobile, password: password },
          method: "POST",
        });
      },
      {
        enabled: false,
        retry: false
      }
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("username:", mobile);
    console.log("password: ", password);

    await refetch();
  };

  useEffect(() => {
    if (isSuccess) {

      let decoded = jwt_decode(data.token.access);

      Cookies.set("user", JSON.stringify(data.user), { expires: 7, path: "/" });
      Cookies.set("token", data.token.access, { expires: 7, path: "/" });

      window.location = "http://localhost:3000/"

    }
  }, [isSuccess, data, history]);

  return (
    <>
      {isLoading && <Loading />}

      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          {/* <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={
                        require("../assets/img/icons/common/github.svg")
                          .default
                      }
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={
                        require("../assets/img/icons/common/google.svg")
                          .default
                      }
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader> */}
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
              <br />
              {isError && (
                <div className="alert alert-danger py-2 mt-2">{error}</div>
              )}
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-mobile-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    nam="mobile"
                    placeholder="Mobile"
                    type="tel"
                    autoComplete="new-mobile"
                    value={mobile}
                    required
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    autoComplete="new-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
                {isError && error.message}
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                  onClick={(e) => handleSubmit(e)}
                  className="my-4"
                  color="primary"
                  type="button"
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default withRouter(Login);
