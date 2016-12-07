function Message(text) {
    this.text = text;
}

angular.module('App.common').service('exampleProvider', function(){
	var text = null;

    this.setText = function (textString) {
        text = textString;
    };

    this.$get = [function () {
        return new Message(text);
    }];
});