var note = {
    choosed: ['', ''],
    choosedValue: ['', ''],
    inInt: function() {
        this.setSize();
        this.folderEvent();
        this.noteEvent();
        this.preview();
    },
    isNullObj: function(obj) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
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
            concise.$('#cnotelist').style.height = size.height - 150 + 'px';
        }, 300);
    },
    // folder
    folderEvent: function() {
        EventUtil.addHandler(concise.$('#addbutton'), 'click', function() {
            concise.$('#addnote').style.display = 'block';
        });
        EventUtil.addHandler(concise.$('#cancel'), 'click', function() {
            concise.$('#addnote').style.display = 'none';
        });
    },
    addFolder: function() {
        var ele = concise.$('#lsls');
        if (ele.value != '') {
            this.choosedValue[0] = ele.value;
            this.choosedValue[1] = '';
            concise.$('#addnote').style.display = 'none';
        } else {
            ele.style.border = '1px solid red';
            ele.placeholder = '内容不能为空';
        }
    },
    showFolder: function(folder) {
        var that = this;
        var text = '';
        for (var i in folder) {
            text += '<p><a href=\'javascript: void(0)\'>' + i + '</a></p>';
        }
        concise.$('#classify').innerHTML = text;
        if (!this.isNullObj(folder)) { /** show default folder **/
            this.choosed[0] = concise.$('#classify').children[0].children[0];
            this.choosedValue[0] = this.choosed[0].innerHTML;
            concise.addClass(that.choosed[0], 'bold');
        }
        this.showNote(folder);
    },
    chooseFolder: function(target) {
        var that = this;
        if (target.tagName.toLowerCase() === 'a') {
            concise.removeClass(that.choosed[0], 'bold');
            this.choosed[0] = target;
            this.choosedValue[0] = target.innerHTML;
            concise.addClass(that.choosed[0], 'bold');
        }
    },

    // note
    noteEvent: function() {
        EventUtil.addHandler(concise.$('#create'), 'click', function() {
            concise.removeClass(concise.$('#write'), 'none');
            concise.addClass(concise.$('#write'), 'block');
            concise.removeClass(concise.$('#show'), 'block');
            concise.addClass(concise.$('#show'), 'none');
            concise.$('#title').value = '';
            concise.$('#textarea').value = '';
        });
        // 右键显示
    },
    addNote: function() {
        concise.removeClass(concise.$('#show'), 'none');
        concise.addClass(concise.$('#show'), 'block');
        concise.removeClass(concise.$('#write'), 'block');
        concise.addClass(concise.$('#write'), 'none');
        var content = concise.$('#textarea').value;
        var right = concise.$('#rtext');
        var hCon = marked(content);
        right.innerHTML = hCon;
        this.highLightCode();
        if (concise.hasClass(concise.$('#view'), 'block')) {
            concise.removeClass(concise.$('#view'), 'block');
            concise.addClass(concise.$('#view'), 'none');
        }
        concise.$('#ititle').innerHTML = concise.$('#title').value;
    },
    chooseNote: function(target) {
        var that = this;
        if (target.tagName.toLowerCase() === 'p') {
            concise.removeClass(that.choosed[1], 'notebold');
            this.choosed[1] = target;
            this.choosedValue[1] = target.innerHTML;
            concise.addClass(that.choosed[1], 'notebold');
        }
    },
    showNote: function(noteName) {
        var that = this;
        var text = '';
        for (var i in noteName[this.choosedValue[0]]) {
            text += '<p>' + i + '</p>';
        }
        concise.$('#cnotelist').innerHTML = text;
        if (!this.isNullObj(noteName[that.choosedValue[0]])) {
            this.choosed[1] = concise.$('#cnotelist').children[0];
            this.choosedValue[1] = this.choosed[1].innerHTML;
            concise.addClass(that.choosed[1], 'notebold');
            this.showContent(noteName[this.choosedValue[0]][this.choosedValue[1]]);
        }
        
    },


    // content
    showContent: function(content) {
        if (this.isNullObj(content)) {
            concise.$('#ititle').innerHTML = '';
            concise.$('#rtext').innerHTML = '';
        } else {
            concise.$('#ititle').innerHTML = content.title;
            concise.$('#rtext').innerHTML = content.content;
        }
    },
    changeContent: function(content) {
        concise.$('#title').value = content.title;
        concise.$('#textarea').value = content.content;
        concise.removeClass(concise.$('#write'), 'none');
        concise.addClass(concise.$('#write'), 'block');
        concise.removeClass(concise.$('#show'), 'block');
        concise.addClass(concise.$('#show'), 'none');
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
    }

};