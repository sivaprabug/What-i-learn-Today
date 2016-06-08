app.filter('highlightSearchedText', function($sce) {
    return function(text, phrase) {
        console.log(text);
        console.log(phrase);
        var regWork = RegExp('(' + phrase + ')', 'gi');
        console.log(regWork);
        if (phrase) {
            text = text.replace(new RegExp('(' + phrase + ')', 'gi'), '<span class="highlighted">$1</span>');
            console.log(text);
        } else {
            console.warn(phrase);
        }
        return $sce.trustAsHtml(text)
    }
})
