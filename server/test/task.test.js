import request from 'supertest';
import { expect } from 'chai';
import app from '../index.js';

describe('Task API TEST', function () {
  let token, userId, taskId;

  before(async () => {
    const res = await request(app).post('/users/').send({
      email: 'copurcengizhan@gmail.com',
      password: '12345678',
      user_name: 'Cengizhan',
    });
    expect(res.status).to.equal(200);
  });

  beforeEach(async () => {
    const res = await request(app)
      .post('/users/login')
      .send({ email: 'copurcengizhan@gmail.com', password: '12345678' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');

    token = res.body.token;
    userId = res.body.user_id;
  });

  it('Task ekleme', async function () {
    const res = await request(app)
      .post('/tasks/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Task 1',
        description: 'Açıklama',
        due_date: '2024-12-01',
        status: 'completed',
        user_id: userId,
      });
    taskId = res.body.task.task_id;
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Task successfully.');
  });

  it('Tüm task listesi', async function () {
    const res = await request(app).get('/tasks');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('Task güncelleme', async function () {
    const res = await request(app)
      .patch('/tasks/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Task 2',
        description: 'Açıklama',
        due_date: '2024-12-01',
        status: 'completed',
        user_id: userId,
        task_id: taskId,
      });
    expect(res.status).to.equal(200);
  });

  it('Task Silme', async function () {
    const res = await request(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
  });
});
