import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateCompliance, USE_CASES } from './complianceEngine.ts';

test('HR-Recruiting is classified as High Risk (ROT) with DSFA requirement', () => {
  const result = evaluateCompliance({
    useCase: 'hr-recruiting',
    automation: 'semi-auto',
    dataSensitivity: 'standard-personal',
    scope: 'internal-staff',
  });

  assert.equal(result.riskLevel, 'high');
  assert.equal(result.riskBadge, 'ROT');
  assert.equal(result.isBannedOrHigh, true);
  assert.equal(result.dsgvo.requiresDSFA, true);
  assert.equal(result.dsgvo.requiresAVV, true);
  assert.ok(result.euAiActArticle.includes('Anhang III'));
});

test('Workplace biometrics with emotion recognition triggers Unacceptable Risk (ROT)', () => {
  const result = evaluateCompliance({
    useCase: 'biometrics',
    automation: 'advisory',
    dataSensitivity: 'art9-special',
    scope: 'internal-staff',
  });

  assert.equal(result.riskLevel, 'unacceptable');
  assert.equal(result.riskBadge, 'ROT');
  assert.ok(result.euAiActArticle.includes('Artikel 5'));
  assert.equal(result.dsgvo.requiresDSFA, true);
  assert.equal(result.dsgvo.art9SpecialDataInvolved, true);
});

test('Customer Service Chatbot triggers Transparency Risk (GELB)', () => {
  const result = evaluateCompliance({
    useCase: 'customer-service',
    automation: 'advisory',
    dataSensitivity: 'standard-personal',
    scope: 'b2c-consumers',
  });

  assert.equal(result.riskLevel, 'transparency');
  assert.equal(result.riskBadge, 'GELB');
  assert.equal(result.transparencyRequired, true);
  assert.equal(result.isBannedOrHigh, false);
  assert.ok(result.euAiActArticle.includes('Artikel 50'));
  assert.equal(result.dsgvo.requiresAVV, true);
});

test('Internal code assistant with synthetic data is Minimal Risk (GRÜN)', () => {
  const result = evaluateCompliance({
    useCase: 'code-automation',
    automation: 'advisory',
    dataSensitivity: 'none-or-synthetic',
    scope: 'internal-staff',
  });

  assert.equal(result.riskLevel, 'minimal');
  assert.equal(result.riskBadge, 'GRÜN');
  assert.equal(result.isBannedOrHigh, false);
  assert.equal(result.dsgvo.requiresDSFA, false);
  assert.equal(result.dsgvo.requiresAVV, false);
});

test('Fully automated decision making triggers GDPR Art. 22 alert and High Risk', () => {
  const result = evaluateCompliance({
    useCase: 'marketing-content',
    automation: 'fully-auto',
    dataSensitivity: 'standard-personal',
    scope: 'b2b-clients',
  });

  assert.equal(result.riskLevel, 'high');
  assert.equal(result.dsgvo.art22ViolationRisk, true);
  assert.equal(result.dsgvo.requiresDSFA, true);
});

test('USE_CASES dictionary contains all 7 required business profiles', () => {
  const keys = Object.keys(USE_CASES);
  assert.equal(keys.length, 7);
  assert.ok(keys.includes('hr-recruiting'));
  assert.ok(keys.includes('customer-service'));
  assert.ok(keys.includes('credit-scoring'));
});
