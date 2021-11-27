import faker from 'faker';

const createTransactionBody = ({ value } = {}) => ({
  value: value || faker.datatype.float({
    min: -100000000,
    max: 100000000,
  }),
});

export {
  createTransactionBody,
};
