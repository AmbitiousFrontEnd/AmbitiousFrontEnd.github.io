var note = {
    inInt: function() {
        this.setSize();
        this.addclassify();
        this.addnote();
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
            var textarea = document.getElementById('textarea');
            textarea.style.display = 'block';
            concise.$('#rtitle').style.backgroundColor = '#FFF';
            concise.$('#title').style.display = 'inline-block';
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
    }
};
note.inInt();