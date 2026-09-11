const express= require('express');
const cors= require('cors')
const errorHandler= require('./middleware/error.Handler');
const app= express();
const customerRoutes= require('./routes/customerRoutes');
const projectRoutes= require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/customers',customerRoutes);
app.use('/api/projects',projectRoutes);
app.use(errorHandler);
module.exports=app;
