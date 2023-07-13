const { EncryptionRepo } = require("../database");

// All Business logic will be here
class EncryptionService {
  constructor() {
    this.repository = new EncryptionRepo();
  }

  async encrypt(userInputs) {
    const { payload } = userInputs;

    try {
      const data = await this.repository.encrypt({ payload });
      return data;
    } catch (err) {
      return {code: 300, err: err.toString()};
    }
  }

  async compareOtp(userInputs) {
    const { payload } = userInputs;

    try {
      const data = await this.repository.compareOtp({ payload });
      return data;
    } catch (err) {
      return {code: 300, err: err.toString()};
    }
  }

  async getData(userInputs) {
    const { payload } = userInputs;

    try {
      const data = await this.repository.getData({ payload });
      return data;
    } catch (err) {
      return {code: 300, err: err.toString()};
    }
  }


}

module.exports = EncryptionService;
