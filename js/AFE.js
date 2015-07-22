var EventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    removeHandle: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(element, type, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    getEvent: function(event) {
        return event ? event : window.event;
    },
    getTarget: function(event) {
        return event.target || event.srcElment;
    },
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
};
(function() {
    var style = {
        inTnt: function() {
            this.setBodySize();
            this.turn();
        },
        element: {
            members: document.getElementById('members'),
            team: document.getElementById('team'),
            task: document.getElementById('task'),
            person: document.getElementById('person'),
            afe: document.getElementById('afe'),
            introduce1: document.getElementById('introduce1'),
            introduce2: document.getElementById('introduce2'),
            introduce3: document.getElementById('introduce3')
        },
        hasClass: function(elem, cName) {
            if (elem.className) {
                return !!elem.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
            }
            return false;
        },
        addClass: function(elem, cName) {
            if (!this.hasClass(elem, cName)) {
                elem.className += " " + cName;
            }
        },
        removeClass: function(elem, cName) {
            if (this.hasClass(elem, cName)) {
                elem.className = elem.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), "");
            }
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
        setBodySize: function() {
            setInterval(function() {
                var size = style.getViewSize();
                document.getElementById('body').style.height = size.height + 'px';
                document.getElementById('body').style.width = size.width + 'px';
            }, 300);
        },
        turn: function() {
            var that = this;
            EventUtil.addHandler(that.element.members, 'mouseover', that.handler);
            EventUtil.addHandler(that.element.members, 'mouseout', that.handler);
        },
        handler: function(event){
            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event);
            if (target.tagName.toLowerCase() === 'img' &&　event.type.toLowerCase() === 'mouseout') {
                style.removeClass(style.element.team, 'none');
                style.removeClass(style.element.person, 'color');
                style.removeClass(style.element.afe, 'block');
                style.addClass(style.element.team, 'block');
                style.addClass(style.element.person, 'white');
                style.addClass(style.element.afe, 'none');
                switch (target.id) {
                    case 'tjs':
                        {

                            target.src = './images/ruo.png';
                            style.removeClass(style.element.introduce1, 'block');
                            style.addClass(style.element.introduce1, 'none');
                            break;
                        }
                    case 'hwx':
                        {

                            target.src = './images/ban.png';
                            style.removeClass(style.element.introduce2, 'block');
                            style.addClass(style.element.introduce2, 'none');
                            break;
                        }
                    case 'wp':
                        {

                            target.src = './images/time2.png';
                            style.removeClass(style.element.introduce3, 'block');
                            style.addClass(style.element.introduce3, 'none');
                            break;
                        }
                }
            }
            else if(target.tagName.toLowerCase() === 'img' &&　event.type.toLowerCase() === 'mouseover') {
                style.removeClass(style.element.team, 'block');
                style.removeClass(style.element.person, 'white');
                style.removeClass(style.element.afe, 'none');

                style.addClass(style.element.team, 'none');
                style.addClass(style.element.person, 'color');
                style.addClass(style.element.afe, 'block');
                switch (target.id) {
                    case 'tjs':
                        {

                            target.src = './images/ruo2.png';
                            style.removeClass(style.element.introduce1, 'none');
                            style.addClass(style.element.introduce1, 'block');
                            break;
                        }
                    case 'hwx':
                        {

                            target.src = './images/ban2.png';
                            style.removeClass(style.element.introduce2, 'none');
                            style.addClass(style.element.introduce2, 'block');
                            break;
                        }
                    case 'wp':
                        {

                            target.src = './images/time.png';
                            style.removeClass(style.element.introduce3, 'none');
                            style.addClass(style.element.introduce3, 'block');
                            break;
                        }
                }
            }
        }
    };
    style.inTnt();
})();
