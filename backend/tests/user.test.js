const request = require('supertest');
const app = require('../app.js'); // Asegúrate de que la ruta sea correcta

let token;

describe('User Authentication', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                fullname: 'David',
                username: 'testuser',
                email: 'test@example.com',
                password: 'testpassword'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
        token = res.body.token; // Guarda el token para pruebas posteriores
    });

    it('should log in an existing user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'testpassword'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should get user data', async () => {
        const res = await request(app)
            .get('/api/user/me')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('username', 'testuser');
    });

    // Añadir más pruebas para actualizar y eliminar usuario
});
