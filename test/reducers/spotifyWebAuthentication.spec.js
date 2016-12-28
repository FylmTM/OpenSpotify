import { expect } from 'chai';
import spotifyWebAuthentication from "../../app/reducers/spotifyWebAuthentication"

describe('reducers', () => {
  describe('spotifyWebAuthentication', () => {
    it('should have initial state', () => {
      expect(spotifyWebAuthentication(undefined, {})).to.deep.equal({
        loginState: "NOT_STARTED"
      });
    });
  });
});
