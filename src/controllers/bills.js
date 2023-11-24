class BillsControllers {
    
    async test(req,res,nex){
        return  res.status(200).json({
            message : "testado na rota de bills"
        })
    }


}

module.exports = BillsControllers