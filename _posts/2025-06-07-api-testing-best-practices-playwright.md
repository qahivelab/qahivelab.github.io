---
layout: post
title: "API Testing Best Practices with Playwright"
date: 2025-06-07 10:00:00 -0000
author: juan_esteban_marin
tags: [api-testing, playwright, automation, javascript, rest]
excerpt: "Discover comprehensive API testing strategies using Playwright. Learn how to validate endpoints, handle authentication, and implement robust API test suites."
categories: [automation, api]
featured: true
published: true
description: "Learn proven API testing techniques with Playwright including endpoint validation, authentication handling, and comprehensive test suite implementation for reliable service testing."
keywords: "api testing, playwright, rest api, javascript testing, automation"
---

# API Testing Best Practices with Playwright

API testing forms the backbone of modern application quality assurance, especially in microservices architectures where services communicate through well-defined interfaces. Playwright, while primarily known for browser automation, provides excellent capabilities for API testing that many teams overlook.

## Why API Testing Matters

API testing offers several advantages over UI-only testing:

- **Faster Execution**: API tests run significantly faster than UI tests
- **Early Bug Detection**: Test business logic before UI implementation
- **Better Coverage**: Validate edge cases and error conditions easily  
- **Isolation**: Test individual services without external dependencies
- **Stability**: Less flaky than UI tests, more reliable in CI/CD pipelines

## Setting Up Playwright for API Testing

Playwright's `request` context provides a clean, powerful interface for API testing:

```javascript
const { test, expect } = require('@playwright/test');

// Basic API test setup
test.describe('User API Tests', () => {
  let apiContext;

  test.beforeAll(async ({ playwright }) => {
    // Create API request context
    apiContext = await playwright.request.newContext({
      baseURL: 'https://api.example.com',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('should create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user'
    };

    const response = await apiContext.post('/users', {
      data: newUser
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    
    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    });
    expect(responseBody.id).toBeDefined();
  });
});
```

## Essential API Testing Patterns

### 1. Request and Response Validation

Always validate both the structure and content of API responses:

```javascript
test('should validate user response structure', async () => {
  const response = await apiContext.get('/users/1');
  
  expect(response.ok()).toBeTruthy();
  const user = await response.json();
  
  // Validate required fields
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('email');
  expect(user).toHaveProperty('created_at');
  
  // Validate data types
  expect(typeof user.id).toBe('number');
  expect(typeof user.name).toBe('string');
  expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});
```

### 2. Error Handling Testing

Test error scenarios as thoroughly as success cases:

```javascript
test('should handle invalid user data gracefully', async () => {
  const invalidUser = {
    name: '', // Empty name
    email: 'invalid-email', // Invalid email format
  };

  const response = await apiContext.post('/users', {
    data: invalidUser
  });

  expect(response.status()).toBe(400);
  
  const errorResponse = await response.json();
  expect(errorResponse.errors).toBeDefined();
  expect(errorResponse.errors).toContain('Name is required');
  expect(errorResponse.errors).toContain('Invalid email format');
});

test('should return 404 for non-existent user', async () => {
  const response = await apiContext.get('/users/99999');
  
  expect(response.status()).toBe(404);
  
  const errorResponse = await response.json();
  expect(errorResponse.message).toContain('User not found');
});
```

### 3. Authentication Testing

Handle different authentication scenarios systematically:

```javascript
// Token-based authentication
test.describe('Authenticated API Tests', () => {
  let authContext;
  let authToken;

  test.beforeAll(async ({ playwright }) => {
    // Login to get authentication token
    const loginContext = await playwright.request.newContext({
      baseURL: 'https://api.example.com'
    });

    const loginResponse = await loginContext.post('/auth/login', {
      data: {
        email: 'test@example.com',
        password: 'test123'
      }
    });

    const loginData = await loginResponse.json();
    authToken = loginData.token;

    // Create authenticated context
    authContext = await playwright.request.newContext({
      baseURL: 'https://api.example.com',
      extraHTTPHeaders: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
  });

  test('should access protected resource with valid token', async () => {
    const response = await authContext.get('/users/profile');
    
    expect(response.ok()).toBeTruthy();
    const profile = await response.json();
    expect(profile.email).toBe('test@example.com');
  });

  test('should reject access without authentication', async () => {
    const unauthContext = await playwright.request.newContext({
      baseURL: 'https://api.example.com'
    });

    const response = await unauthContext.get('/users/profile');
    expect(response.status()).toBe(401);
  });
});
```

## Advanced API Testing Techniques

### Data-Driven Testing

Use external data sources for comprehensive testing:

```javascript
const { test, expect } = require('@playwright/test');
const testData = require('../data/users.json');

testData.validUsers.forEach((userData, index) => {
  test(`should create user ${index + 1}`, async ({ request }) => {
    const response = await request.post('/users', {
      data: userData
    });

    expect(response.ok()).toBeTruthy();
    const createdUser = await response.json();
    expect(createdUser.name).toBe(userData.name);
  });
});
```

### Response Time Testing

Monitor API performance as part of functional testing:

```javascript
test('should respond within acceptable time limits', async () => {
  const startTime = Date.now();
  
  const response = await apiContext.get('/users');
  
  const responseTime = Date.now() - startTime;
  
  expect(response.ok()).toBeTruthy();
  expect(responseTime).toBeLessThan(2000); // 2 seconds max
});
```

### Chain API Calls

Test workflows that involve multiple API interactions:

```javascript
test('should handle complete user workflow', async () => {
  // 1. Create user
  const newUser = {
    name: 'Workflow Test User',
    email: 'workflow@example.com'
  };

  const createResponse = await apiContext.post('/users', {
    data: newUser
  });
  
  expect(createResponse.ok()).toBeTruthy();
  const createdUser = await createResponse.json();
  const userId = createdUser.id;

  // 2. Update user
  const updateData = { name: 'Updated Name' };
  const updateResponse = await apiContext.put(`/users/${userId}`, {
    data: updateData
  });
  
  expect(updateResponse.ok()).toBeTruthy();

  // 3. Verify update
  const getResponse = await apiContext.get(`/users/${userId}`);
  const updatedUser = await getResponse.json();
  expect(updatedUser.name).toBe('Updated Name');

  // 4. Delete user
  const deleteResponse = await apiContext.delete(`/users/${userId}`);
  expect(deleteResponse.ok()).toBeTruthy();

  // 5. Verify deletion
  const verifyResponse = await apiContext.get(`/users/${userId}`);
  expect(verifyResponse.status()).toBe(404);
});
```

## Healthcare API Testing Considerations

When testing healthcare APIs, additional considerations apply:

### FHIR Compliance Testing

```javascript
test('should validate FHIR Patient resource', async () => {
  const response = await apiContext.get('/fhir/Patient/123');
  
  expect(response.ok()).toBeTruthy();
  const patient = await response.json();
  
  // Validate FHIR resource structure
  expect(patient.resourceType).toBe('Patient');
  expect(patient.id).toBeDefined();
  expect(patient.identifier).toBeDefined();
  expect(Array.isArray(patient.name)).toBeTruthy();
});
```

### Data Privacy Validation

```javascript
test('should not expose sensitive patient data', async () => {
  const response = await apiContext.get('/patients/search?name=John');
  
  const results = await response.json();
  
  // Ensure sensitive fields are not exposed
  results.patients.forEach(patient => {
    expect(patient).not.toHaveProperty('ssn');
    expect(patient).not.toHaveProperty('full_medical_history');
    expect(patient.dateOfBirth).toBeUndefined(); // Unless specifically requested
  });
});
```

## Best Practices Summary

1. **Structure Tests Logically**: Group related API endpoints and use descriptive test names
2. **Validate Thoroughly**: Test both success and failure scenarios
3. **Use Test Data Wisely**: Create and clean up test data appropriately
4. **Handle Authentication**: Test various authentication states and token expiration
5. **Monitor Performance**: Include response time validation in your tests
6. **Document APIs**: Use tests as living documentation for API behavior
7. **Environment Management**: Use different test environments and configurations
8. **Error Scenarios**: Test edge cases, invalid inputs, and system failures

## Conclusion

API testing with Playwright provides a robust foundation for ensuring service reliability and correctness. By implementing these patterns and practices, teams can build comprehensive API test suites that catch issues early and provide confidence in their service implementations.

The combination of Playwright's powerful request handling capabilities with systematic testing approaches creates a testing strategy that scales with your application and provides reliable feedback throughout the development lifecycle.

---

*Ready to implement robust API testing in your project? Start with these patterns and gradually expand your test coverage to build confidence in your service layer.* 