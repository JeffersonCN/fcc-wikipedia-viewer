( function () {
    var App = function () {
        this.searchInput = $( '#search-input' );
        this.url = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=10&namespace=0&search=";
    }
    App.prototype = {
        showResults: function ( response ) {
            var term = response[ 0 ],
                titles = response[ 1 ],
                descriptions = response[ 2 ],
                links = response[ 3 ],
                len = titles.length,
                $results = $( "#cardsContainer" );
            
            $results.empty();

            var $showing = $( '<span>', {
                text: "Showing results for: " + term
            } );
            $( '#showing' )
                .html( '' )
                .append( $showing );
            for ( var i = 0; i < len; i++ ) {
                var $title = $( "<h5>", {
                    class: "card-title",
                    text: titles[ i ]
                } );
                var $desc = $( "<p>", {
                    class: "card-text",
                    text: descriptions[ i ]
                } );
                var $link = $( "<a>", {
                    href: links[ i ],
                    target: "_blank",
                    class: "card-link pull-xs-right",
                    text: "Go to article"
                } )
                var $card = $( "<div>", {
                    class: "card card-block col-xs-12"
                } );
                $card.append( $title )
                    .append( $desc )
                    .append( $link )
                    .hide()
                    .fadeIn( i * 500 );
                var $box = $( "<div>", {
                    class: "box col-xs-12 offset-xs-0"
                } );
                $box.append( $card );
                $results.append( $box );
            }
            console.log( response );
        },
        search: function () {
            var self = this;
            $('#showing').html('');
            $('#cardsContainer').html('');
            if ( this.searchInput.val() !== "" ) {
                $.getJSON( this.url + encodeURI( this.searchInput.val() ), function ( data ) {
                        self.showResults( data );
                    } )
                    .fail( function () {
                        console.log( "Busca falhou!" );
                    } );
            }
            this.searchInput.val( '' );
        }
    }
    var app = new App();
    // EVENT LISTENERS
    // button click
    $( '#search-button' )
        .on( 'click', function () {
            app.search();
        } );
    // search input enter key pressed
    app.searchInput.on( 'keypress', function ( key ) {
        if ( key.which == 13 ) {
            app.search();
        }
    } );
} )();