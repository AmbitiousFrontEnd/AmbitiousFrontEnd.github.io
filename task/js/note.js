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
    getCount: function(obj) {
        var count = 0;
        for (var i in obj) {
            count++;
        }
        return count;
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
        if (!this.isNullObj(folder)) {
            var that = this;
            var text = '';
            for (var i in folder) {
                var j = this.getCount(folder[i]);
                text += '<p><a href=\'javascript: void(0)\'' + ' name =\'' + i + '\' >' + i + '(' + j + ')' + '</a></p>';
            }
            concise.$('#classify').innerHTML = text;
            if (this.choosed[0] === '') { /** show default folder **/
                this.choosed[0] = concise.$('#classify').children[0].children[0];
                this.choosedValue[0] = this.choosed[0].name;
            } else {
                for (i = 0; i < concise.$('#classify').children.length; i++) {
                    if (concise.$('#classify').children[i].children[0].name === this.choosedValue[0]) {
                        this.choosed[0] = concise.$('#classify').children[i].children[0];
                    }
                }
            }

            concise.addClass(that.choosed[0], 'bold');
            this.showNote(folder);
        }
    },
    chooseFolder: function(target) {
        var that = this;
        if (target.tagName.toLowerCase() === 'a') {
            concise.removeClass(that.choosed[0], 'bold');
            this.choosed[0] = target;
            this.choosedValue[0] = target.name;
            concise.addClass(that.choosed[0], 'bold');
            this.choosed[1] = '';
        }
    },

    // note
    noteEvent: function() {
        var that = this;
        EventUtil.addHandler(concise.$('#create'), 'click', function() {
            concise.removeClass(concise.$('#write'), 'none');
            concise.addClass(concise.$('#write'), 'block');
            concise.removeClass(concise.$('#show'), 'block');
            concise.addClass(concise.$('#show'), 'none');
            concise.$('#title').value = '';
            concise.$('#textarea').value = '';
        });
        // 右键显示
        EventUtil.addHandler(concise.$('#cnotelist'), 'mouseup', function(event) {
            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event);

            if (target.tagName.toLowerCase() === 'p' && target.innerHTML === that.choosedValue[1]) {
                EventUtil.preventDefault(event);
                if (event.button === 2) {
                    document.oncontextmenu = function() {
                        return false;
                    };
                    concise.addClass(concise.$('#delenote'), 'block');
                    concise.$('#delenote').style.left = event.clientX + 'px';
                    concise.$('#delenote').style.top = event.clientY + 'px';
                }
            }
        });
        EventUtil.addHandler(document.body, 'click', function() {
            that.deleteNote();
        });
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
        this.choosedValue[1] = concise.$('#title').value;
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
        console.log(!this.isNullObj(noteName[this.choosedValue[0]]));
        if (!this.isNullObj(noteName[this.choosedValue[0]])) {
            var that = this;
            var text = '';
            for (var i in noteName[this.choosedValue[0]]) {
                text += '<p name=\'' + i + '\'>' + i + '</p>';
            }
            concise.$('#cnotelist').innerHTML = text;
            if(this.choosed[1] === '') {
                this.choosed[1] = concise.$('#cnotelist').children[0];
                this.choosedValue[1] = this.choosed[1].innerHTML;
            }
            else {
                for(var j = 0; j < concise.$('#cnotelist').children.length; j++) {
                    if(concise.$('#cnotelist').children[j].getAttribute('name') === this.choosedValue[1]) {
                        this.choosed[1] = concise.$('#cnotelist').children[j];
                    }
                    
                }
            }
            this.chooseNote(this.choosed[1]);
            console.log(this.choosedValue[1]);
            this.showContent(noteName[this.choosedValue[0]][this.choosedValue[1]]);
        } else {
            concise.$('#cnotelist').innerHTML = '';
            var obj = {};
            obj.title = 'AFE笔记本';
            obj.content = '';
            this.showContent(obj);
        }

    },
    deleteNote: function() {
        concise.removeClass(concise.$('#delenote'), 'block');
        concise.addClass(concise.$('#delenote'), 'none');
    },

    // content
    showContent: function(content) {
            concise.$('#ititle').innerHTML = content.title;
            concise.$('#rtext').innerHTML = content.content;
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