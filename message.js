const INPUT = 'INPUT';
const EVENT = 'EVENT';
const FATAL_ERROR = 'FATAL_ERROR';
const COMMAND = 'COMMAND';

const MessageSchema = {
  type: 'Message',
  payload: null,
  meta: null,
  error: false,
};

function createMessage() {
  return Object.create(MessageSchema);
}

function Input(data) {
  const message = createMessage();
  message.type = INPUT;
  message.payload = data;
  return message;
}

function FatalError(description, context) {
  if (!(description && typeof description === 'string')) {
    throw new Error('FatalError:: no source given');
  }
  const message = createMessage();
  message.type = FATAL_ERROR;
  message.payload = description;
  message.error = true;
  message.meta = { context };
  return message;
}

function Event(source, data) {
  if (!(source && typeof source === 'string')) {
    return FatalError('Event:: no source given', { data });
  }
  const message = createMessage();
  message.type = EVENT;
  message.payload = data;
  message.meta = { source };
  return message;
}

function Command(intent) {
  if (!(intent && typeof intent === 'string')) {
    return FatalError('Command:: no valid intent given', { intent });
  }
  const message = createMessage();
  message.type = COMMAND;
  message.meta = { intent };
  return message;
}

module.exports = {
  Input,
  Event,
  Command,
  INPUT,
  EVENT,
  COMMAND,
};
