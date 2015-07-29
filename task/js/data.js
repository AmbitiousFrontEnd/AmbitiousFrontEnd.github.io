var data = {
    inInt: function() {
        note.inInt();
        this.showAll();
        this.folder();
        this.note();
        this.changeContent();
    },
    setData: function(str) {
        str = JSON.stringify(str);
        localStorage.setItem('storage', str);
    },
    getData: function() {
        var str = JSON.parse(localStorage.getItem('storage')) || {};
        return str;
    },
    showAll: function() {
        var allData = this.getData();
        note.showFolder(allData);
    },

    // folder
    folder: function() {
        this.addFolder();
        this.deleteFolder();
        this.chooseFolder();
    },
    addFolder: function() {
        var that = this;
        EventUtil.addHandler(concise.$('#confirm'), 'click', function() {
            note.addFolder();
            var allData = that.getData();
            allData[note.choosedValue[0]] = {};
            that.setData(allData);
            note.showFolder(that.getData());
            concise.$('#lsls').value = '';
        });
    },
    deleteFolder: function() {
        var that = this;
        EventUtil.addHandler(concise.$('#deletebutton'), 'click', function() {
            var allData = that.getData();
            delete allData[note.choosed[0].name];
            that.setData(allData);
            note.showFolder(that.getData());
        });
    },
    chooseFolder: function() {
        var that = this;
        EventUtil.addHandler(concise.$('#classify'), 'click', function(eve) {
            eve = EventUtil.getEvent(eve);
            var target = EventUtil.getTarget(eve);
            note.chooseFolder(target);
            note.showNote(that.getData());
        });
    },

    // note
    note: function() {
        this.addNote();
        this.deleteNote();
        this.chooseNote();
    },
    addNote: function() {
        var that = this;
        EventUtil.addHandler(concise.$('#save'), 'click', function() {
            note.addNote();
            var allData = that.getData();
            var folder = note.choosed[0].name;
            var title = concise.$('#title').value;
            var content = concise.$('#textarea').value;
            allData[folder][title] = {};
            allData[folder][title].title = title;
            allData[folder][title].content = content;
            that.setData(allData);
            note.showFolder(that.getData());
        });
    },
    chooseNote: function() {
        var that = this;
        EventUtil.addHandler(concise.$('#cnotelist'), 'click', function(eve) {
            eve = EventUtil.getEvent(eve);
            var target = EventUtil.getTarget(eve);
            note.chooseNote(target);
            note.showContent(that.getData()[note.choosedValue[0]][note.choosedValue[1]]);
        });
    },
    deleteNote: function() {
        var that = this;
        EventUtil.addHandler(concise.$('#delenote'), 'click', function() {
            var allData = that.getData();
            delete allData[note.choosed[0].name][note.choosedValue[1]];
            that.setData(allData);
            note.deleteNote();
            note.showFolder(that.getData());
        });
    },
    changeContent: function() {
        var that = this;
        EventUtil.addHandler(concise.$('#change'), 'click', function() {
            note.changeContent(that.getData()[note.choosedValue[0]][note.choosedValue[1]])
        });
    }
};
data.inInt();