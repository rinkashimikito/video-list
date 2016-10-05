/* jshint -W097 */
'use strict';

var bbc = (function() {
    var gridName = '' || gridName;

    return {
        gridName: '',
        dataUrl: 'https://gist.githubusercontent.com/fedecarg/5772727ae899890d5bcf758a437e7fe5/raw/d030cd98ad5015707be919523b5f8710cbc6c623/bbc_news_test_data.json',

        init: function(gridId) {
            this.createGridWrapper(gridId);
            this.fetchData(this.dataUrl);
            this.attachEvents();
        },
        fetchData: function(url){
            this.xhrCall(url, this.renderData.bind(this));
        },
        renderData: function(error, data){
            var itemsList = document.getElementById(this.gridName);

            for (var i = 0, dataLen = data.length; i < dataLen; i ++) {
                this.appendItem(this.createItem(data[i]), itemsList);
            }

            this.renderSelect(this.getSectionNames(data));
            this.getImages();
        },

        filterItems: function(section) {
            // // console.log(document.querySelectorAll('[data-section]').dataset.section == section);
            // var list = document.getElementById('select-filter').getElementsByTagName('LI');
            // list.filter(function(element){
            //     element.dataset.section == section;
            // })
            //
            // console.log(list);
        },


        attachEvents: function() {
            document.getElementById('select-filter').onchange = function() {
                this.filterItems(document.getElementById('select-filter').value);
            }.bind(this);
        },

        renderSelect: function(sections) {
            var select = document.getElementById('select-filter');

            select[0] = new Option('Select section','',false,false);

            sections.forEach(function(section, i){
                select[i + 1] = new Option(section,section.replace(' ', ''),false,false);
            }, this);




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

        getSectionNames: function(data) {
            var sectionNames = [];

            data.forEach(function(video){
                sectionNames.push(video.media.section);
            }, this);

            return sectionNames;
        },

        setGridName: function(wrapperId) {
            this.gridName = wrapperId;
        },

        setResponseValue: function(rsp) {
            this.response = rsp;
        },

        createItem: function(item) {
            var url = item.media.image.href.replace('$recipe', '{width}');
            var uri = 'http://bbc.com';
            var duration = item.media.duration.replace('PT','').replace('M', 'm ').replace('S', 's').replace('H', 'h ');

            var htmlElement = '' +
                '<li data-section="' + item.media.section.replace(' ', '') + '" class="">' +
                    '<div class="box-card">' +
                        '<a href="' + uri + item.advert.uri + '">' +
                            '<div class="box-body">' +
                                '<div class="box-card__panel">' +
                                    '<div class="delayed-image-load" data-src="' + url + '" data-alt="alternative text"></div>' +
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

        getImages: function() {
            new window.Imager({
                availableWidths: [336, 464, 656],
                widthInterpolator: function(width) {
                    return width + 'xn';
                },
                lazyload: true
            });
        },

        appendItem: function(item, target) {
            target.insertAdjacentHTML('beforeend', item);
        },

        createGridWrapper: function(wrapperId) {
            var wrap = document.createElement('ul');
            wrap.id = wrapperId;

            document.body.appendChild(wrap);

            this.setGridName(wrapperId);
        },
    };
})();

bbc.init('grid-list');
