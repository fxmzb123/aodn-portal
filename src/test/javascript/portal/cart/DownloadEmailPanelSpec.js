/*
 * Copyright 2014 IMOS
 *
 * The AODN/IMOS Portal is distributed under the terms of the GNU General Public License
 *
 */
describe("Portal.cart.DownloadEmailPanel", function() {

    var panel;
    var onValidSpy;
    var onInvalidSpy;

    beforeEach(function() {
        onValidSpy = jasmine.createSpy('onValid');
        onInvalidSpy = jasmine.createSpy('onInvalid');
        panel = new Portal.cart.DownloadEmailPanel({
            listeners: {
                'valid': onValidSpy,
                'invalid': onInvalidSpy
            }
        });
    });

    it('gets email address from email field', function() {
        spyOn(panel.emailField, 'getValue');
        panel.getEmailValue();
        expect(panel.emailField.getValue).toHaveBeenCalled();
    });


    describe('validation', function() {
        it('has email address validator configured in text field', function() {
            expect(panel.emailField.validator).toBe(panel._validateEmailAddress);
        });

        describe('_validateEmailAddress', function () {

            it('returns false for an empty address', function () {
                var returnVal = panel._validateEmailAddress('');
                expect(returnVal).toBe(false);
            });

            it('returns false for an invalid address', function () {
                var returnVal = panel._validateEmailAddress('notAnEmailAddress');
                expect(returnVal).toBe(false);
            });

            it('returns true for a valid address', function () {
                var returnVal = panel._validateEmailAddress('user@domain.com');
                expect(returnVal).toBe(true);
            });
        });

    });
});
