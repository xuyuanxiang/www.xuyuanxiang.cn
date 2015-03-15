'use strict';

describe('message module', function () {

    // Message list view
    describe('/message', function () {

        beforeEach(function () {
            browser.get('#/message');
        });

        it("should redirect to message edit view when click the button of creation"
            , function () {

                // Wait until Angular has finished rendering
                browser.waitForAngular().then(function () {

                    // Fine the top-right creation button
                    var creationBtn = element(by.css('a.pull-right'));

                    // Click the button
                    creationBtn.click().then(function () {
                        expect(browser.getLocationAbsUrl()).toMatch('/message/edit');
                    });

                });
            }
        );


        it("should redirect to message edit view with id parameter when click the table-view list item"
            , function () {

                // Wait until Angular has finished rendering
                browser.waitForAngular().then(function () {

                    // Find the first list item of table-view
                    var firstItemDate = element.all(by.css(
                        'ul.table-view > li.table-view-cell > a.navigate-right')).first();

                    // Click the item
                    firstItemDate.click().then(function () {
                        expect(browser.getLocationAbsUrl()).toMatch('/message/edit/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$');
                    });

                });
            }
        );

    });
});