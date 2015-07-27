var data = {
    inInt: function() {
        this.addFolders();
        this.showData();
       // this.choose();
        this.deleteFolder();
        this.addNote();
    },
    setData: function(str) {
        str = JSON.stringify(str);
        localStorage.setItem('storage', str);
    },
    getData: function() {
        var str = JSON.parse(localStorage.getItem('storage')) || {};
        return str;
    },
    addFolders: function() {
        var that = this;
        EventUtil.addHandler(concise.$('#confirm'), 'click', function(eve) {
            var folder = concise.$('#lsls').value;
            if (folder != '') {
                var noteData = that.getData();
                noteData[folder] = {};
                that.setData(noteData);
                that.showData();
                that.choose();
            }
            concise.$('#lsls').value = '';
        });
    },
    addNote: function() {
        var that = this;
        EventUtil.addHandler(concise.$('#save'), 'click', function() {
            var noteData = that.getData();
            var folder = note.choosed[0].innerHTML;
            var title = concise.$('#title').value;
            var content = concise.$('#textarea').value;
            noteData[folder][title] = {};
            noteData[folder][title].title = title;
            noteData[folder][title].content = content;
            that.setData(noteData);
            that.showData();
        });
    },
    showData: function() {
        var noteData = this.getData();
        note.showClassify(noteData);
        this.choose();
        note.showtitle(noteData[note.choosed[0].innerHTML]);
    },
    choose: function() {
        var obj = this.getData();
        note.chooseFolder(obj);
    },
    deleteFolder: function() {
        var that = this;
        EventUtil.addHandler(concise.$('#deletebutton'), 'click', function() {
            var noteData = that.getData();
            delete noteData[note.choosed[0].innerHTML];
            that.setData(noteData);
            that.showData();
            that.choose();
        })
    }
};
data.inInt();