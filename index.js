const express= require('express');
const errorHandler= require('./middleware/error.Handler');
const app= express();
const customerRoutes= require('./routes/customerRoutes');
const projectRoutes= require('./routes/projectRoutes');
app.use(express.json());

app.use('/api/customers',customerRoutes);
app.use('/api/projects',projectRoutes);
app.use(errorHandler);
module.exports=app;
