const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const schema = normalizr.schema;

function normalizeFunction(original) {
  const user = new schema.Entity("users");

  const message = new schema.Entity("message", {
    author: user,
  });

  const messages = new schema.Entity("messages", {
    messages: [message],
  });

  const normalizedData = normalize(original, messages);

  return normalizedData;
}

module.exports = normalizeFunction;
