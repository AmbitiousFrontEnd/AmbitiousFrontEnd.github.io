var data = {
    inInt: function() {
        this.initializtion();
        this.addFolders();
        this.showData();
    },
    noteData: {},
    initializtion: function() {
        var str = this.getData();
        if (str) {
            this.noteData = JSON.parse(str);
        }
    },
    setData: function(str) {
        localStorage.setItem('storage', str);
    },
    getData: function() {
        return localStorage.getItem('storage');
    },
    addFolders: function() {
        var that = this;
        EventUtil.addHandler(concise.$('#confirm'), 'click', function(eve) {
            var folder = concise.$('#lsls').value;
            if (folder != '') {
                note.showClassify(folder);
                that.noteData[folder] = {};
                that.noteData[folder]['note1'] = {};
                that.noteData[folder]['note1'].atitle = '';
                that.noteData[folder]['note1'].acontent = '';
                var str = JSON.stringify(that.noteData);
                that.setData(str);
            }
        });
    },
    showData: function() {
        var str = this.getData();
        var noteData = JSON.parse(str);
        for (var Classify in noteData) {
            note.showClassify(Classify);
            for(var noteName in noteData[Classify]) {
                note.showtitle(noteData[Classify][noteName].atitle);
            }
        }
    }
};
data.inInt();