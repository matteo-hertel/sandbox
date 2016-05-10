var elixir = require('laravel-elixir');

elixir(function(mix) {
    mix.sass([
        './bower_components/bootstrap/dist/css/bootstrap.css',
        './bower_components/bootstrap/dist/css/bootstrap-theme.css',
    ], "./app/assets/css/app.css");
    mix.copy("./bower_components/bootstrap/dist/fonts", "./app/assets/fonts");
});
