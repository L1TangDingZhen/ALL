import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import AuthService from '../services/AuthService';

const friendlyError = (error) => {
  const msg = error.message || '';
  if (msg.includes('404') || msg.toLowerCase().includes('not found'))
    return 'Invitation code not found or already used.';
  if (msg.includes('400') || msg.toLowerCase().includes('invalid'))
    return 'Invalid invitation code format.';
  if (msg.toLowerCase().includes('network') || msg.toLowerCase().includes('failed to fetch'))
    return 'Network error. Please check your connection and try again.';
  if (msg.toLowerCase().includes('authentication failed'))
    return 'Incorrect invitation code. Please try again.';
  return 'Connection failed. Please try again.';
};

const LoginPage = ({ onLogin }) => {
  const [invitationCode, setInvitationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [showGeneratedCode, setShowGeneratedCode] = useState(false);
  const [codeError, setCodeError] = useState('');
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCode = async () => {
    try {
      setIsLoading(true);
      setGlobalError('');
      const response = await AuthService.generateInvitationCode();
      setGeneratedCode(response.invitationCode);
      setShowGeneratedCode(true);

      console.log('Generated invitation code:', response.invitationCode);

      // 短暂延迟后自动登录，确保后端有足够时间处理
      setTimeout(async () => {
        try {
          console.log('Auto-login with generated code:', response.invitationCode);
          const authResponse = await AuthService.authenticateWithCode(response.invitationCode);
          if (authResponse.success) {
            console.log('Auto-login successful:', authResponse);
            authResponse.invitationCode = response.invitationCode;
            onLogin(authResponse);
          } else {
            console.error('Auto-login failed:', authResponse);
            setGlobalError('Auto-login failed. Please try entering the code manually.');
          }
        } catch (autoLoginError) {
          console.error('Auto-login error:', autoLoginError);
          setGlobalError('Auto-login failed. Please try entering the code manually.');
          setIsLoading(false);
        }
      }, 500);
    } catch (error) {
      console.error('Generate code error:', error);
      setGlobalError('Failed to generate invitation code. Please try again.');
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!invitationCode.trim()) {
      setCodeError('Please enter an invitation code.');
      return;
    }

    try {
      setIsLoading(true);
      setCodeError('');
      setGlobalError('');
      const response = await AuthService.authenticateWithCode(invitationCode);
      if (response.success) {
        response.invitationCode = invitationCode.trim();
        onLogin(response);
      }
    } catch (error) {
      setCodeError(friendlyError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">P2P File Transfer</h1>

      {globalError && (
        <Alert variant="danger" onClose={() => setGlobalError('')} dismissible>
          {globalError}
        </Alert>
      )}

      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>Generate Invitation Code</Card.Header>
            <Card.Body>
              <Button
                variant="primary"
                onClick={handleGenerateCode}
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate New Code'}
              </Button>

              {showGeneratedCode && (
                <div className="mt-3">
                  <Alert variant="success">
                    <p>Your invitation code: <strong>{generatedCode}</strong></p>
                    <p className="small mb-0">Share this code to connect another device.</p>
                  </Alert>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>Use Invitation Code</Card.Header>
            <Card.Body>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Enter Invitation Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={invitationCode}
                    onChange={(e) => {
                      setInvitationCode(e.target.value);
                      if (codeError) setCodeError('');
                    }}
                    placeholder="XXXXXXXX"
                    disabled={isLoading}
                    isInvalid={!!codeError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {codeError}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Connecting...' : 'Connect'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;