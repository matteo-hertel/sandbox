var elixir = require('laravel-elixir');

require('laravel-elixir-vueify');

elixir(function(mix) {
    mix.sass([
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './node_modules/bootstrap/dist/css/bootstrap-theme.css',
    ], "./app/assets/css/app.css");

    mix.copy("./node_modules/bootstrap/dist/fonts", "./app/assets/fonts");

    mix.browserify("main.js", "./app/assets/js/app.js");
    elixir(function(mix) {
        mix.browserSync({
            proxy: false,
            files: "./app",
            server: {
                baseDir: "./app",
                index: "index.html"
            }

        });
    });
});
