const errorHandler=(err,req,res,next)=>{
    console.error('Error:',err);
    res.status(500).json({
        error: err.message
    });
};

module.exports = errorHandler;  