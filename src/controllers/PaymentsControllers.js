class PaymentsControllers {
    async test(req, res, next){
        return res.status(200).json({
            message : "testado na rota de payments"
        })
    }
}

module.exports = PaymentsControllers