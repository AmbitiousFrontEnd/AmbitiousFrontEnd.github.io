var note = {
    inInt: function() {
        this.setSize();
        this.addclassify();
        this.addnote();
        this.saveNote();
        this.highLightCode();
        this.preview();
    },
    element: {
        addbutton: document.getElementById('addbutton'),
        classify: document.getElementById('classify'),
        addnote: document.getElementById('addnote'),
        left: document.getElementById('left'),
        confirm: document.getElementById('confirm'),
        cancel: document.getElementById('cancel'),
        center: document.getElementById('center')
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

        EventUtil.addHandler(note.element.addbutton, 'click', function() {
            note.element.addnote.style.display = 'block';
        });
        EventUtil.addHandler(note.element.confirm, 'click', function() {
            var ele = document.getElementById('lsls');
            var classifyValue = ele.value;
            if (classifyValue != '') {
                console.log(classifyValue);
                note.element.addnote.style.display = 'none';
            } else {
                ele.style.border = '1px solid red';
                ele.placeholder = '内容不能为空';
            }
        });
        EventUtil.addHandler(note.element.cancel, 'click', function() {
            note.element.addnote.style.display = 'none';
        });
    },
    showtitle: function(noteName) {
        var p = document.createElement('p');
        p.innerHTML = noteName;
        concise.$('#ctextlist').appendChild(p);
    },
    showcontent: function(content) {
        var p = document.createElement('p');
        p.innerHTML = noteName;
        concise.$('#ctextlist').appendChild(p);
    },
    addnote: function() {
        var create = document.getElementById('create');
        EventUtil.addHandler(create, 'click', function() {
            concise.removeClass(concise.$('#write'), 'none');
            concise.addClass(concise.$('#write'), 'block');
            concise.removeClass(concise.$('#show'), 'block');
            concise.addClass(concise.$('#show'), 'none');
        });
    },
    saveNote: function() {
        var that = this;
        var save = document.getElementById('save');
        EventUtil.addHandler(save, 'click', function(){
            concise.removeClass(concise.$('#show'), 'none');
            concise.addClass(concise.$('#show'), 'block');
            concise.removeClass(concise.$('#write'), 'block');
            concise.addClass(concise.$('#write'), 'none');
            var content = document.getElementById('textarea').value;
            var right = document.getElementById('rtext');
            var hCon = marked(content);
            right.innerHTML = hCon;
            that.highLightCode();
            if(concise.hasClass(concise.$('#view'), 'block')) {
                concise.removeClass(concise.$('#view'), 'block');
                concise.addClass(concise.$('#view'), 'none');
            }
            concise.$('#ititle').innerHTML = concise.$('#title').value;
        });
    },
    showClassify: function(classify) {
        var a = document.createElement('a');
        var p = document.createElement('p');
        a.href = 'javascript: void(0)';
        a.name = classify;
        a.innerHTML = classify;
        p.appendChild(a);
        note.element.classify.appendChild(p);
    },
    highLightCode: function() {
        var codeBlock =document.querySelectorAll('pre code');
        for(var i = codeBlock.length-1;i>=0;i--){
            hljs.highlightBlock(codeBlock[i].parentNode);
        }
    },
    preview: function() {
        var that = this;
        var view = document.getElementById('preview');
        EventUtil.addHandler(view, 'click', function() {
            if(concise.hasClass(concise.$('#view'), 'none')) {
                concise.removeClass(concise.$('#view'), 'none');
                concise.addClass(concise.$('#view'), 'block');
            } else {
                concise.removeClass(concise.$('#view'), 'block');
                concise.addClass(concise.$('#view'), 'none');
            }
            that.highLightCode();
        });
        EventUtil.addHandler(concise.$('#textarea'), 'keyup', function() {
            if(concise.hasClass(concise.$('#view'), 'block')) {

                var content = document.getElementById('textarea').value;
                var right = document.getElementById('view');
                var hCon = marked(content);
                right.innerHTML = hCon;
                that.highLightCode();
            }
        });
    }
};
note.inInt();