angular.module('App.services').service('exampleProvider', function(){
	var text = null;

    this.setText = function (textString) {
        text = textString;
    };

    this.$get = [function () {
        return new Message(text);
    }];
});