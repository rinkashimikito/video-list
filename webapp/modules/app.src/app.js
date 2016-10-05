/* jshint -W097 */
'use strict';

var bbc = (function() {
    return {
        gridName: '',
        dataUrl: 'https://gist.githubusercontent.com/fedecarg/5772727ae899890d5bcf758a437e7fe5/raw/d030cd98ad5015707be919523b5f8710cbc6c623/bbc_news_test_data.json',

        init: function(gridId) {
            this.createGridWrapper(gridId);
            this.fetchData(this.dataUrl);
        },
        createGridWrapper: function(wrapperId) {
            var wrap = document.createElement('ul');
            wrap.id = wrapperId;

            document.body.appendChild(wrap);

            this.setGridName(wrapperId);
        },
        setGridName: function(wrapperId) {
            this.gridName = wrapperId;
        },
        fetchData: function(url){
            this.xhrCall(url, this.renderData.bind(this));
        },

        renderData: function(error, data){
            var itemsList = document.getElementById(this.gridName);

            for (var i = 0, dataLen = data.length; i < dataLen; i ++) {
                this.appendItem(this.createItem(data[i]), itemsList);
            }
        },

        xhrCall: function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
                var status = xhr.status;
                if (status == 200) {
                    callback(null, xhr.response);
                } else {
                    callback(status);
                }
            };
            xhr.send();
        },

        createItem: function(item) {
            var url = item.media.image.href.replace('$recipe', '1024xn');
            var uri = 'http://bbc.com';
            var duration = item.media.duration.replace('PT','').replace('M', 'm ').replace('S', 's').replace('H', 'h ');

            var htmlElement = '' +
                '<li>' +
                    '<div class="box-card">' +
                        '<a href="' + uri + item.advert.uri + '">' +
                            '<div class="box-body">' +
                                '<div class="box-card__panel">' +
                                    '<img class="delayed-image-load" src="' + url + '" data-alt="alternative text" />' +
                                    '<span>' + item.media.section + '</span>' +
                                '</div>' +
                                '<div class="box-card__description">' +
                                    '<h3>' + item.advert.shortHeadline + '</h3>' +
                                    '<div class="box-card__details">' +

                                        '<span>' + duration + '</span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</a>' +
                    '</div>' +
                '</li>';

            return htmlElement;
        },


        appendItem: function(item, target) {
            target.insertAdjacentHTML('beforeend', item);
        },
    };

})();

bbc.init('grid-list');
