import _ from 'lodash';
import {expect} from 'chai';
import validate from './validate';
import faker from 'faker';

let schemas = {
  RegisterAccount: {
    "username has minimum alphanum characters without additional separator characters": {
      payload: {
        username: "faa",
        email: faker.internet.email(),
        password: faker.internet.password()
      },
      result: {
        valid: true,
        invalid: false,
        errors: null
      }
    },
    "username has minimum alphanum characters with additional separator characters": {
      payload: {
        username: "f.a-a",
        email: faker.internet.email(),
        password: faker.internet.password()
      },
      result: {
        valid: true,
        invalid: false,
        errors: null
      }
    },
    "username has maximum alphanum characters without additional separator characters": {
      payload: {
        username: "abcdefghijklmno",
        email: faker.internet.email(),
        password: faker.internet.password()
      },
      result: {
        valid: true,
        invalid: false,
        errors: null
      }
    },
    "username has maximum alphanum characters with additional separator characters": {
      payload: {
        username: "abcdef_ghij.klmn-o",
        email: faker.internet.email(),
        password: faker.internet.password()
      },
      result: {
        valid: true,
        invalid: false,
        errors: null
      }
    },
    "username is too short": {
      payload: {
        username: "fa",
        email: faker.internet.email(),
        password: faker.internet.password()
      },
      result: {
        valid: false,
        invalid: true,
        errors: [{
          field: "data.username",
          message: "must be username format",
          value: "fa"
        }]
      }
    },
    "username is too long": {
      payload: {
        username: "abcdefghijklmnop",
        email: faker.internet.email(),
        password: faker.internet.password()
      },
      result: {
        valid: false,
        invalid: true,
        errors: [{
          field: "data.username",
          message: "must be username format",
          value: "abcdefghijklmnop"
        }]
      }
    },
    "username starts with separator character": {
      payload: {
        username: "-faa",
        email: faker.internet.email(),
        password: faker.internet.password()
      },
      result: {
        valid: false,
        invalid: true,
        errors: [{
          field: "data.username",
          message: "must be username format",
          value: "-faa"
        }]
      }
    },
    "username ends with separator character": {
      payload: {
        username: "faa.",
        email: faker.internet.email(),
        password: faker.internet.password()
      },
      result: {
        valid: false,
        invalid: true,
        errors: [{
          field: "data.username",
          message: "must be username format",
          value: "faa."
        }]
      }
    },
    "username contains sequential separator characters": {
      payload: {
        username: "fa.-a",
        email: faker.internet.email(),
        password: faker.internet.password()
      },
      result: {
        valid: false,
        invalid: true,
        errors: [{
          field: "data.username",
          message: "must be username format",
          value: "fa.-a"
        }]
      }
    },
    "username contains invalid characters": {
      payload: {
        username: "fa a",
        email: faker.internet.email(),
        password: faker.internet.password()
      },
      result: {
        valid: false,
        invalid: true,
        errors: [{
          field: "data.username",
          message: "must be username format",
          value: "fa a"
        }]
      }
    }
  },
  ChangeFirstName: {
    "payload is valid": {
      payload: {
        firstName: "foo",
        accountId: "aaaaaaaa-aaaa-4aaa-9aaa-aaaaaaaaaaaa"
      },
      result: {
        valid: true,
        invalid: false,
        errors: null
      }
    }
  },
  CommandEnvelope: {
    "payload is valid": {
      payload: {
        command: "ChangeFirstName",
        commandId: "aaaaaaaa-aaaa-4aaa-9aaa-aaaaaaaaaaaa",
        payload: {}
      },
      result: {
        valid: true,
        invalid: false,
        errors: null
      }
    }
  }
};

describe("validate()", function() {
  it("is a function", function() {
    expect(validate).to.be.a('function');
  });
});

_.each(schemas, function(tests, name) {
  describe(name+" schema validation", function() {
    _.each(tests, function(data, key) {
      it("validates as expected when "+key, function() {
        let result = validate(name, data.payload);
        expect(result).to.eql(data.result);
      });
    });
  });
});
