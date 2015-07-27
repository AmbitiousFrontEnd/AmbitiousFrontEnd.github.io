var note = {
    choosed: ['', ''],
    inInt: function() {
        this.setSize();
        this.addclassify();
        this.addnote();
        this.saveNote();
        this.highLightCode();
        this.preview();

        //this.chooseFolder();
    },
    getViewSize: function() {
        var size = {};
        size.height = window.innerHeight;
        size.width = window.innerWidth;
        if (typeof size.width != 'number') {
            if (document.cmpatMode == 'css1Compat') {
                size.width = document.documentElemnt.clientWidth;
                size.height = document.documentElemnt.clientHeight;
            } else {
                size.width = document.body.clientWidth;
                size.height = document.body.clientHeight;
            }
        }
        return size;
    },
    setSize: function() {
        setInterval(function() {
            var size = note.getViewSize();
            concise.$('#textarea').style.height = size.height - 153 + 'px';
            concise.$('#rtext').style.height = size.height - 153 + 'px';
            concise.$('#classify').style.height = size.height - 264 + 'px';
            concise.$('#ctextlist').style.height = size.height - 150 + 'px';
        }, 300);
    },
    addclassify: function() {
        var that = this;

        EventUtil.addHandler(concise.$('#addbutton'), 'click', function() {
            concise.$('#addnote').style.display = 'block';
        });
        EventUtil.addHandler(concise.$('#confirm'), 'click', function() {
            var ele = concise.$('#lsls');
            if (ele.value != '') {
                concise.$('#addnote').style.display = 'none';
            } else {
                ele.style.border = '1px solid red';
                ele.placeholder = '内容不能为空';
            }
        });
        EventUtil.addHandler(concise.$('#cancel'), 'click', function() {
            concise.$('#addnote').style.display = 'none';
        });
    },
    showtitle: function(noteName) {
        var text = '';
        for(var i in noteName) {
            text += '<p>' + i + '</p>';
        }
        concise.$('#ctextlist').innerHTML = text;
    },
    showcontent: function(content) {
        var p = document.createElement('p');
        p.innerHTML = noteName;
        concise.$('#ctextlist').appendChild(p);
    },
    addnote: function() {
        EventUtil.addHandler(concise.$('#create'), 'click', function() {
            concise.removeClass(concise.$('#write'), 'none');
            concise.addClass(concise.$('#write'), 'block');
            concise.removeClass(concise.$('#show'), 'block');
            concise.addClass(concise.$('#show'), 'none');
        });
    },
    saveNote: function(obj) {
        var that = this;
        var save = concise.$('#save');
        EventUtil.addHandler(save, 'click', function() {
            concise.removeClass(concise.$('#show'), 'none');
            concise.addClass(concise.$('#show'), 'block');
            concise.removeClass(concise.$('#write'), 'block');
            concise.addClass(concise.$('#write'), 'none');
            var content = concise.$('#textarea').value;
            var right = concise.$('#rtext');
            var hCon = marked(content);
            right.innerHTML = hCon;
            that.highLightCode();
            if (concise.hasClass(concise.$('#view'), 'block')) {
                concise.removeClass(concise.$('#view'), 'block');
                concise.addClass(concise.$('#view'), 'none');
            }
            concise.$('#ititle').innerHTML = concise.$('#title').value;
        });
    },
    showClassify: function(classify) {
        var text = '';
        for (var i in classify) {
            text += '<p><a href=\'javascript: void(0)\'>' + i + '</a></p>';
        }
        concise.$('#classify').innerHTML = text;
    },
    chooseFolder: function(obj) {
        var that = this;
        if (!this.isNullObj(obj)) {
            that.choosed[0] = concise.$('#classify').children[0].children[0];
            concise.addClass(that.choosed[0], 'bold');
        }
        EventUtil.addHandler(concise.$('#classify'), 'click', function(eve) {
            eve = EventUtil.getEvent(eve);
            var target = EventUtil.getTarget(eve);
            if (target.tagName.toLowerCase() === 'a') {
                concise.removeClass(that.choosed[0], 'bold');
                that.choosed[0] = target;
                concise.addClass(that.choosed[0], 'bold');
                    that.showtitle(obj[that.choosed[0].innerHTML]);
            }
        });
    },
    highLightCode: function() {
        var codeBlock = document.querySelectorAll('pre code');
        for (var i = codeBlock.length - 1; i >= 0; i--) {
            hljs.highlightBlock(codeBlock[i].parentNode);
        }
    },
    preview: function() {
        var that = this;
        var view = document.getElementById('preview');
        EventUtil.addHandler(view, 'click', function() {
            if (concise.hasClass(concise.$('#view'), 'none')) {
                concise.removeClass(concise.$('#view'), 'none');
                concise.addClass(concise.$('#view'), 'block');
            } else {
                concise.removeClass(concise.$('#view'), 'block');
                concise.addClass(concise.$('#view'), 'none');
            }
            that.highLightCode();
        });
        EventUtil.addHandler(concise.$('#textarea'), 'keyup', function() {
            if (concise.hasClass(concise.$('#view'), 'block')) {

                var content = concise.$('#textarea').value;
                var right = concise.$('#view');
                var hCon = marked(content);
                right.innerHTML = hCon;
                that.highLightCode();
            }
        });
    },
    isNullObj: function(obj) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    }
};
note.inInt();