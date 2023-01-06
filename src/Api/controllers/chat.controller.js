const MessagesContainer = require('../../DataAccess/DAOs/MessageDAO');
const ServiceResponse = require('../../Models/ServiceResponse');
const Msgs = new MessagesContainer();

async function GetAllMsgsByEmail(req, res, next) {
  let resp = new ServiceResponse();
  try {
    const msgs = await Msgs.GetAllByEmail(req.params.email);
    if (!msgs || !msgs.length) {
      resp.status = 404;
      resp.success = false;
      resp.message = `No hemos encontrado mensajes enviados por ${req.params.email}`;
      return res.status(404).json(resp);
    }
    resp.data = msgs;
    res.status(resp.status).json(resp);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  GetAllMsgsByEmail,
};
