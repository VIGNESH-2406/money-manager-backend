const Transaction = require("../models/Transaction");

//@desc get alltransactio
//@route get/ api/v1/transactions
//@access public

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    return res.status(200).send({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      error: "server ERROR",
    });
  }
};

//@desc Add transactio
//@route Post/ api/v1/transactions
//@access public

exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    console.log(text, amount);
    const transaction = await Transaction.create(req.body);
    return res.status(201).send({
      sucess: true,
      data: transaction,
    });
  } catch (err) {
    console.log(err);
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "server Error",
      });
    }
  }
};

//@desc  delete transactio
//@route delete/ api/v1/transactions/:id
//@access public

exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        sucess: false,
        error: "No transaction found",
      });
    }
    await transaction.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server Error",
    });
  }
};
