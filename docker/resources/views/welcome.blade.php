<!DOCTYPE html>
<html>
    <head>
        <title>Laravel</title>

        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">

        <style>
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                display: table;
                font-weight: 100;
                font-family: 'Lato';
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
            }

            .title {
                font-size: 96px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div class="title">Laravel 5</div>
                <h3>{{ gethostname() }}</h3>
                @if($user)
                    <h2>One Random User</h2>
                    <p>Name: {{$user->name}}</p>
                    <p>Email: {{$user->email}}</p>
                    <p>Created: {{$user->created_at->format("d/m/Y H:i:s")}}</p>
                    <p>Updated: {{$user->updated_at->format("d/m/Y H:i:s")}}</p>
                @endif
            </div>
        </div>
    </body>
</html>
