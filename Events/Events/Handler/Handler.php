<?php

namespace Events\Handler;

use Symfony\Component\EventDispatcher\Event;

class Handler extends Event{

    public function handle(){
        echo"<pre style='color:#59E817; background-color:black; word-wrap:break-word;'>";
        var_dump("hello there");
        echo"</pre>";
    }
}
