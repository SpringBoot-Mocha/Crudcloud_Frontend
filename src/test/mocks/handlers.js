import { http, HttpResponse } from 'msw'

// Mock API handlers for testing
export const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json()

    if (email === 'test@example.com' && password === 'password123') {
      return HttpResponse.json({
        token: 'mock-jwt-token',
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User'
        }
      })
    }

    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    )
  }),

  http.post('/api/auth/register', async ({ request }) => {
    const { email, name, password } = await request.json()

    return HttpResponse.json({
      token: 'mock-jwt-token',
      user: {
        id: 1,
        email,
        name
      }
    })
  }),

  // Instance endpoints
  http.get('/api/instances', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'test-db',
        engine: 'postgresql',
        status: 'RUNNING',
        host: 'localhost',
        port: 5432,
        username: 'test_user',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'dev-db',
        engine: 'mysql',
        status: 'STOPPED',
        host: 'localhost',
        port: 3306,
        username: 'dev_user',
        createdAt: '2024-01-02T00:00:00Z'
      }
    ])
  }),

  http.post('/api/instances', async ({ request }) => {
    const instanceData = await request.json()

    return HttpResponse.json({
      id: 3,
      ...instanceData,
      status: 'CREATING',
      host: 'localhost',
      port: 5432,
      username: 'new_user',
      password: 'temporary-password-123',
      createdAt: new Date().toISOString()
    })
  }),

  http.delete('/api/instances/:id', () => {
    return HttpResponse.json({ message: 'Instance deleted successfully' })
  }),

  // Payment endpoints
  http.post('/api/payments', async ({ request }) => {
    const paymentData = await request.json()

    return HttpResponse.json({
      id: 1,
      ...paymentData,
      mercadopagoPaymentId: 'MP-123456789',
      status: 'PENDING',
      createdAt: new Date().toISOString()
    })
  }),

  http.get('/api/payments/:id', () => {
    return HttpResponse.json({
      id: 1,
      userId: 1,
      planId: 1,
      amount: 99.99,
      paymentMethod: 'credit_card',
      mercadopagoPaymentId: 'MP-123456789',
      status: 'APPROVED',
      createdAt: '2024-01-01T00:00:00Z'
    })
  }),

  // User endpoints
  http.get('/api/user/profile', () => {
    return HttpResponse.json({
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      plan: 'FREE',
      instanceLimit: 2,
      instancesCount: 1
    })
  }),

  http.put('/api/user/profile', async ({ request }) => {
    const profileData = await request.json()

    return HttpResponse.json({
      id: 1,
      ...profileData
    })
  }),

  // Error scenarios
  http.post('/api/instances/error', () => {
    return HttpResponse.json(
      { message: 'Failed to create instance' },
      { status: 500 }
    )
  }),

  http.get('/api/instances/error', () => {
    return HttpResponse.json(
      { message: 'Failed to fetch instances' },
      { status: 500 }
    )
  }),

  http.post('/api/auth/login/error', () => {
    return HttpResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  })
]