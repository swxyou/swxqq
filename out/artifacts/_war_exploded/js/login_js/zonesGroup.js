(function () {
    var NS = function () {
    };
    NS.prototype.VERSION = '1.0.0';
    NS.prototype.init = function (_data) {
        this.input_zone = _data.input_zone;
        this.div_zoneVal = _data.div_zoneVal;
        this.div_zones = _data.div_zones;
        this.ul_title = _data.ul_title;
        this.div_tabcont = _data.div_tabcont;
        this.limit_size = _data.limit_size;
        if (!(this.input_zone && this.div_zoneVal && this.div_zones && this.ul_title && this.div_tabcont)) {
            if (!!console) {
                console.log('下拉框初始化错误..');
                console.log('input_zone: ' + this.input_zone);
                console.log('div_zoneVal: ' + this.div_zoneVal);
                console.log('div_zones: ' + this.div_zones);
                console.log('ul_title: ' + this.ul_title);
                console.log('limit_size: ' + this.limit_size);
            }
            return;
        }
        this.slideFlag = false;
        var self = this;
        $.each(this.div_tabcont.children('.ul_tabcont'), function (i, n) {
            for (var j = 3; j < $(n).children('li').length; j += 4) {
                $(n).children('li').eq(j).css('margin-right', '0');
            }
            $.each($(n).children('li'), function (p, q) {
                var size = 9;
                var country = $(q).attr('data-country');
                var zone = $(q).attr('data-zone');
                if (Math.ceil(country.length + (zone.length + 1) / 2) >= size) {
                    var str = self.catCountry(country, zone, size);
                    if (/\./.test(str)) {
                        $(q).attr('title', country + ' ' + zone);
                    }
                    $(q).text(str);
                }
            })
        });
        $("body").on('click', function () {
            if (self.slideFlag) {
                self.slideFlag = !self.slideFlag;
                self.div_zones.hide();
            }
        });
        this.div_zoneVal.on('click', function (e) {
            self.slideFlag = !self.slideFlag;
            if (self.slideFlag) {
                self.div_zones.show();
                self.div_tabcont.children('ul').hide();
                if (self.div_tabcont.children('ul.ul_clicked').length == 0) {
                    self.div_tabcont.children('ul').eq(0).show();
                } else {
                    self.div_tabcont.children('ul.ul_clicked').show();
                }
            } else {
                self.div_zones.hide();
                self.ul_title.children('li').eq(self.div_tabcont.children('ul.ul_clicked').index()).trigger('click');
            }
            e.stopPropagation();
        });
        this.div_zones.on('click', function (e) {
            e.stopPropagation();
        });
        this.ul_title.delegate('li', 'click', function (e) {
            $(this).siblings().removeClass('li_active');
            $(this).addClass('li_active');
            self.div_tabcont.children('ul').hide();
            self.div_tabcont.children('ul').eq($(this).index()).show();
            e.stopPropagation();
        });
        this.div_tabcont.delegate('ul li', 'click', function () {
            var country = $(this).attr('data-country');
            var zone = $(this).attr('data-zone');
            var id = $(this).attr('data-id');
            if (country.length > 5) {
                var str = country.substring(0, 4) + ' ' + zone;
            } else {
                var str = country + ' ' + zone;
            }
            if (self.div_tabcont.children('ul.ul_clicked').length == 0) {
                $(this).addClass('li_clicked');
                $(this).parent().addClass('ul_clicked');
            } else {
                if ($(this).parent().hasClass('ul_clicked')) {
                    $(this).siblings().removeClass('li_clicked');
                    $(this).addClass('li_clicked');
                } else {
                    self.div_tabcont.children('ul.ul_clicked').children('li').removeClass('li_clicked');
                    self.div_tabcont.children('ul.ul_clicked').removeClass('ul_clicked');
                    $(this).addClass('li_clicked');
                    $(this).parent().addClass('ul_clicked');
                }
            }
            self.input_zone.val(zone);
            self.div_zoneVal.attr('data-country', country);
            self.div_zoneVal.attr('data-zone', zone);
            self.div_zoneVal.attr('data-id', id);
            if (self.limit_size) {
                self.div_zoneVal.text(self.catCountry(country, zone, self.limit_size));
            } else {
                self.div_zoneVal.text(self.catCountry(country, zone, 99));
            }
            self.div_zones.hide();
            self.slideFlag = false;
        });
        return this;
    };
    NS.prototype.catCountry = function (_country, _zone, _size) {
        if (Math.ceil(_country.length + (_zone.length + 1) / 2) < _size)
            return _country + ' ' + _zone;
        var num = _size - Math.ceil((_zone.length + 3) / 2);
        if (num < 1)
            return '';
        var str = _country.substring(0, num) + '.. ' + _zone;
        return str;
    };
    window.zonesGroup = NS;
})();