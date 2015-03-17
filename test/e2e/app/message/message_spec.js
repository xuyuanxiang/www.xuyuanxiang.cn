'use strict';

describe('message module', function () {

    // Message list view
    describe('/message', function () {

        beforeEach(function () {
            browser.get('index.html#/message');
        });

        it("should redirect to message edit view when click the button of creation"
            , function () {

                // Fine the top-right creation button
                var creationBtn = element(by.css('a.pull-right'));

                // Click the button
                creationBtn.click().then(function () {
                    expect(browser.getLocationAbsUrl()).toMatch('/message/edit');
                });
            }
        );


        it("should redirect to message edit view with id parameter when click the table-view list item"
            , function () {


                // Find the first list item of table-view
                var firstItemDate = element.all(by.css('a.navigate-right')).count().then(function (num) {
                    console.log(num);
                });

                console.log('===========');
                var modules = browser.getRegisteredMockModules();
                for(var i = 0; i < modules.length; i++){
                    console.log(modules[i]);
                }

                //// Click the item
                //firstItemDate.click().then(function () {
                //    expect(browser.getLocationAbsUrl()).toMatch('/message/edit/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$');
                //});

            }
        );

    });
});